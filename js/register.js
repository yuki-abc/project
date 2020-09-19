let tel = document.querySelector('#tel')
let valid = document.querySelector('.valid')
let empty = document.querySelector('.empty')
let check = document.querySelector('.check')
let checkbox = document.querySelector('#checkbox')
let next = document.querySelector('.next')


window.onclick = function () {
    let str = tel.value
    phoneTest(str)
    setCookie('phone',tel.value)
}

//手机号码验证
function phoneTest(str) {
    if (str) {
        empty.style.display = 'none'
        var reg2 = /^1[35789]\d{9}$/
        if (reg2.test(str) === false) {
            valid.style.display = 'block'
        } else if (reg2.test(str) === true) {
            valid.style.display = 'none'
        }
        return reg2.test(str)
    } else {
        empty.style.display = 'block'
    }
}

//勾选协议
checkbox.onclick = function (e) {
    var e = window.event || events;
    e.stopPropagation()
    console.log(checkbox.checked);
    if(checkbox.checked===true){
        check.style.display='none'
  }else{
        check.style.display='block'
  }
}

if(phoneTest() == true && checkbox.checked=== true){
    next.disabled = false
}

window.onclick=function(){
    
}



