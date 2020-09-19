// 任意多数最大值
function max() {
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return max
}
let ad=document.querySelector

// ----------------------------------------------------------------------------



// 求任意多数的最小值，把最小值返回给函数
function min() {
    var min = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return min
}


// ----------------------------------------------------------------------------



// 求任意多数之和，并且把和 返回给函数
var sum = 0;

function sum() {
    for (i = 0; i < arguments.length; i++) {
        sum += i;
    }
    return sum;
}


// ----------------------------------------------------------------------------


// 求任意两个数之间的随机数
function getRandom(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1)) + m;
    } else {
        return parseInt(Math.random() * (m - n + 1)) + n;
    }
}
//数组的最大值
function maxNumber(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return max
}


// ----------------------------------------------------------------------------


//数组的最小值
function minNumber(arr) {
    var min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
    }

    return min
}

// ----------------------------------------------------------------------------


// 获取一个随机颜色
function getRandomColor() {
    // var str = '0123456789abcdef';
    // var res = '#'
    // for (var i = 0; i < 6; i++) {
    //     // str[索引] 这个索引是随机，在0-15范围之间随机
    //     res += str[parseInt(Math.random() * 16)]
    // }
    var r1 = parseInt(Math.random() * 256);
    var r2 = parseInt(Math.random() * 256);
    var r3 = parseInt(Math.random() * 256);
    var res = `rgb(${r1},${r2},${r3})`
    return res;
}


// ----------------------------------------------------------------------------


// 时间格式化 函数
/* 
    需要传两个参数
    参数1：时间对象
    参数2：连接时间的符号
*/
function date(date, n) {
    // 先获取时间的 年月日 时分秒
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    var hours = date.getHours();
    hours = hours >= 10 ? hours : '0' + hours;
    var min = date.getMinutes();
    min = min >= 10 ? min : '0' + min;
    var sec = date.getSeconds();
    sec = sec >= 10 ? sec : '0' + sec;
    // console.log(year, month, day, hours, min, sec);
    // 把这个数字拼接成规定格式字符串
    // 把这个字符串返回
    if (n === '-') {
        return `${year}-${month}-${day} ${hours}:${min}:${sec}`
    } else if (n === '/') {
        return `${year}/${month}/${day} ${hours}:${min}:${sec}`
    } else if (n === '.') {
        return `${year}.${month}.${day} ${hours}:${min}:${sec}`
    }

}
// 调取函数： 例子：date(date,"-")

// ----------------------------------------------------------------------------


// 得到两个时间的时间差
function timeCha(d1, d2) {
    var time1 = date1.getTime();
    // date2到格林威治时间的时间差
    var time2 = date2.getTime();

    // 求time1 到time2的时间差，用两个时间差相减
    // 求得到是 时间差的毫秒数
    var cha = Math.abs(time2 - time1);

    // 求 相差的天 时 分 秒
    // 1000毫秒 = 1秒
    // 60秒 = 1分
    // 60分 = 1小时
    // 24小时 = 1天
    // 求得相差天数
    var day = parseInt(cha / 1000 / 60 / 60 / 24);
    day = day >= 10 ? day : '0' + day;
    // 求相差小时
    var hours = parseInt(cha / 1000 / 60 / 60 - 24 * day);
    hours = hours >= 10 ? hours : '0' + hours;
    // 求分
    var min = parseInt(cha / 1000 / 60 - 60 * hours - 24 * day * 60)
    min = min >= 10 ? min : '0' + min;
    // 求秒
    var sec = parseInt(cha / 1000 - min * 60 - hours * 60 * 60 - day * 24 * 60 * 60)
    sec = sec >= 10 ? sec : '0' + sec;
    return `两个时间相差${day}天${hours}个小时${min}分钟${sec}秒`;
}

// ----------------------------------------------------------------------------

// 倒计时的使用
function daojishi(d1, d2, callback) {
    // 当调用 dateCha() 没有回调函数
    // callback = undefined
    var time1 = d1.getTime();
    var time2 = d2.getTime();
    // 如果时间越往后面，到格林威治时间的毫秒数就越大
    // 如果 time2 的值比time1的值大，那么说明 d2的时间大于 d1的时间
    if (time2 >= time1) {
        //   短路运算符  &&  ||
        //   &&  符号两边的值的为真的时候才会为true
        //  callback  存在 那么才会执行 调用callback()
        // callback 为false 不会执行 调用
        callback && callback();
        // 此时倒计时停留为0
        time2 = time1

    }
    var cha = Math.abs(time2 - time1);
    var day = parseInt(cha / 1000 / 60 / 60 / 24);
    var hours = parseInt(cha / 1000 / 60 / 60 - 24 * day);
    var min = parseInt(cha / 1000 / 60 - 60 * hours - 24 * day * 60);
    0.4
    var sec = Math.floor(cha / 1000 - min * 60 - hours * 60 * 60 - day * 24 * 60 * 60);

    return (`倒计时${day}天${hours}小时${min}分钟${sec}秒`);

}
// 调用方法：给date1和date2.再用计时器调用函数
//例如：
//  var date1 = new Date('2020-08-07 16:39:00');
// var date2 = new Date();
//（需要加入的版块）.innerHTML = daojishi(date1, date2, function () {
// 当两个时间差为0 的时候 那么抢购
//     btn（抢购键）.disabled = false;
// });



// ----------------------------------------------------------------------------


// 获取样式的属性和属性值的方法
// 有两个参数
// 参数1：元素
// 参数2：csss属性
function getStyle(ele, attr) {
    return style = window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
}


// ----------------------------------------------------------------------------


// 封装一个事件监听的函数（兼容）
// 参数：事件源，事件类型，回调函数
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback);
    } else {
        ele.attachEvent('on' + type, callback)
    }
}

// ----------------------------------------------------------------------------
// 把url参数转化为对象
/*
           >规则：
               > 1. 指定参数名称，返回该参数的值 或者 空字符串
               >2. 不指定参数名称，返回全部的参数对象 或者 {}
               >3. 如果存在多个同名参数，则返回数组
        */
function fun(url, attr) {
    // var index = url.indexOf('?');
    // var res = url.substring(index + 1);
    // console.log(res);
    var obj = {};
    var res = url.replace(/\??([a-z]+)=([0-9a-z]+)&?/gi, function (match, p1, p2) {
        // match 为正则匹配的字符串
        // p1 为正则中第一个圆括号里面的值   
        // p3 为正则第二个圆括号里面的值
        if (p1 in obj) {
            // 把参数值用数组显示
            var arr = [p2]; //['ww']
            obj[p1] = arr.concat(obj[p1])
        } else {
            obj[p1] = p2;
        }
    });
    // 如果第二个参数存在 就返回 这个参数的参数值
    // 如果{} 里面只有一句话的时候，{} 可以省略不写
    if (attr) return obj[attr]

    return obj;
}

// 返回值：100
// 调用
// var res = fun('https://www.baidu.com/?id=100&name=aa', 'name')
// var res = fun('https://www.baidu.com/?id=100&name=aa&name=ww&name=qq') //{id:100,name:['aa','ww']}


// ----------------------------------------------------------------------------

// 动画函数
function move(ele, obj, callback) {
    let speed;
    let index = 0; //记录定时器的个数
    // 循环对象创建定时器
    for (let attr in obj) {
        // 透明度的变化的时候 0-1
        // console.log(attr);
        index++;
        // 清除上一次的定时器
        clearInterval(ele[attr])
        // 属性：attr
        // 属性值：obj[key]
        // box['width'] 给box这个dom元素添加一个 width属性(dom属性)
        // dom 对象，以地址形式存储的，当上一次更改dom对象中的值，那么这次获取这个对象的时候是能拿到被更改之后的dom对象
        ele[attr] = setInterval(() => {
            // 把透明度的取值 改边为0-100的取值
            // 0-1=====》0-100
            let style;
            if (attr == 'opacity') {
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }

            speed = (obj[attr] - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            
            if (attr === 'opacity') {
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            if (style == obj[attr]) {
                clearInterval(ele[attr]);
                // 有多少个属性参数动画就会执行多少次
                // 执行一次怎么？
                // 没清除一次定时器，那么定时器的个数 -1
                index--;
                // 当定时器的个数 为0 的时候，说明所有动画执行完毕
                if (index === 0) {
                    callback && callback();
                }
            }
        }, 30)
    }
}