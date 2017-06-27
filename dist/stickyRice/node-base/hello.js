

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
    page.open('https://www.baidu.com/s?wd=' + key + '&rsv_spt=1&rsv_iqid=0xa6ce1e3700030359&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=10&rsv_sug1=11&rsv_sug7=100', function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            time = Date.now() - time;
            console.log('Loading ' + key);
            console.log('Loading time ' + time + ' msec');

            page.includeJs("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js", function () {
                page.evaluate(function () {
                    $("button").click();
                });
                phantom.exit();
            });
        }
    });
}
//# sourceMappingURL=hello.js.map