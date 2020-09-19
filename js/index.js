//请求整个index页面的数据
getData()

function getData() {
    //创建ajax
    let xhr = new XMLHttpRequest();
    //链接请求地址
    xhr.open('GET', '/vivo?');

    //发送请求
    xhr.send();
    //获取数据
    xhr.onload = function () {
        let result = JSON.parse(xhr.responseText);
        // console.log(result.data.navigateVos);

        renderBanner(result.data.navigateVos)

        renderContent(result.data.homeMetaVO.homeFloorList[1].elementList)

        renderBest(result.data.homeMetaVO.homeFloorList[2].elementList)

        renderAcc(result.data.homeMetaVO.homeFloorList[3].elementList)
    }
}

//请求抢购部分的页面的数据
getData1()

function getData1() {
    //创建ajax
    let xhr = new XMLHttpRequest();
    //链接请求地址
    xhr.open('GET', '/vivo1?t=' + new Date().getTime());
    //发送请求
    xhr.send();
    //获取数据
    xhr.onload = function () {
        let res = JSON.parse(xhr.responseText);
        renderPur(res.data.actSkuInfoVos)
    }
}


//搜索框区域
$('#search').click(function () {
    $('.nav_center ul li').fadeOut(2000)
    $('#search').hide()
    $('.nav_right').show(1000);
    $('#nav').css({
        background: 'white'
    })
    $('.list1').show(2000)
})

$('#delete').click(function () {
    $('.nav_center ul li').fadeIn(2000)
    $('#search').show()
    $('.nav_right').hide(1000);
    $('#nav').css({
        background: '#f7f7f7te'
    })
    $('.list1').hide(2000)
})



// banner区域
let banner_list=document.querySelector('.banner_list')
let banner_foot=document.querySelector('.banner_foot')
function renderBanner(res) {
    let result=res[0].subCategories
    result.forEach(function(item){
        banner_list.innerHTML+=`
           <li>
               <a href="${item.link}"><span>${item.name}</span><img src="${item.imgUrl}" alt=""></a>
               <div class="shadow1"></div>
        </li>`
    })
    let data=res[0].commoditySpus;
    data.forEach(function(item){
        // console.log(item);
        banner_foot.innerHTML+=`
        <li><a href="${item.link}"><img src="${item.imgUrl}" alt="">${item.name}</a></li>`
    })
}

$('.phone').hover(function(){
      $('.banner_content').show()
},function(){
    $('.banner_content').hide()
})




//抢购区域
$('.prev').click(function () {
    $('.pur_bottom ul').animate({
        left: -1200
    }, 500)
})
$('.next').click(function () {
    $('.pur_bottom ul').animate({
        left: 0
    }, 500)
})


let pur_banner = document.querySelector('.pur_banner')

//渲染抢购页面
function renderPur(res) {
    res.forEach(function (item) {
        console.log(item);
        pur_banner.innerHTML += ` <li><a href="${item.redirectUrl}">
     <div class="link_top">
         <img src="${item.skuImg}"
             alt="">
     </div>
     <h3>${item.skuName}</h3>
     <p>直降${item.marketPrice-item.actPrice}元</p>
     <span class="dis">￥${item.actPrice}</span><span class="origin">￥${item.marketPrice}</span>
 </a></li>`
    })

  $('.pur_banner li').hover(function(){
    $(this).finish().animate({
        top: -1
    }, 1000).addClass('shadow')
  },function(){
    $(this).finish().animate({
        top: 1
    }, 1000).removeClass('shadow')
  })
}



// 专区部分
$('.area div').hover(function () {
    // console.log($(this));
    $(this).finish().animate({
        top: -1
    }, 1000).addClass('shadow')
}, function () {
    $(this).finish().animate({
        top: 1
    }, 1000).removeClass('shadow')
})


// 倒计时部分
var date1 = new Date('2020-09-20 16:39:00');
var date2 = new Date();
var box = document.getElementById('box');
var btn = document.getElementById('btn');
box.innerHTML = dateCha(date1, date2, function () {
    // 当两个时间差为0 的时候 那么抢购
    btn.disabled = false;
});
var timer = setInterval(function () {
    date2 = new Date();
    box.innerHTML = dateCha(date1, date2, function () {
        // 当两个时间差为0 的时候 那么抢购
        console.log('倒计时结束');
        btn.disabled = false;
        clearInterval(timer);
    });
}, 1000)

function dateCha(d1, d2, callback) {
    // 当调用 dateCha() 没有回调函数
    // callback = undefined
    var time1 = d1.getTime();
    var time2 = d2.getTime();
    if (time2 >= time1) {
        callback && callback();
        time2 = time1
    }
    var cha = Math.abs(time2 - time1);
    var day = parseInt(cha / 1000 / 60 / 60 / 24);
    day = day >= 10 ? day : '0' + day;
    var hours = parseInt(cha / 1000 / 60 / 60 - 24 * day);
    hours = hours >= 10 ? hours : '0' + hours;
    var min = parseInt(cha / 1000 / 60 - 60 * hours - 24 * day * 60);
    min = min >= 10 ? min : '0' + min;
    var sec = Math.floor(cha / 1000 - min * 60 - hours * 60 * 60 - day * 24 * 60 * 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return `<p>距离活动结束</p><i>${hours}</i><span>时</span><i>${min}</i><span>分</span><i>${sec}</i><span>秒</span>`;
}
let id;
// 热卖区域
let ul = document.querySelector('.hotSale_con>ul')

function renderContent(res) {
    res.forEach(function (item) {
        id = item.href.split('?').splice(1, 1).join().split("=")[1]
        ul.innerHTML += `<li class="hotSale_list"><a href="./html/detail.html?id=${id}">
       <img src=${item.picSrc} alt="">
   </a>
   <h4>${item.name}</h4>
   <p>${item.spec}</p>
   <span>￥${item.salePrice}</span>
</li>`
    })
    $('.hotSale_list').hover(function () {
        // console.log($(this));
        $(this).finish().animate({
            top: -1
        }, 1000).addClass('shadow')
    }, function () {
        $(this).finish().animate({
            top: 1
        }, 1000).removeClass('shadow')
    })
}


// 精品手机
let uls = document.querySelector('.best_con')

function renderBest(res) {
    for (let i = 1; i < res.length; i++) {
        id = res[i].href.split('?').splice(1, 1).join().split("=")[1];
        uls.innerHTML += `<li class="best_list">
<a href="./html/detail.html?id=${id}">
<img src="${res[i].picSrc}" alt=""></a><br>
<h4>${res[i].name}</h4>
<p>${res[i].spec}</p>
<span>￥${res[i].salePrice}</span>
</li>`
    }

    $('.index img').hover(function () {
        // console.log($(this));
        $(this).finish().animate({
            top: -1
        }, 1000).addClass('shadow')
    }, function () {
        $(this).finish().animate({
            top: 1
        }, 1000).removeClass('shadow')
    })

    $('.best_list').hover(function () {
        // console.log($(this));
        $(this).finish().animate({
            top: -1
        }, 1000).addClass('shadow')
    }, function () {
        $(this).finish().animate({
            top: 1
        }, 1000).removeClass('shadow')
    })
}



//精品配件
let ul1 = document.querySelector('.acc_bottom>ul')

function renderAcc(res) {
    res.forEach(function (item) {
        // console.log(item);
        ul1.innerHTML += `<li class="acc_list">
        <a href="${item.href}">
        <img src='${item.picSrc}' alt="">
    </a><br>
    <h4>${item.name}</h4>
    <p>${item.spec}</p>
    <span>￥${item.salePrice}</span>
 </li>`
    })

    $('.acc_list').hover(function () {
        // console.log($(this));
        $(this).finish().animate({
            top: -1
        }, 1000).addClass('shadow')
    }, function () {
        $(this).finish().animate({
            top: 1
        }, 1000).removeClass('shadow')
    })
}