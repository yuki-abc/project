$('.num2').click(function () {
    $('.num2').text(getRandom(1000, 9999))
})

let tel = document.querySelector('#tel')
let txt = document.querySelector('.txt')
let num2 = document.querySelector('.num2')
let phone_error = document.querySelector('.phone_error')
let login = document.querySelector('.login')
let autoLogin=document.querySelector('.autoLogin')
// console.log(num2);
window.onclick = function () {
    let str = tel.value
    let number = txt.value
    function phoneTest() {
        if (str) {
            phone_error.style.display = 'none'
            var reg2 = /^1[35789]\d{9}$/
            return reg2.test(str)
        } else {
            phone_error.style.display = 'block'
        }
    }

    if (phoneTest() === true && number == num2.innerHTML) {
        login.disabled = false;
        window.location.href = '../index.html'
        setCookie('login', tel.value)
    }
   
    if(phoneTest() === true && number == num2.innerHTML&&autoLogin.checked==true){
        login.disabled = false;
        window.location.href = '../index.html'
        setCookie('login', tel.value, 7*24*60*60)
    }
    
}