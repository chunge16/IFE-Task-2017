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

        if (el.className.match(re)) {
            return true;
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
        removeClass(e.parentElement, 'has-success');
        removeClass(e.parentElement, 'has-error');
        if (e && text) {
            e.innerText = text;
        }
    }
    //失去焦点
    function outFocus(e, test, isOK) {
        if (isOK) {
            verifyStyle(e.parentElement, false);
            e.innerText = test;
        } else {
            verifyStyle(e.parentElement, true);
            e.innerText = test;
        }
    }

    function init() {
        var name = document.getElementById('name'),
            Password = document.getElementById('Password'),
            Password2 = document.getElementById('Password2'),
            email = document.getElementById('email'),
            phone = document.getElementById('phone'),
            form = document.querySelectorAll('.group');

        var nameHint = document.getElementsByClassName('name-hint')[0],
            PasswordHint = document.getElementsByClassName('Password-hint')[0],
            Password2Hint = document.getElementsByClassName('Password2-hint')[0],
            emailHint = document.getElementsByClassName('email-hint')[0],
            phoneHint = document.getElementsByClassName('phone-hint')[0],
            submit = document.getElementsByClassName('btn-submit')[0];

        var pwdRe = /^\d{6}$/,
            emailRe = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            phoneRe = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/;

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
            var text = '11位手机号码';
            getFocus(phoneHint, text);
        };

        //失去焦点
        name.onblur = function () {
            var value = name.value,
                strLength = getStrLength(value);

            var minLen = 4,
                maxLen = 16;

            if (strLength === 0 || value === null || value === '') {
                verifyStyle(nameHint.parentElement, false);
                //HTML DOM classList 属性 支持添加class和删除class，但是注意兼容性IE10以上
                // form.classList.add('has-error');
                // form.classList.remove('has-success');
                nameHint.innerText = '输入不能为空！';
            } else if (strLength < minLen) {
                verifyStyle(nameHint.parentElement, false);
                nameHint.innerText = '字符长度不能小于4！';
            } else if (strLength > maxLen) {
                verifyStyle(nameHint.parentElement, false);
                nameHint.innerText = '字符长度不能大于16！';
            } else {
                verifyStyle(nameHint.parentElement, true);
                nameHint.innerText = '恭喜你，输入格式正确！';
            }
        };

        Password.onblur = function () {
            var value = Password.value.trim();

            if (!value) {
                verifyStyle(PasswordHint.parentElement, false);
                PasswordHint.innerText = '输入不能为空';
            } else if (!pwdRe.test(value)) {
                verifyStyle(PasswordHint.parentElement, false);
                PasswordHint.innerText = '密码不可用';
            } else if (pwdRe.test(value)) {
                verifyStyle(PasswordHint.parentElement, true);
                PasswordHint.innerText = '密码可用';
            }
        };

        Password2.onblur = function () {
            var value2 = Password2.value.trim(),
                value = Password.value.trim();

            if (!value2) {
                verifyStyle(Password2Hint.parentElement, false);
                Password2Hint.innerText = '输入不能为空';
            } else if (!pwdRe.test(value2)) {
                verifyStyle(Password2Hint.parentElement, false);
                Password2Hint.innerText = '密码格式不对';
            } else if (value !== value2) {
                verifyStyle(Password2Hint.parentElement, false);
                Password2Hint.innerText = '密码输入不一致';
            } else if (pwdRe.test(value2) && value === value2) {
                verifyStyle(Password2Hint.parentElement, true);
                Password2Hint.innerText = '密码输入一致';
            }
        };

        email.onblur = function () {
            var value = email.value;

            if (!value) {
                verifyStyle(emailHint.parentElement, false);
                emailHint.innerText = '输入不能为空';
            } else if (!emailRe.test(value)) {
                verifyStyle(emailHint.parentElement, false);
                emailHint.innerText = "邮箱格式不对";
            } else if (emailRe.test(value)) {
                verifyStyle(emailHint.parentElement, true);
                emailHint.innerText = '邮箱格式正确';
            }
        };

        phone.onblur = function () {
            var value = phone.value;

            if (!value) {
                verifyStyle(phoneHint.parentElement, false);
                phoneHint.innerText = '输入不能为空';
            } else if (!phoneRe.test(value)) {
                verifyStyle(phoneHint.parentElement, false);
                phoneHint.innerText = "手机格式不对";
            } else if (phoneRe.test(value)) {
                verifyStyle(phoneHint.parentElement, true);
                phoneHint.innerText = '手机格式正确';
            }
        };

        var isok = true;

        //submit
        submit.onclick = function () {
            var isok = true;

            name.onblur();
            Password.onblur();
            Password2.onblur();
            email.onblur();
            phone.onblur();

            form = Array.from(form);

            form.forEach(function (val) {
                if (hasClass(val, 'has-error')) {
                    isok = false;
                }
            });

            if (isok) {
                alert('提交成功');
            } else {
                alert('提交失败');
            }
        };
    }

    init();
};
//# sourceMappingURL=task-02.js.map