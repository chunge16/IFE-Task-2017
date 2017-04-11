/**
 * Created by shi on 2017/4/5.
 */

'use strict';

window.onload = function () {

    var timer = null,
        BFindex = 0,
        //广度优先遍历自增标识符
    lock = true;

    //深度遍历
    function traverseDF(node, nodeArr) {
        if (node) {
            nodeArr.push(node);
            for (var i = 0; i < node.children.length; i++) {
                traverseDF(node.children[i], nodeArr);
            }
        }
    }

    //广度遍历
    function traverseBF(node, nodeArr) {
        if (node) {
            nodeArr.push(node);
            traverseBF(node.nextElementSibling, nodeArr);
            node = nodeArr[BFindex++];
            traverseBF(node.firstElementChild, nodeArr);
        }
    }

    //动画
    function setAction(arr, key, iskey) {
        var i = 0;
        timer = setInterval(function () {
            if (i > arr.length - 1) {
                arr[arr.length - 1].className = "default";
                arr[arr.length - 1].style.transform = "scale(1)";
                clearInterval(timer);
                lock = true;
            } else {
                if (i > 0) {
                    arr[i - 1].className = '#default';
                    arr[i - 1].style.transform = "scale(1)";
                }
                arr[i].className = 'active';
                arr[i].style.transform = "scale(1.1)";
                //搜索
                if (iskey && arr[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === key) {
                    arr[i].className = 'found';
                    clearInterval(timer);
                    lock = true;
                }
            }
            i++;
        }, 500);
    }

    //btn事件
    function traverse(traverseIndex, rootNode) {
        var Nodelist = [],
            key = '';
        lock = false;

        switch (traverseIndex) {
            case 0:
                traverseDF(rootNode, Nodelist);
                setTimeout(setAction(Nodelist, key), 500);
                break;
            case 1:
                BFindex = 0;
                traverseBF(rootNode, Nodelist);
                setTimeout(setAction(Nodelist, key), 500);
                break;
            case 2:
                key = document.getElementsByTagName("input")[0].value;
                traverseDF(rootNode, Nodelist);
                setTimeout(setAction(Nodelist, key, true), 500);
                break;
            case 3:
                BFindex = 0;
                key = document.getElementsByTagName("input")[0].value;
                traverseBF(rootNode, Nodelist);
                setTimeout(setAction(Nodelist, key, true), 500);
                break;
        }
    }

    function init() {
        var Btns = document.getElementsByTagName("button"),
            rootNode = document.getElementById("root");

        for (var i = 0; i < Btns.length; i++) {
            (function (i) {
                Btns[i].onclick = function () {
                    if (lock) {
                        traverse(i, rootNode);
                    } else {
                        window.alert("正在遍历中。。。,不要打扰我");
                    }
                };
            })(i);
        }
    }

    init();
};
//# sourceMappingURL=task-08.js.map