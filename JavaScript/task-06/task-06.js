/**
 * Created by shi on 2017/3/12.
 */
'use strict';

window.onload = function () {
    var par = document.querySelector('.queue'),
        newArr = [],
        text = document.querySelector('#number');


        //remove
    function remove(par,obj) {
        par.removeChild(obj);
        alert(obj.innerHTML);
    }

    //get textarea
    function getTextarea(str) {

        if( typeof  str !== 'string' || !str){
            return [];
        }

        const re = /\W+/g;
        let arr = str.split(re).filter(item => {
            return !!item
        });

        return arr;
    }
  
    //检查输入合法性
    function check(value) {
        if(!value.trim()){
            return false
        }
        return true
    }
    
    //创建元素
    function createItem(value) {
        let child = document.createElement('li');
        child.innerHTML = value;

        return child;
    }

    // 清空元素和聚焦

    function reset (input) {
        input.value = '';
        input.focus()
    }


    //left insert
    document.querySelector('.leftInsert').onclick = function () {
        const value = text.value,
            arr = getTextarea(value);

        if(check(value)){
            arr.forEach((item,index,arr) => {
                let child = createItem(arr[arr.length - index - 1]),
                    firstChild = par.firstElementChild;
                if(firstChild){
                    par.insertBefore(child,firstChild);
                }
                else {
                    par.appendChild(child);
                }

            })
        }
        reset(text);

    }

    //right insert
    document.querySelector('.rightInsert').onclick = function () {
        let value = document.querySelector('#number').value,
            child = document.createElement('li'),
            firstChild = par.firstElementChild;

        newArr = getTextarea(value);

        par.innerHTML = '';

        if(newArr){
            newArr.forEach(function (val,index,arr) {
                if(val){
                    child = document.createElement('li');
                    firstChild = par.firstElementChild;
                    child.innerHTML = val;
                    par.appendChild(child);
                }

            })
            document.querySelector('#number').value = '';
        }else {
            alert('内容不能为空');
        }
    }

    //left remove
    document.querySelector('.leftRemove').onclick = function () {
        var leftChild = par.firstElementChild;
        console.log(leftChild)
        if(leftChild){
            remove(par,leftChild);
        }
        else {
            alert('别点了，删除不了啦');
        }

    }

    //right remove
    document.querySelector('.rightRemove').onclick = function () {
        var rightChild = par.lastElementChild;

        if(rightChild){
            remove(par,rightChild);
        }
        else {
            alert('别点了，删除不了啦');
        }
    }

    //select remove
    par.addEventListener('click',function (e) {
        console.log(e);
        if(e.target.nodeName === 'LI'){
            remove(par,e.target);
        }
    })

    //search
    document.querySelector('.btn-search').onclick = function () {
        let key = document.querySelector('.search-key').value,
            arr = newArr,
            children = Array.from(par.children);

        if(!key){
            alert('搜索词不能为空');
            return
        }

        if(!arr){
            alert('列表不能为空');
            return
        }


        if(key && arr){
            children.forEach(node => {
                const re = new RegExp(key);
                if(re.test(node.innerText)){
                    node.style.color = '#000';
                    node.style.backgroundColor = 'blue'
                }
            })
        }

    }

}
