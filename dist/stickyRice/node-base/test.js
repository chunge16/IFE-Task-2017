"use strict";

var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs');

var key = system.args[1],
    url = "https://www.baidu.com/s?wd=" + encodeURI(key),
    time = Date.now(),
    data = {};

if (system.args.length === 1) {
    console.log('请输入搜索词  ');
} else {
    page.open(url, function (status) {
        if (status !== "success") {
            time = Date.now() - time;
            data = {
                code: 0, // 返回状态码，1为成功，0为失败
                msg: '抓取失败', // 返回的信息
                word: key, // 抓取的关键字
                time: time };
            data = JSON.stringify(data, null, 4);
            fs.write("task.json", data, 'w');
            phantom.exit();
        } else {
            time = Date.now() - time;
            page.includeJs("https://code.jquery.com/jquery-3.1.1.min.js", function () {

                data = page.evaluate(function (time, key) {
                    var result = [];
                    var total = $('.c-row.c-gap-top-small');
                    for (var i = 0, len = total.length; i < len; i++) {
                        var list = {};
                        list.title = $(total[i]).prev().text() || ''; // 结果条目的标题
                        list.info = $(total[i]).find('.c-span18.c-span-last').text() || ''; // 摘要
                        list.link = $(total[i]).prev().find('a').attr('href') || ''; // 链接
                        var pic = $(total[i]).find('.c-img.c-img6'); //缩略图地址
                        list.pic = pic && pic.length ? pic.attr('src') : '';
                        result.push(list);
                    }

                    return JSON.stringify({
                        code: 1,
                        msg: '抓取成功',
                        word: key,
                        time: time,
                        dataList: result
                    }, null, 4);
                }, time, key);
                console.log(data);
                fs.write("task.json", data, 'w');
                phantom.exit();
            });
        }
    });
}

/****
 * 1. 元素集合转换为数组，无法编译进行
 * 2. 文件模块不明白
 * *****/
//# sourceMappingURL=test.js.map