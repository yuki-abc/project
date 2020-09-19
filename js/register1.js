let test=document.querySelector('.test')
let num2=document.querySelector('.num2')
let password=document.querySelector('#password')
let txt=document.querySelector('.txt')
let code=document.querySelector('.code')
let code_error=document.querySelector('.code_error')
let psd=document.querySelector('.psd')
let psd_error=document.querySelector('.psd_error')
let code1=document.querySelector('.code1')
let box=document.querySelector('#box')
let finish=document.querySelector('.finish')

num2.onclick=function(e){
    e = e || window.event;
    e.returnValue = false;
    num2.innerHTML=getRandom(1000, 9999)
}

window.onclick=function(){
    let str=password.value  
    // console.log(str);  

//密码验证
function passwordTest() {
    if (str) {
        psd.style.display = 'none';
        var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,14}$/
        if (reg.test(str) === false) {
            psd_error.style.display = 'block'
        } else if (reg.test(str) === true) {
            psd_error.style.display = 'none'
        }
        return reg.test(str)
    }else{
        psd.style.display = 'block'
    }
}



if(code1.value == num2.innerHTML && passwordTest()===true){
    finish.disabled=false;
    console.log(1);

    box.onsubmit = async function (e) {
        e = e || window.event;
        e.returnValue = false;
        e.preventDefault();
        console.log(11);

        let phone=getCookie('phone');
        console.log(phone);
        console.log(str);
        // 发送ajax请求判断手机号是否存在
        let res = await pAjax({
            url: '../php/register.php',
            type: 'POST',
            data: {
                phone:phone,
                password:password.value  
            }
        })
        console.log(res);
        if (res.code === 1) {
            // 表示注册成功,跳转到登录页面
            alert('注册成功，可以直接登录')
            window.location.href = '../html/login.html'
        } else if (res.code === 0) {
            $('.phone_error').show()
        }
    }
}
   
}


