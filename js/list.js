let page = document.querySelector('.page')
console.log(page);
let uls = document.querySelector('.contain_list ul')

let defInfo = {
    pagenum: localStorage.getItem('n') || 1,
    pagesize: 12,
    total: '',
    totalpage: ''
}

pAjax({
    url: `../php/getData.php`,
    data: {
        start: defInfo.pagenum,
        len: defInfo.pagesize
    },
}).then(function (list) {
    defInfo.total = list.total.count;
    defInfo.totalpage = Math.ceil(defInfo.total / defInfo.pagesize);
    console.log(defInfo);
    renderPage(defInfo);
    renderHtml(list.list);
    // 渲染数据。浏览器一打开时候渲染数据
})


//获取数据库数据
getData()
async function getData() {
    let list = await pAjax({
        url: `../php/getData.php`,
        data: {
            start: defInfo.pagenum,
            len: defInfo.pagesize
        }
    })
    // console.log(list.list);
    defInfo.total = list.total.count
    defInfo.totalpage = Math.ceil(list.total.count / defInfo.pagesize);
    renderHtml(list.list)
}



function renderPage(info) {
    console.log(info);
    new Pagination(page, {
        pageInfo: {
            pagenum: info.pagenum,
            pagesize: info.pagesize,
            total: info.total,
            totalpage: info.totalpage
        },
        textInfo: {
            first: '第一页',
            prev: '上一页',
            next: '下一页',
            last: '最后一页'
        },
        change(n) {
            localStorage.setItem('n', n);
            defInfo.pagenum = n;
            getData();
            scrollTo({
                top: 0
            })
        }
    })
}

// 渲染页面数据
function renderHtml(res) {
    let str = '';
    res.forEach(function (item) {
        str += ` <li>
    <a href=""><img src="${item.goods_pic}" alt=""></a>
    <h5>${item.goods_name}</h5> 
    <p>${item.brief}</p><br>
    <span>￥${item.discount_price}</span> 
  </li>`
    })
    uls.innerHTML=str;

    $('.contain_list ul li').hover(function () {
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
