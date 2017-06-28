"use strict";
//system模块可以加载操作系统变量，system.args就是参数数组

var system = require('system'),

//webpage模块是PhantomJS的核心模块，用于网页操作
webPage = require('webpage'),
    page = webPage.create(),
    key = system.args[1],
    time = Date.now();

//命令行没有给出参数
if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
} else {
    page.open('https://www.baidu.com/s?wd=' + encodeURIComponent(key) + '&rsv_spt=1&rsv_iqid=0xa6ce1e3700030359&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=10&rsv_sug1=11&rsv_sug7=100', function (status) {
        var obj = {
            code: 1, //返回状态码，1为成功，0为失败
            msg: '抓取成功', //返回的信息
            word: '示例关键字', //抓取的关键字
            time: 2000, //任务的时间
            dataList: [//抓取结果列表
            {
                title: 'xx', //结果条目的标题
                info: '', //摘要
                link: '', //链接
                pic: '' //缩略图地址
            }]
        };

        if (status !== 'success') {
            time = Date.now() - time;
            obj = {
                code: 0, //返回状态码，1为成功，0为失败
                msg: '抓取失败', //返回的信息
                word: key, //抓取的关键字
                time: time, //任务的时间
                dataList: []
            };
            console.log(JSON.stringify(obj));
            phantom.exit();
        } else {
            time = Date.now() - time;
            console.log('Loading ' + key);
            console.log('Loading time ' + time + ' msec');

            //加载外部脚步
            page.includeJs("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js", function () {
                //evaluate方法用于打开网页以后，在页面中执行JavaScript代码
                page.evaluate(function () {

                    Array.form($('.c-row.c-gap-top-small')).forEach(function (val, index) {
                        var item = {};
                        item.title = val.previousElementSibling.innerText;
                        item.info = val.lastElementChild.innerText;
                        item.link = val.previousElementSibling.firstElementChild.href;
                        item.pic = val.firstElementChild.firstElementChild.firstElementChild.src;
                        obj.dataList.push(item);
                    });
                });
                console.log(JSON.stringify(obj));
                phantom.exit();
            });
        }
    });
}
//# sourceMappingURL=test.js.map