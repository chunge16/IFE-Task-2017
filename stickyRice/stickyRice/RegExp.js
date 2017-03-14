/**
 * Created by shi on 2017/3/14.
 */

window.onload =  function () {

    //正则验证
    function verification(re,str) {

        let result = re.test(str);

        if(result){
            return true;
        }
        else {
            return false;
        }

    }

    //手机号验证
    document.querySelector('.btn-Number').onclick = function () {
        let number = document.querySelector('#exampleInputNumber').value,
            hint = document.querySelector('.Number-hint'),
            rePhone = /^1(3\d[0-8]|14[5,7,9][0-9]|5[0,2,3,5,6,7,8,9]\d|7\d{2}|18\d{2})\d{7}$/,
            result = verification(rePhone,number);

        if(result&&number){
            hint.innerText = '输入正确，通过验证';
            hint.style.color = 'green';
        }else {
            hint.style.color = 'red';
            if(!number){
                hint.innerText = '输入不能为空';
            }
            else{
                hint.innerText = '输入有误，请重新输入';
            }
        }


    }

    //相邻单词验证
    document.querySelector('.btn-Str').onclick = function () {
        let str = document.querySelector('#exampleInputStr').value,
            hint = document.querySelector('.Str-hint'),
            reStr = /\b([A-Za-z]+)\b\s+\1\b/,
            result = verification(reStr,str);


        if(result&&str){
            hint.innerText = '输入正确，通过验证';
            hint.style.color = 'green';
        }else {
            hint.style.color = 'red';
            if(!str){
                hint.innerText = '输入不能为空';
            }
            else{
                hint.innerText = '输入有误，请重新输入';
            }
        }

    }
}
