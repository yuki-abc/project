var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
   
  });
  //鼠标覆盖停止自动切换
    swiper.el.onmouseover = function () {
      swiper.autoplay.stop();
    },
    //鼠标离开开始自动切换
    swiper.el.onmouseout = function () {
      swiper.autoplay.start();
    }