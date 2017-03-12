/**
 * Created by shi on 2017/3/12.
 */
'use strict';

window.onload = function () {
    var par = document.querySelector('.queue'),
        newArr = [];

    //remove
    function remove(par, obj) {
        par.removeChild(obj);
        alert(obj.innerHTML);
    }

    //get textarea
    function getTextarea(str) {

        if (typeof str !== 'string' || !str) {
            return [];
        }

        var arr = [],
            re = /\W+/;
        arr = str.split(re);

        return arr;
    }

    //apply list
    function applyList(arr, obj) {
        var child = null;
        obj.innerHTML = '';

        arr.forEach(function (val) {
            if (val) {
                child = document.createElement('li');
                child.innerHTML = val;
                obj.appendChild(child);
            }
        });
    }

    //left insert
    document.querySelector('.leftInsert').onclick = function () {
        var value = document.querySelector('#number').value,
            child = document.createElement('li'),
            firstChild = par.firstElementChild;

        newArr = getTextarea(value);

        par.innerHTML = '';

        if (newArr) {
            newArr.forEach(function (val, index, arr) {
                if (val) {
                    child = document.createElement('li');
                    firstChild = par.firstElementChild;
                    child.innerHTML = arr[arr.length - index - 1];
                    if (!firstChild) {
                        par.appendChild(child);
                    } else {
                        par.insertBefore(child, firstChild);
                    }
                }
            });
            document.querySelector('#number').value = '';
        } else {
            alert('内容不能为空');
        }
    };

    //right insert
    document.querySelector('.rightInsert').onclick = function () {
        var value = document.querySelector('#number').value,
            child = document.createElement('li'),
            firstChild = par.firstElementChild;

        newArr = getTextarea(value);

        par.innerHTML = '';

        if (newArr) {
            newArr.forEach(function (val, index, arr) {
                if (val) {
                    child = document.createElement('li');
                    firstChild = par.firstElementChild;
                    child.innerHTML = val;
                    par.appendChild(child);
                }
            });
            document.querySelector('#number').value = '';
        } else {
            alert('内容不能为空');
        }
    };

    //left remove
    document.querySelector('.leftRemove').onclick = function () {
        var leftChild = par.firstElementChild;
        console.log(leftChild);
        if (leftChild) {
            remove(par, leftChild);
        } else {
            alert('别点了，删除不了啦');
        }
    };

    //right remove
    document.querySelector('.rightRemove').onclick = function () {
        var rightChild = par.lastElementChild;

        if (rightChild) {
            remove(par, rightChild);
        } else {
            alert('别点了，删除不了啦');
        }
    };

    //select remove
    par.addEventListener('click', function (e) {
        console.log(e);
        if (e.target.nodeName == 'LI') {
            remove(par, e.target);
        }
    });

    //search
    document.querySelector('.btn-search').onclick = function () {
        var key = document.querySelector('.search-key').value,
            arr = newArr,
            value = '';

        if (key && arr) {
            arr.forEach(function (val, index, arr) {
                value = val.replace(key, '<b style="color: #000">' + key + '</b>');
                if (value) {
                    arr[index] = value;
                }
            });
            applyList(arr, par);
        } else {
            if (!key) {
                alert('搜索词不能为空');
            }
            if (!arr) {
                alert('列表不能为空');
            }
        }
    };
};
//# sourceMappingURL=task-06.js.map