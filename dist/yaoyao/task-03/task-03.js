'use strict';

/**
 * Created by shi on 2017/4/18.
 */

window.onload = function () {

    function changeSelect(select, index, arr) {
        var option = null;
        select.innerHTML = '';
        arr[index].forEach(function (val) {
            option = document.createElement("option");
            option.innerHTML = val;
            select.appendChild(option);
        });
    }

    function inint() {
        var inlineRadio1 = document.getElementById('inlineRadio1'),
            inlineRadio2 = document.getElementById('inlineRadio2'),
            school = document.getElementsByClassName('select-school')[0],
            company = document.getElementsByClassName('input-company')[0],
            city = document.getElementsByClassName('city')[0],
            university = document.getElementsByClassName('school')[0];

        var bj = ['北京大学', '清华大学', '北京师范大学', '中国人民大学'],
            sh = ['上海交通大学', '复旦大学', '同济大学', '上海财经大学'],
            gz = ['中山大学', '广州大学', '华南理工大学', '暨南大学'],
            cq = ['重庆大学', '西南大学', '第三军医大学', '重庆交通大学'],
            arr = [bj, sh, gz, cq];

        inlineRadio1.onclick = function () {
            if (inlineRadio1.checked) {
                company.style.display = 'none';
                school.style.display = 'block';
            }
        };
        inlineRadio2.onclick = function () {
            if (inlineRadio2.checked) {
                company.style.display = 'block';
                school.style.display = 'none';
            }
        };

        city.oninput = function () {
            var index = city.selectedIndex;
            changeSelect(university, index, arr);
            console.log(university.value);
        };
    }
    inint();
};
//# sourceMappingURL=task-03.js.map