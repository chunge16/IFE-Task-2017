'use strict';

/**
 * Created by shi on 2017/4/14.
 */
window.onload = function () {

    //元素添加class
    function addClass(el, csName) {
        if (!hasClass(el, csName)) {
            el.className += ' ' + csName;
        }
    }

    //元素删除class
    function removeClass(el, csName) {
        var re = new RegExp('(\\s|^)' + csName + '(\\s|$)');
        if (hasClass(el, csName)) {
            el.className = el.className.replace(re, '');
        }
    }

    //class是否重复
    function hasClass(el, csName) {
        //公共常量定义
        var re = new RegExp('(\\s|^)' + csName + '(\\s|$)');

        if (csName) {
            return el.className.match(re);
        } else {
            return false;
        }
    }

    //是否是ASCII
    function isASCII(char) {
        return char.codePointAt(0) <= 0xFF;
    }

    //验证名称格式和长度
    function getStrLength(str) {
        var enlen = 0,
            zhlen = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var char = _step.value;

                if (isASCII(char)) {
                    enlen++;
                } else {
                    zhlen++;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return enlen + zhlen * 2;
    }

    //验证样式变化
    function verifyStyle(obj, isok) {

        if (isok) {
            removeClass(obj, 'has-error');
            addClass(obj, 'has-success');
        } else {
            removeClass(obj, 'has-success');
            addClass(obj, 'has-error');
        }
    }

    //获得焦点
    function getFocus(e, text) {
        if (e && text) {
            e.innerText = text;
        }
    }

    function init() {
        var name = document.getElementById('name'),
            Password = document.getElementById('Password'),
            Password2 = document.getElementById('Password2'),
            email = document.getElementById('email'),
            phone = document.getElementById('phone');
        var nameHint = document.getElementsByClassName('name-hint')[0],
            PasswordHint = document.getElementsByClassName('Password-hint')[0],
            Password2Hint = document.getElementsByClassName('Password2-hint')[0],
            emailHint = document.getElementsByClassName('email-hint')[0],
            phoneHint = document.getElementsByClassName('phone-hint')[0];

        var pwdRe = /^\d{6}$/,
            emailRe = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

        //获得焦点
        name.onfocus = function () {
            var text = '字符长度4-16位';
            getFocus(nameHint, text);
        };
        Password.onfocus = function () {
            var text = '6位数字';
            getFocus(PasswordHint, text);
        };
        Password2.onfocus = function () {
            var text = '再次输入相同密码';
            getFocus(Password2Hint, text);
        };
        email.onfocus = function () {
            var text = '正确的邮箱格式';
            getFocus(emailHint, text);
        };
        phone.onfocus = function () {
            var text = '正确手机号码格式';
            getFocus(phoneHint, text);
        };
    }

    init();
};
//# sourceMappingURL=task-02.js.map