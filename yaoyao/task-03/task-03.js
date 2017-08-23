/**
 * Created by shi on 2017/4/18.
 */

window.onload = function () {

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

        Array.from(Students).forEach((input) => {

            //箭头函数的使用？？
            input.onclick = function () {
                console.log(this.value);
                let value = this.value;

                if(value === item){
                    return
                }
                tar[value].style.display = 'block';
                tar[item].style.display = 'none';
                item = value;
            }

        })



        city.oninput = function () {
            const value = city.value,
                  university = document.getElementsByClassName('school')[0];
           // 清空所有选项
            university.innerHTML = '';

            //调用selectObject.option来清空
            // university.options.length = 0;

            if(value){
                schools[value].forEach(function (val,index) {
                    university.appendChild(createOption(index,val));
                })
            }
        }



    }
    init();


}
