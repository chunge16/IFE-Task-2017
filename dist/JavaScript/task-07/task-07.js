/**
 * Created by shi on 2017/3/24.
 */
'use strict';

window.onload = function () {

    var timer = null;

    //前序遍历
    function preOrderTranverse(node, arr) {
        if (node !== null) {
            arr.push(node);
            preOrderTranverse(node.firstElementChild, arr);
            preOrderTranverse(node.lastElementChild, arr);
        }
    }

    //中序遍历
    function inOrderTranverse(node, arr) {
        if (node !== null) {
            preOrderTranverse(node.firstElementChild, arr);
            arr.push(node);
            preOrderTranverse(node.lastElementChild, arr);
        }
    }

    //后序遍历
    function postOrderTranverse(node, arr) {
        if (node !== null) {
            preOrderTranverse(node.firstElementChild, arr);
            preOrderTranverse(node.lastElementChild, arr);
            arr.push(node);
        }
    }

    //遍历style改变
    function changeStyle(el) {
        var nodeArr = document.querySelectorAll('.box');
        for (var i = 0; i < nodeArr.length; i++) {
            nodeArr[i].style.backgroundColor = '#fff';
        }
        el.style.backgroundColor = '#337ab7';
    }

    //动画事件
    function setAction(arr) {
        var i = 0;
        timer = setInterval(function () {
            if (i > arr.length - 1) {
                arr[arr.length - 1].style.backgroundColor = "#fff";
                clearInterval(timer);
            } else {
                if (i > 0) {
                    arr[i - 1].style.backgroundColor = '#fff';
                }
                arr[i].style.backgroundColor = '#337ab7';
            }
            i++;
        }, 500);
    }

    //按钮事件
    function btnOK(root, fn) {
        var arr = [];
        clearInterval(timer);
        fn(root, arr);
        setAction(arr);
    }

    function init() {
        var root = document.querySelector('.box-one'),
            preOrderBtn = document.querySelector('.btn-perOrder'),
            inOrderBtn = document.querySelector('.btn-inOrder'),
            postOrderBtn = document.querySelector('.btn-postOrder');

        preOrderBtn.onclick = function () {
            btnOK(root, preOrderTranverse, timer);
        };

        inOrderBtn.onclick = function () {
            btnOK(root, inOrderTranverse, timer);
        };

        postOrderBtn.onclick = function () {
            btnOK(root, postOrderTranverse, timer);
        };
    }

    init();
};
//# sourceMappingURL=task-07.js.map