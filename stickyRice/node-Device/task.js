"use strict";

var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs');

var key = system.args[1],
    device = system.args[2] || '',
    url = "https://www.baidu.com/s?wd=" + encodeURI(key),
    time = Date.now(),
    data = {};

if (system.args.length === 1) {
    console.log('请输入搜索词 ');

} else {
    //是否默认设备
    if(device){

        var content = fs.read('device.json'),
        content = JSON.parse(content);
        var config = content[device],
            path = device + '.png';
        console.log(path);

        //设置用户代理
        page.settings.userAgent = config.UA;
        //该属性可用于设置可视窗口的大小
        page.viewportSize = {
            width: config.width,
            height: config.height
        };
        //该属性可以设置页面的可视范围
        page.clipRect = {
            top: 0,
            left: 0,
            width: config.width,
            height: config.height
        };

        //检查文件名是否重复，重复删除
        if(fs.exists(path)){
            fs.remove(path);
            console.log(fs.exists(path));
        }


    }

    page.open(url, function (status) {


        page.render(device + '.png', {format: 'png', quality: '100'});
        if (status !== "success") {
            time = Date.now() - time;
            data = {
                code: 0,			// 返回状态码，1为成功，0为失败
                msg: '抓取失败',	// 返回的信息
                word: key,			// 抓取的关键字
                time: time,   // 任务的时间
                device: device
            };
            data = JSON.stringify(data, null, 4);
            fs.write("task.json", data, 'w');
            phantom.exit();
        } else {
            time = Date.now() - time;
            page.includeJs("https://code.jquery.com/jquery-3.1.1.min.js", function () {

                data = page.evaluate(function (time, key, device) {
                    var result = [];
                    var total = $('#results .result');

                    for (var i = 0, len = total.length; i < len; i++) {
                        var list = {};
                        list.title = $(total[i]).find('.c-title').text().trim();
                        list.info = $(total[i]).find('.c-abstract').text();
                        list.link = $(total[i]).find('.c-container a:first').attr('href');
                        var pic = $(total[i]).find('.c-img img');
                        list.pic = (pic && pic.length) ? pic.attr('src') : '';
                        result.push(list);
                    }

                    return JSON.stringify({
                        code: 1,
                        msg: '抓取成功',
                        word: key,
                        time: time,
                        device: device,
                        dataList: result

                    }, null, 4);

                }, time, key, device);
                console.log(data);
                fs.write("task.json", data, 'w');
                phantom.exit();
            });
        }

    });

}


/****
 * 1. 抓取类名选择有问题，无法有效抓取
 * 2. JSON.parse处理后的JSON对象无法打印
 * 3. 如何删除重名文件
 *
 * *****/