'use strict';

/**
 * Created by shi on 2017/4/12.
 */

window.onload = function () {

    //节点的选择
    function nodeSelect(node, nodeArr) {

        if (nodeArr.length > 0) {
            nodeArr.forEach(function (val) {
                val.className = 'default';
            });
        }

        if (node && node.className !== 'active') {
            node.className = 'active';
        } else {
            node.className = 'default';
        }
    }

    //节点的删除
    function nodeDel(node) {
        if (node && node.className === 'active') {
            node.parentElement.removeChild(node);
        }
    }

    //节点的添加
    function nodeAdd(text, node) {
        if (node) {
            var newNode = document.createElement('div');
            newNode.innerText = text;
            node.appendChild(newNode);
        }
    }

    function init() {
        var root = document.getElementById('root'),
            nodeArr = root.getElementsByTagName('div'),


        //选择的元素节点
        node = null,
            btnAdd = document.getElementsByClassName('btn-add')[0],
            btnDel = document.getElementsByClassName('btn-del')[0];

        nodeArr = Array.from(nodeArr);
        console.log(nodeArr);

        root.addEventListener('click', function (e) {
            nodeArr = root.getElementsByTagName('div');
            nodeArr = Array.from(nodeArr);
            // console.log(e);
            node = e.target;
            nodeSelect(e.target, nodeArr);
        });

        btnDel.onclick = function () {
            if (!node) {
                alert("请选择要删除的元素节点");
            } else {
                nodeDel(node);
            }
        };

        btnAdd.onclick = function () {
            var text = document.getElementsByTagName('input')[0].value;
            if (!node) {
                alert("请选择要删除的元素节点");
            } else {
                nodeAdd(text, node);
            }
        };
    }

    init();
};
//# sourceMappingURL=task-09.js.map
//# sourceMappingURL=task-09.js.map