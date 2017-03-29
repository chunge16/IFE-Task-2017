/**
 * Created by shi on 2017/3/24.
 */
'use strict';

window.onload = function () {

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
    function setAction(arr, i) {
        var timer = setInterval(function () {
            if (i > arr.length - 1) {
                arr[arr.length - 1].style.backgroundColor = "#fff";
                clearInterval(timer);
                return;
            } else {
                changeStyle(arr[i]);
            }
            ++i;
        }, 500);
    }

    //按钮事件
    function btnOK(root, fn) {
        var i = 0,
            arr = [];
        fn(root, arr);
        setAction(arr, i);
    }

    function init() {
        var root = document.querySelector('.box-one'),
            preOrderBtn = document.querySelector('.btn-perOrder'),
            inOrderBtn = document.querySelector('.btn-inOrder'),
            postOrderBtn = document.querySelector('.btn-postOrder');

        preOrderBtn.onclick = function () {
            btnOK(root, preOrderTranverse);
        };

        inOrderBtn.onclick = function () {
            btnOK(root, inOrderTranverse);
        };

        postOrderBtn.onclick = function () {
            btnOK(root, postOrderTranverse);
        };
    }

    init();
};
//# sourceMappingURL=task-07.js.map