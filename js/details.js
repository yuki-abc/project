//搜索框区域
$('#search').click(function () {
    $('.nav_center ul li').fadeOut(2000)
    $('#search').hide()
    $('.nav_right').show(1000);
    $('#nav').css({
        background: 'white'
    })
    $('.list').show(2000)
})

$('#delete').click(function () {
    $('.nav_center ul li').fadeIn(2000)
    $('#search').show()
    $('.nav_right').hide(1000);
    $('#nav').css({
        background: '#f7f7f7te'
    })
    $('.list').hide(2000)
})


//获取列表页传过来的id
let reg = /id=(\d+)/;
let goods_id;
goods_id = reg.exec(window.location.search)[1];
// console.log(goods_id);

//获取json数据
let xhr = new XMLHttpRequest();
xhr.open('get', '../data/data.json');
xhr.send();
xhr.onload = function () {
    let res = JSON.parse(xhr.responseText);
    // console.log(res.list);
    let result = res.list.filter(function (item) {
        return goods_id == item.id
    })[0]
    // console.log(result.detail);
    //调用页面左边部分
    contentL(result.imageInfos);
    renderR(result);
    renderContent(result.detail)
}
let conL = document.querySelector('.content_left')

//渲染页面左边部分
function contentL(res) {
    res.forEach(function (item) {
        //    console.log(item);
        conL.innerHTML = ` <div
        class="c_left">  
        <ul class="big_img">
            <li> <img src="${item.bigPic1}" alt=""></li>        
        </ul>
        <div class="small_img">
            <img src="${item.bigPic1}" alt="">
            <img src="${item.bigPic2}" alt="">
            <img src="${item.bigPic3}" alt="">
            <img src="${item.bigPic4}" alt="">
        </div></div>`

        //当鼠标滑过小图的时候改变大图
        var img = document.querySelector('.big_img>li>img')
        var smallimg = document.querySelectorAll('.small_img>img')
        smallimg.forEach(function (item, index) {
            item.onmouseover = function () {
                img.src = `${item.src}`
            }
        })
    })

    //设置页面滚动事件，让左边固定不动，右边动
    let left = document.querySelector('.c_left')

    window.onscroll = function () {
        if (window.pageYOffset >= 180 && window.pageYOffset <= 1580) {
            left.style.position = 'fixed';
            left.style.top = 10 + 'px'
        } else if (window.pageYOffset < 180) {
            left.style.position = 'relative';
            left.style.top = 10 + 'px'
        } else if (window.pageYOffset > 1580) {
            left.style.position = 'relative';
            left.style.top = 1400 + 'px'
        }

    }
}
let conR = document.querySelector('.content_right')

//渲染主体部分
function renderR(res) {
    // console.log(res);
    conR.innerHTML = ` <div class="right_top">
            <h3>${res.skuName}</h3>
            <p>
                <span>${res.promotion}</span> ${res.brief}
            </p>          
        </div>
        <div class="right_sale">
            <div class="price">
            <span style="float: left; color: red; font-size: 40px;">￥</span>
            <p class="money">${res.disPrice}</p>
            <p>￥${res.marketPrice}</p>
            </div>
            <div class="activity">
                <span>积分</span>
                <span>购买即送3898积分</span>
            </div>
        </div>
        <div class="support">
        <span>商品支持:</span>
        <ul>
            <li>花呗分期</li>
            <li>以旧换新</li>
            <li>积分抵现</li>
        </ul>
    </div>
    <dl class="spec">
        <dt class="spec_title">版本</dt>
        <dd><ul class="item_list">
            <li>8GB+128GB</li>
            <li>8GB+256GB</li>
        </ul></dd>
    </dl>
    <dl class="spec">
        <dt class="spec_title">颜色</dt>
        <dd><ul class="item_list">
            <li><span></span> 黑镜</li>
            <li><span></span> 浅醺</li>
            <li><span></span> 液氧</li>
        </ul></dd>
    </dl>
    <dl class="suit">
        <dt>选择套餐</dt>
        <dd>官方标配</dd>
        <dd><p>TWS Neo耳机套餐</p>
        <span>￥4347</span><span>省￥50元</span></dd>
        <dd><p>无线运动耳机套餐</p>
        <span>￥4147</span><span>省￥50元</span></dd>
        <dd><p>保护壳套餐</p>
        <span>￥3937</span><span>省￥20元<span></dd>
    </dl><br>
    <dl class="phone_service">
        <dt>手机服务(可选) <a href="">详情</a></dt>
        <dd><ul>
            <li>一年碎屏宝-179元 <span>￥179</span></li>
            <li class="insurance">半年延保 ￥69</li>
            <li class="insurance">一年碎屏宝 ￥129</li>
            <li class="bao">一年盖宝-79元 <span>￥79</span></li>
            <li class="new">【爆款】换新宝-359元 <span>￥299</span><span>￥359</span>
            <span>立省￥60</span></li>
        </ul></dd>
        <p>
            <input type="checkbox"><span> 我已阅读并同意 《vivo服务条款》</span>
        </p>
    </dl>
     <dl class="number">
         <dt>数量</dt>
         <dd>
             <label for="" class="reduce">-</label>
             <input type="text" name="" id="" value="1" class="txt">
             <label for="add" class="add">+</label>
         </dd>
     </dl>

     <dl class="payment">
         <dt>支持分期付款</dt>
         <dd>
             <ul>
                <li>
                    <p>￥1166 x 3 期</p>
                    <span>免息</span>
                </li>
                <li>
                    <p>￥538 x 6 期</p>
                    <span>免息</span>
                </li>
                <li>
                    <p>￥291.5 x 12 期</p>
                    <span>免息</span>
                </li>
                <li>
                    <p>￥163.96 x 24 期</p>
                <span>手续费18.21元/期</span>
                </li>
             </ul>
         </dd>
     </dl>

     <div class="settle">
         <div class="settle_top">
         <span style="border: none;">￥</span>
            <span class="ttp">${res.disPrice}</span>
            <p class="info">已选： 5G全网通版 8GB+128GB 液氧 官方标配 1件</p>
         </div>          
         <div class="button">
             <button id="addCar">加入购物车</button>
             <button id="buy">立即购买</button>
         </div>
     </div> 
        `

    $('.content_right li').click(function () {
        $(this).css('border-color', 'red').siblings().css('border-color', '#ccc')
    })

    $('.suit dd').click(function () {
        $(this).css('border-color', 'red').siblings().css('border-color', '#ccc')
    })


    //当点击加的时候，数量递加
    $('.number .add').click(function () {
        let n = $(this).siblings('.txt').val()
        n++;
        $(this).siblings('.txt').val(n);
        let price = $(this).parents('.content_right').find('.right_sale').find('.money').text();
        $(this).parents('.content_right').find('.settle').find('.ttp').text(n * price)
    })

    //当点击减的时候，数量递减
    $('.number .reduce').click(function () {
        let n = $(this).siblings('.txt').val()
        n--;
        if (n <= 1) {
            $(this).siblings('.txt').val(1)
        } else {
            $(this).siblings('.txt').val(n)
        }
        let price = $(this).parents('.content_right').find('.right_sale').find('.money').text();
        $(this).parents('.content_right').find('.settle').find('.ttp').text(n * price)
    });

}

//渲染详情信息
let details = document.querySelector('.detail_content')

function renderContent(res) {
    details.innerHTML = `${res}`
}

conR.onclick = function (e) {
    var e = e || window.event;
    let login;
    if (e.target.id == 'addCar') {
        login = getCookie('login')
        alert('添加购物车成功')

        if (!login) {
            alert('您还没有登录，请登录之后再加入购物车！')
            window.location.href = '../html/login.html?pathname=' + window.location.href;
        }
     
        addCarData(login, goods_id);
    }else if(e.target.id == 'buy'){
        login = getCookie('login')
        // console.log(login, goods_id)
        addCarData(login, goods_id);
        window.location.href='../html/car.html'
    }
}

async function addCarData(phone, goods_id) {
    // 发送ajax请求
    let res = await pAjax({
        url: '../php/addCarData.php',
        data: {
            phone,
            goods_id
        }
    });
    // console.log(res);
}