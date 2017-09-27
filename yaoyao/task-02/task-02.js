/**
 * Created by shi on 2017/4/14.
 */
window.onload = function () {

    // 元素添加class
    function addClass(el,csName) {
        if(!hasClass(el,csName)){
            el.className += ' ' + csName;
        }
    }

    // 元素删除class
    function removeClass(el,csName) {
        const re = new RegExp('(\\s|^)'+csName+'(\\s|$)');
        if(hasClass(el,csName)){
            // el.className = el.className.replace(re,'');
            // 另外一种删除class的方法
            let classList = el.className.split(' ').filter(_class => {
                return csName !== _class
            })
            el.className = classList.join(' ')
        }

    }

    // class是否重复
    function hasClass(el,csName) {
        //公共常量定义
        const re = new RegExp('(\\s|^)'+csName+'(\\s|$)');

        if(el.className.match(re)){
            return true;
        }
        else {
            return false;
        }
    }

    // 是否是ASCII
    function isASCII(char) {
        return char.codePointAt(0) <= 0xFF;
    }

    // 验证名称格式和长度
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

    // 验证样式变化
    function verifyStyle(obj,isok) {

        if(isok){
            removeClass(obj,'has-error');
            addClass(obj,'has-success');
        }
        else {
            removeClass(obj,'has-success');
            addClass(obj,'has-error');
        }
    }

    // 检查是否为空
    function isEmpty(value) {
        // 为空返回true
        if(!value.trim()){
            return true
        }
        return false
    }

    // 获得焦点
    function getFocus (e) {
        removeClass(e.parentElement,'has-success');
        removeClass(e.parentElement,'has-error');
        if(e){
            // e.parentElement.nextElementSibling.style.display = 'block';
            // 避免过多操作DOM，应该是用class去改变样式，而不是直接修改单个样式属性
            addClass(e.parentElement.nextElementSibling,'display-black')
        }

    }
    

    

    function init() {
        let name = document.getElementById('name'),
            Password = document.getElementById('Password'),
            rePassword = document.getElementById('rePassword'),
            email = document.getElementById('email'),
            phone = document.getElementById('phone'),
            form = document.querySelectorAll('.group'),
        inputs = Array.from(document.querySelectorAll('.group input'));

        let nameHint = document.getElementsByClassName('name-hint')[0],
            PasswordHint = document.getElementsByClassName('Password-hint')[0],
            rePasswordHint = document.getElementsByClassName('rePasswordHint')[0],
            emailHint = document.getElementsByClassName('email-hint')[0],
            phoneHint = document.getElementsByClassName('phone-hint')[0],
            submit = document.getElementsByClassName('btn-submit')[0];

        const pwdRe = /^\d{6}$/,
            emailRe = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            phoneRe = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/;

        //获得焦点
        inputs.forEach(val =>{
            val.onfocus = function () {
                getFocus(val);
            };
        })

        //失去焦点
        name.onblur = function () {
            let value = name.value,
                strLength = getStrLength(value);

            const minLen = 4,
                maxLen = 16;

            if(isEmpty(value)){
                verifyStyle(nameHint.parentElement,false);
                //HTML DOM classList 属性 支持添加class和删除class，但是注意兼容性IE10以上
                // form.classList.add('has-error');
                // form.classList.remove('has-success');
                nameHint.innerText = '输入不能为空！';
            }
            else if(strLength < minLen || strLength > maxLen){
                verifyStyle(nameHint.parentElement,false);
                nameHint.innerText = '字符长度错误！';
            }

            else {
                verifyStyle(nameHint.parentElement,true);
                nameHint.innerText = '恭喜你，输入格式正确！';

            }
        }

        Password.onblur = function () {
            let value = Password.value.trim();
            
            if(isEmpty(value)){
                verifyStyle(PasswordHint.parentElement,false);
                PasswordHint.innerText = '输入不能为空';
            }
            else if(!pwdRe.test(value)){
                verifyStyle(PasswordHint.parentElement,false);
                PasswordHint.innerText = '密码不可用';
            }
            else if(pwdRe.test(value)){
                verifyStyle(PasswordHint.parentElement,true);
                PasswordHint.innerText = '密码可用';
            }

        }

        rePassword.onblur = function () {
            let value2 = rePassword.value.trim(),
                value = Password.value.trim();

            if(isEmpty(value)){
                verifyStyle(rePasswordHint.parentElement,false);
                rePasswordHint.innerText = '输入不能为空';
            }
            else if(!pwdRe.test(value2)){
                verifyStyle(rePasswordHint.parentElement,false);
                rePasswordHint.innerText = '密码格式不对';
            }
            else if(value !== value2){
                verifyStyle(rePasswordHint.parentElement,false);
                rePasswordHint.innerText = '密码输入不一致';
            }
            else if(pwdRe.test(value2) && value === value2){
                verifyStyle(rePasswordHint.parentElement,true);
                rePasswordHint.innerText = '密码输入一致';
            }

        }

        email.onblur = function () {
            let value = email.value;

            if(isEmpty(value)){
                verifyStyle(emailHint.parentElement,false);
                emailHint.innerText = '输入不能为空';
            }
            else if(!emailRe.test(value)){
                verifyStyle(emailHint.parentElement,false);
                emailHint.innerText = "邮箱格式不对";
            }
            else if(emailRe.test(value)){
                verifyStyle(emailHint.parentElement,true);
                emailHint.innerText = '邮箱格式正确';
            }

        }

        phone.onblur = function () {
            let value = phone.value;

            if(isEmpty(value)){
                verifyStyle(phoneHint.parentElement,false);
                phoneHint.innerText = '输入不能为空';
            }
            else if(!phoneRe.test(value)){
                verifyStyle(phoneHint.parentElement,false);
                phoneHint.innerText = "手机格式不对";
            }
            else if(phoneRe.test(value)){
                verifyStyle(phoneHint.parentElement,true);
                phoneHint.innerText = '手机格式正确';
            }

        }
        

        //submit
        submit.onclick = function () {
            let isok = true;

            name.onblur();
            Password.onblur();
            rePassword.onblur();
            email.onblur();
            phone.onblur();

            form = Array.from(form);
            form.forEach(val =>{
                if(hasClass(val,'has-error')){
                    isok = false;
                }

            });

            if(isok){
                alert('提交成功');
            }
            else {
                alert('提交失败');
            }


        }




        
    }

    init();
    
}