;(function(){
    

// 首先实现基本的选择器
// $(便签选择器)
function jQuery(selector){
    // 为了在使用的时候更简洁一点，在new的基础上再包一层
    return new Init(selector)
    // return document.querySelectorAll(selector)
}

// 需要把所有方法都放在原型对象上
function Init(selector){
    // jq对象是一个伪数组，使用数字作为属性名的对象
    let dom = document.querySelectorAll(selector);
    console.log(this);
    for( let i=0;i<dom.length;i++){
        this[i] = dom[i]
    }
        // 伪数组还需一个数组长度-length
        this.length = dom.length
}


// 很多地方都会用遍历伪数组，所以在封装遍历伪数组的方法
Init.prototype.each=function(callback){
    console.log(this)
    for(let i=0 ; i<Init.length;i++){
        callback(i,this[i]);
    }
}
// console.log(Init.prototype)

console.dir(Init.prototype)  
// 是原型对象的方法
Init.prototype.css = function(property,value){
// 如果没有传第二个参数value的值，那么就是获取property的值
 if(value ==undefined){
     return window.getComputedStyle(this[0])[property];
 }else{
    //  有一个数组，里面存储了所有的需要带单位的属性名
    // 简单处理带单位的数组
    let pxArr = ['width','height','top','left','font'];
    // 实现设置，把每个伪数组中的每一个都遍历，设置它的CSS样式属性
    // 元素对象.style.css属性名=新的值
    for( let i=0;i<this.length;i++){
        // 要把带单位和不带单位的属性区分开
        if(pxArr.indexOf(property) !==-1){
            // 然后判断是否带了px
            if(value.tostring().indexOf('px')===-1){
                this[i].style[property]=value+'px';
            }else{
                this[i].style[property]= value;
            }
        }else{
            this[i].style[property]= value;
        } 
    }
    // 最后返回this，用于实现链式编程
    return this;
 }
}

// 封装增加类名的方法
/*
    实现addclass功能
    jq里面的addClass
    jq对象.addClass(类名)

*/
Init.prototype.addClass = function(className){
// 循环遍历伪数组，把里面的每个元素都实现类名增加
for(let i = 0 ; i<this.length;i++){
    this[i].classList.add(className);
}
return this;
}

// 封装移除类名的方法

Init.prototype.removeClass = function(className){
    this.each(function(i,e){
        e.classList.remove(className);
    })
    // 实现链式编程
    return this;
}

// 封装切换类名
Init.prototype.toggleClass = function(className){
    this.each(function(i,e){
        e.classList.toggle(className)
    })
    // 实现链式编程
    return this;
}






window.$=window.jQuery=jQuery
})();



let one = $('.one')
console.log(one)
one.addClass('two')