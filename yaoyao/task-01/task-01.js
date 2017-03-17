/**
 * Created by shi on 2017/3/15.
 */



window.onload = function () {
    //元素添加class
    function addClass(el,csName) {
        if(!hasClass(el,csName)){
            el.className += " " + csName;
        }
    }
    //元素删除class
    function removeClass(el,csName) {
        let re = new RegExp('(\\s|^)'+csName+'(\\s|$)');
        if(hasClass(el,csName)){
            el.className = el.className.replace(re,' ');

        }
    }
    //class是否重复
    function hasClass(el,csName) {
        return el.className.match(new RegExp('(\\s|^)'+csName+'(\\s|$)'));
    }
    //是否是ASCII
    function isASCII(char) {
        return char.codePointAt(0) <= 0xFF;
    }

    //验证格式和长度
    function getStrLength(str) {
        let enlen = 0,
            zhlen = 0;
        for(let char of str){
            if(isASCII(char)){
                enlen++;
            }
            else {
                zhlen++;
            }
        }
        return enlen + zhlen*2;
    }


    document.querySelector('.btn-ok').onclick = function () {
        let value = document.querySelector('#inputVerify').value,
            form = document.querySelector('.form-group'),
            hint = document.querySelector('.help-block'),
            strLength = getStrLength(value);

        if(value === null || value === ""){
            addClass(form,'has-error');
            removeClass(form,'has-success');
            hint.innerText = '输入不能为空！';
        }
        else {
            if(strLength >=4 && strLength <= 16){
                addClass(form,'has-success');
                removeClass(form,'has-error');

                hint.innerText = '恭喜你，输入格式正确！';
            }
            else {
                addClass(form,'has-error');
                removeClass(form,'has-success');
                hint.innerText = '输入格式错误！';
            }
        }

    }
}