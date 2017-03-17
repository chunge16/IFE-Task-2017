/**
 * Created by shi on 2017/3/15.
 */
'use strict';

window.onload = function () {
    //元素添加class
    function addClass(el, csName) {
        if (!hasClass(el, csName)) {
            el.className += " " + csName;
        }
    }
    //元素删除class
    function removeClass(el, csName) {
        var re = new RegExp('(\\s|^)' + csName + '(\\s|$)');
        if (hasClass(el, csName)) {
            el.className = el.className.replace(re, ' ');
        }
    }
    //class是否重复
    function hasClass(el, csName) {
        return el.className.match(new RegExp('(\\s|^)' + csName + '(\\s|$)'));
    }
    //是否是ASCII
    function isASCII(char) {
        return char.codePointAt(0) <= 0xFF;
    }

    //验证格式和长度
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

    function init() {
        document.querySelector('.btn-ok').onclick = function () {
            var value = document.querySelector('#inputVerify').value.trim(),
                form = document.querySelector('.form-group'),
                hint = document.querySelector('.help-block'),
                strLength = getStrLength(value);

            var minLen = 4,
                maxLen = 16;

            if (strLength === 0 || value === null || value === '') {
                addClass(form, 'has-error');
                removeClass(form, 'has-success');

                //HTML DOM classList 属性 支持添加class和删除class，但是注意兼容性IE10以上
                // form.classList.add('has-error');
                // form.classList.remove('has-success');

                hint.innerText = '输入不能为空！';
            } else if (strLength < minLen) {
                addClass(form, 'has-error');
                removeClass(form, 'has-success');
                hint.innerText = '字符长度不能小于4！';
            } else if (strLength > maxLen) {
                addClass(form, 'has-error');
                removeClass(form, 'has-success');
                hint.innerText = '字符长度不能大于16！';
            } else {
                addClass(form, 'has-success');
                removeClass(form, 'has-error');
                hint.innerText = '恭喜你，输入格式正确！';
            }
        };
    }
    init();
};
//# sourceMappingURL=task-01.js.map