 get()

 function get() {
     //创建ajax
     let xhr = new XMLHttpRequest();
     //链接请求地址
     xhr.open('GET', '/vivo?');

     //发送请求
     xhr.send();
     //获取数据
     xhr.onload = function () {
         let result = JSON.parse(xhr.responseText);
         renderAcc(result.data.homeMetaVO.homeFloorList[3].elementList)
     }
 }
 //精品配件
 let ul1 = document.querySelector('.acc_bottom>ul')

 function renderAcc(res) {
     res.forEach(function (item) {
         // id=item.href.split('?').splice(1,1).join().split("=")[1]
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

 // 在购物车页面判断是否有登录，如果有登录就显示购物车的数据
 let login = getCookie('login');

 if (!login) {
     // 没有登录就跳到登录页面
     window.location.href = '../html/login.html?pathname=' + window.location.href;
 }
 // 显示购物车中的数据
 let box = document.querySelector('#car');

 getData(login);
 async function getData(login) {
     let res = await pAjax({
         url: '../php/getCarData.php',
         data: {
             phone: login
         }
     });
     // console.log(res);
     // 把获取出来的数据 存储在本地存储中
     localStorage.setItem('carData', JSON.stringify(res));
     renderHtml(res)
 }

 //数据渲染

 function renderHtml(data) {
     let str;
     // console.log(data);
     if (!data[0]) {
         // 如果数组中第一项都没有，说明数组没有数据
         str = `<div class="no_result common">
        <img src="https://shopstatic.vivo.com.cn/vivoshop/spaweb/static/img/no-result.50507a32.png" alt="">
        <p>哎呀，购物车为空！</p>
        <div class="no_result_btn">
            <button><a href="../index.html">去选购逛逛</a></button>
            <button><a href="javascript:;">我的收藏</a></button>
        </div>
   </div>`;
         box.innerHTML = str;
         console.log(str);
         return;
     }

     str = `<div class="car_head">
     <input type="checkbox" name="" class="checkAll">
     <p>全选</p>
     <span style="width: 250px;text-align: center;">商品名称</span>
     <span style="width: 170px;text-align: center;">价格(元)</span>
     <span>数量</span>
     <span>优惠</span>
     <span>赠送积分</span>
     <span>小计(元)</span>
     <span>操作</span>
 </div>`;
     data.forEach(function (item) {
         str += `<div id="car_details">
         <div class="car_list" data_id=${item.goods_id}>
            <input type="checkbox" name="" class="checkSingle">
            <div class="car_img">
                <img src="${item.goods_pic}" alt="">
            </div>
            <p>
                <a href="">${item.goods_name}</a><br>
                <span>颜色:液氧</span>
            </p>
            <span class="price">${item.discount_price}.00</span>
            <div class="number" data_id=${item.goods_id}>
                <label for="" id="reduce">-</label>
                <input type="text" name="" class="amount" value="${item.goods_num}">
                <label for="" id="add">+</label>
            </div>
            <span class="discount">200.00</span>
            <span class="points">${item.discount_price}</span>
            <span class="total">${item.goods_num*item.discount_price}.00</span>
            <span class="delete"><a href="">删除</a></span>
        </div>
        </div>`
     });
     str += `<div class="settlement">
     <input type="checkbox" name="" class="checkAll" 
     <input type="checkbox" name="">
     <p>全选</p>
     <div class="choose">
         <p>
             已选商品
             <i class="num1" style="color: red;">0</i> 件,合计（不含运费）：<span>¥</span>
             <span class="summary">0</span>
         </p>
     </div>         
     <button class="settlement1">去结算</button>       
 </div>`
     box.innerHTML = str;


     //  全选
     $('.checkAll').change(function () {
         //    console.log($(this).prop('checked'));
         $(".checkSingle,.checkAll").prop('checked', $(this).prop('checked'))
         let carData = JSON.parse(localStorage.getItem('carData'));
         if ($(this).prop('checked') == true) {
             getSum()
         } else {
             $('.num1').text(0)
             $('.summary').text(0)
         }

     })

     //  // 单选
     $('.checkSingle').change(function () {
         if ($(".checkSingle:checked").length == $('.checkSingle').length) {
             $('.checkAll').prop('checked', true)
         } else {
             $('.checkAll').prop('checked', false)
         }
         $('.checkSingle').each(function (i, ele) {
         if (ele.checked == true) {
                getSum()
            }
        })

     })
    



     //增加数量
     let n, price;
     $('.number').on('click', '#add', function (e) {
         e.stopPropagation()
         n = $(this).siblings('.amount').val()
         n++;
         $(this).siblings('.amount').val(n)
         goods_num = $(this).siblings('.amount').val()
         goods_id = $(this).parent().attr('data_id')
         price = $(this).parents('.car_list').find('.price').text()
         $(this).parents('.car_list').find('.total').text(n * price)
         addQty(login, goods_id, goods_num)
         if ($(this).parents('.car_list').find('.checkSingle').prop('checked') == true) {
             getSum()
         }

     })

     //减少数量
     $('.number').on('click', '#reduce', function (e) {
         e.stopPropagation()
         n = $(this).siblings('.amount').val()
         n--;
         if (n <= 1) {
             n = 1
         }
         $(this).siblings('.amount').val(n)
         goods_num = $(this).siblings('.amount').val()
         goods_id = $(this).parent().attr('data_id')
         price = $(this).parents('.car_list').find('.price').text()
         $(this).parents('.car_list').find('.total').text(n * price)
         addQty(login, goods_id, goods_num)
         if ($(this).parents('.car_list').find('.checkSingle').prop('checked') == true) {
             getSum()
         }
     })

     //  删除数据
     $(".car_list").on('click', '.delete', function (e) {
         e.stopPropagation()
         // $(this).parent().remove()
         goods_id = $(this).parent().attr('data_id')
         removeData(login, goods_id);
         let carData = JSON.parse(localStorage.getItem('carData'));
         renderHtml(carData);
         getSum()
     })

     // 求和
     function getSum() {
         let count = 0;
         let totalPrice = 0;
         $('.amount').each(function (i, item) {
             count += item.value * 1
         })
         $('.total').each(function (i, item) {
             totalPrice += item.innerHTML * 1
         })
         $('.num1').text(count);
         $('.summary').text(totalPrice)
     }
       // 结算
       $('.settlement1').click(function () {
          let zongjia=0;
          $('.total').each(function (i, item) {
            zongjia += item.innerHTML * 1
        })

        alert(`你已经结算了${zongjia}元`)
    })

     //  更新数据（增/减）
     async function addQty(phone, goods_id, goods_num) {
         let res = await pAjax({
             url: '../php/updCarData.php',
             data: {
                 phone,
                 goods_id,
                 goods_num
             }
         });
         console.log(res);
         let carData = JSON.parse(localStorage.getItem('carData'));

         localStorage.setItem('carData', JSON.stringify(carData));
     }

     //删除数据
     async function removeData(phone, goods_id) {
         let result = await pAjax({
             url: '../php/removeCarData.php',
             data: {
                 phone,
                 goods_id
             }
         })
         console.log(result);

         let carData = JSON.parse(localStorage.getItem('carData'));
         renderHtml(carData);
         localStorage.setItem('carData', JSON.stringify(carData));

     }








 }