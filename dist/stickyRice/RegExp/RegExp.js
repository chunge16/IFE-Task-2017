'use strict';

/**
 * Created by shi on 2017/3/14.
 */

window.onload = function () {

    //正则验证
    function verification(re, str) {

        var result = re.test(str);

        if (result) {
            return true;
        } else {
            return false;
        }
    }

    //
    document.querySelector('.btn-Number').onclick = function () {
        var number = document.querySelector('#exampleInputNumber').value,
            hint = document.querySelector('.Number-hint'),
            rePhone = /^1[3,4,5,7,8]\d{9}$/,
            result = verification(rePhone, number);

        if (result && number) {
            hint.innerText = '输入正确，通过验证';
            hint.style.color = 'green';
        } else {
            hint.style.color = 'red';
            if (!number) {
                hint.innerText = '输入不能为空';
            } else {
                hint.innerText = '输入有误，请重新输入';
            }
        }
    };

    document.querySelector('.btn-Str').onclick = function () {
        var str = document.querySelector('#exampleInputStr').value,
            hint = document.querySelector('.Str-hint'),
            reStr = /\b([A-Za-z]+)\b\W+\1\b/,
            result = verification(reStr, str);

        if (result && str) {
            hint.innerText = '输入正确，通过验证';
            hint.style.color = 'green';
        } else {
            hint.style.color = 'red';
            if (!str) {
                hint.innerText = '输入不能为空';
            } else {
                hint.innerText = '输入有误，请重新输入';
            }
        }
    };
};
//# sourceMappingURL=RegExp.js.map