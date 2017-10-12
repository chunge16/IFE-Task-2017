/**
 * Created by shi on 2017/4/18.
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
    
    // 替换类名
    function replaceClass(el,newClass,oldClass) {
        // 先删除类名，再添加
        removeClass(el,oldClass)
        addClass(el,newClass)
        
    }

    function createOption (value, text) {
        let option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        return option
    }

    function init() {

        const Students = document.querySelectorAll('input[type=radio]'),
              school = document.getElementsByClassName('select-school')[0],
              company = document.getElementsByClassName('input-company')[0],
              city = document.getElementsByClassName('city')[0];


        const schools = {
            '北京': ['北京大学','清华大学','北京师范大学','中国人民大学'],
            '上海': ['上海交通大学','复旦大学','同济大学','上海财经大学'],
            '广州': ['中山大学','广州大学','华南理工大学','暨南大学'],
            '重庆': ['重庆大学','西南大学','第三军医大学','重庆交通大学']
        }

        const tar = {
            'inStudent': school,
            'outStudent': company
        };

        let item = 'inStudent';

        Array.from(Students).forEach(input => {

            //箭头函数的使用？？
            input.onclick = function () {
                let value = this.value;

                if(value === item){
                    return
                }
                // tar[value].style.display = 'block';
                // tar[item].style.display = 'none';
                // 修改样式，应该多用class
                // removeClass(tar[item],'display-black')
                // addClass(tar[item],'display-none')
                // removeClass(tar[value],'display-none')
                // addClass(tar[value],'display-black')
                replaceClass(tar[item],'display-none','display-black')
                replaceClass(tar[value],'display-black','display-none')
                item = value;
            }

        })


        // oninput,onpropertychange,onchange的用法和区别
        city.oninput = function () {
            const value = city.value,
                  university = document.getElementsByClassName('school')[0];
                  university_item = university.getElementsByTagName('option');
            // 清空所有选项
            //  university.innerHTML = '';

            // 应该避免过多操作DOM,所以直接修改选项的文本
            if(value){
                schools[value].forEach((val,index) => {
                    // university.appendChild(createOption(index,val));
                    /*
                    innerHTML是符合W3C标准的属性，而innerText只适用于IE浏览器，因此，
                     尽可能地去使用innerHTML，而少用innerText
                     */
                    university_item[index].innerHTML = val;
                })
            }
        }


    }
    init();

}
