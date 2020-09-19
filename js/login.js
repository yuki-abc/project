var data = [{
        place: '中国',
        num: '+86'
    },
    {
        place: '印度',
        num: '+91'
    },
    {
        place: '印度尼西亚',
        num: '+62'
    },
    {
        place: '泰国',
        num: '+66'
    },
    {
        place: '马来西亚',
        num: '+60'
    },
    {
        place: '越南',
        num: '+84'
    },
    {
        place: '菲律宾',
        num: '+63'
    },
    {
        place: '柬埔寨',
        num: '+55'
    },
]
let content = document.querySelector('.content')
let number = document.querySelector('.number')
let num2 = document.querySelector('.num2')

//点击时候显示下拉列表
$('.list').click(function (e) {
    e.stopPropagation()
    $('.content').show()
})

//点击其他地方的时候下拉列表消失
$('html').click(function () {
    $(' .content').hide()
})

//渲染数据
content.innerHTML = render();

function render() {
    return data.map((item) => {
        return ` <li><span class="quhao">${item.num}</span><span>${item.place}</span></li>`;
    }).join('');
}
let list = document.querySelectorAll('.content>li')
let quhao = document.querySelectorAll('.quhao')

content.onclick = function (e) {
    e.cancelBubble = true;
    if (e.target.className == 'quhao') {
        number.innerHTML = e.target.innerHTML
    } else {
        number.innerHTML = e.target.firstElementChild.innerHTML;
    }
    content.style.display = 'none'
}


$('.num2').click(function () {
    $('.num2').text(getRandom(100000, 1000000))
})

$('.acc').click(function (e) {
    e.returnValue = false;
})


let tel = document.querySelector('#tel');
let message = document.querySelector('#message');
let password = document.querySelector('#psd');


window.onclick = function () {
    let phone = tel.value;
    psd=password.value;
    console.log(psd);
    console.log(phone);

    message.onsubmit =async function (e) {
        e = e || window.event;
        e.returnValue = false;
        e.preventDefault();
        console.log(11);

    // 发送ajax请求判断手机号是否存在
    let res = await pAjax({
        url: '../php/login.php',
        type: 'POST',
        data: {
            phone:phone,
            password:password.value  
        }
    })
    // console.log(res);
    if(res.code==1){
        setCookie('login', tel.value,20)
        window.location.href = '../index.html'
    }

    }

  



}