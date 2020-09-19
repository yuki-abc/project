let aside = document.querySelector('.aside')
let dingbu = document.querySelector('.icon-fanhuidingbu')

window.onscroll = function () {
    if (scrollY >= 300) {
        dingbu.style.display = "block"
    } else {
        dingbu.style.display = "none"
    }
}
dingbu.onclick = function () {
    scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

if(localStorage.getItem('carData')==null){
    $('.amount').hide()
}else{
    let n=JSON.parse(localStorage.getItem('carData')).length
    $('.amount').show().text(n)
}
 

