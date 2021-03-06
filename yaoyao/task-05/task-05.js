'use strict';

window.onload = function () {
    function init() {
        const table = document.querySelector('.tables'),
            select = document.querySelector('.select'),
            btn = document.querySelector('.btn'),
            box_guide = document.createElement('div');


        // 棋盘构造函数
        function checkerboard(num) {
            let theads = document.createElement('thead'),
                tbodys = document.createElement('tbody');

            theads.appendChild(document.createElement('tr'));

            const theads_tr = theads.firstElementChild,
                th_one = document.createElement('th');

            th_one.innerHTML = '';
            theads_tr.appendChild(th_one);

            for (let i = 0; i < num; i++) {
                let th = document.createElement('th'),
                    tr = document.createElement('tr'),
                    tds = '';

                // add thead
                th.innerHTML = i + 1;
                theads_tr.appendChild(th)

                // add tbody
                for (let j = 0; j <= num; j++) {
                    if (j === 0) {
                        tds += `<td>${i + 1}</td>`
                    }
                    else {
                        tds += '<td></td>'
                    }
                }
                tr.innerHTML = tds;
                tbodys.appendChild(tr);

            }

            return [theads, tbodys]
        }

        // 获取 transform rotate 的属性值
        function getRotateValue(node) {
            let reg = new RegExp(/-?\d+/),
                rotateValue = node.style.transform;

            if (node === void(0)) {
                return null
            }
            if (!rotateValue) {
                return null
            }
            let result = reg.exec(rotateValue);

            return result[0]

        }

        // fn GO
        function fnGo(node, direction) {
            // 取绝对值
            direction = Math.abs(Number(direction));
            const num = 40;
            // 获取节点相对父元素的偏移量
            var topValue = Number(node.offsetTop),
                leftValue = Number(node.offsetLeft);
            if (!node || direction === void(0)) {
                return null;
            }
            // 范围的限定 (40px,40px) (400px,400px)
            if (topValue < 40 || topValue > 400) {
                return
            }
            if (leftValue < 40 || leftValue > 400) {
                return
            }

            // 重置角度，确定方向
            if(direction >= 360){
                let ratio = direction / 360;
                while (ratio >= 1){
                    ratio -= 1
                }
                direction = ratio * 360;

            }
            // 四个方向判断, 通过transform: rotate(90deg)的角度判断
            switch (direction) {
                // top
                case 0:
                    if(topValue === 40){
                        node.style.top = '40px';
                    }
                    else {
                        node.style.top = topValue - num + 'px';

                    }
                    break;
                // right
                case 90:
                    if(leftValue === 400){
                        node.style.left = '400px';
                    }
                    else {
                        node.style.left = leftValue + num + 'px';

                    }
                    break;
                // bottom
                case 180:
                    if(topValue === 400){
                        node.style.top = '400px'
                    }
                    else {
                        node.style.top = topValue + num + 'px';
                    }
                    break;
                // left
                case 270:
                    if(leftValue === 40){
                        node.style.left = '40px';
                    }
                    else {
                        node.style.left = leftValue - num + 'px';
                    }
                    break;
                default:
                    break;

            }

        }

        // fn TUN
        function changeDirection(node, value) {
            let rotateValue = Number(getRotateValue(box_guide));
            if (!node) {
                return
            }

            node.style.transform = `rotate(${rotateValue + value}deg)`

        }
        // 固定四个方向转向
        function fnTurn(node,value) {
            let rotateValue = Number(getRotateValue(box_guide));

            if (!node){
                return
            }
            if(!value && value !== 0){
                return
            }
            if(rotateValue !== value){
                node.style.transform = `rotate(${value}deg)`
            }

        }

        // 添加棋盘
        let checker = checkerboard(10);
        table.innerHTML = '';
        // 添加移动的小盒子
        box_guide.classList.add('box');
        box_guide.style.transform = 'rotate(-90deg)';
        table.appendChild(checker[0]);
        table.appendChild(checker[1]);
        table.appendChild(box_guide);

        btn.onclick = function () {
            let selectValue = select.value,
                rotateValue = Number(getRotateValue(box_guide));
            if (selectValue) {
                switch (selectValue) {
                    case 'GO':
                        fnGo(box_guide, rotateValue);
                        break;
                    case 'TUN LEF':
                        changeDirection(box_guide,-90);
                        break;
                    case 'TUN RIG':
                        changeDirection(box_guide,90);
                        break;
                    case 'TUN BAC':
                        changeDirection(box_guide,180)
                        break;
                    case 'TRA LEF':
                        fnGo(box_guide,270);
                        break;
                    case 'TRA TOP':
                        fnGo(box_guide,0);
                        break;
                    case 'TRA RIG':
                        fnGo(box_guide,90);
                        break;
                    case 'TRA BOT':
                        fnGo(box_guide,180);
                        break;
                    case 'MOV LEF':
                        // 方向转向屏幕左侧，并向屏幕的左侧移动一格
                        // 可以利用setInterval循环执行changeDirection
                        if(rotateValue !== -90){
                            let timer = setInterval(function () {
                                changeDirection(box_guide,-90)
                                let newRotateValue = Number(getRotateValue(box_guide));
                                if(newRotateValue === -90){
                                    clearInterval(timer)
                                }
                            },50)
                        }

                        // fnTurn(box_guide,-90);
                        setTimeout(function () {
                            fnGo(box_guide,270);
                        },1001);
                        break;
                    case 'MOV TOP':
                        fnTurn(box_guide,0);
                        setTimeout(function () {
                            fnGo(box_guide,0);
                        },1001)
                        break;
                    case 'MOV RIG':
                        fnTurn(box_guide,90);
                        setTimeout(function () {
                            fnGo(box_guide,90);
                        },1001)
                        break;
                    case 'MOV BOT':
                        fnTurn(box_guide,180);
                        setTimeout(function () {
                            fnGo(box_guide,180);
                        },1001)
                        break;
                    default:
                        return
                }


            }
            else {
                alert('请选择指令')
            }

        }
    }

    init()



}