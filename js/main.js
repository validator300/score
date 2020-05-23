var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    // вывод на страницу
    console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<a href="cart/http/${data[key].a}"><img src="imagen/${data[key].img}"></a>`;
        out +=`<div class="cost">${data[key].cost} грн</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">В корзину</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}
function addToCart(){
    //добавляем товар
    var id = $(this).attr('data-id');
    if (cart[id]==undefined){
        cart[id] = 1;
    }
    else{
        cart[id]++;
    }

    saveCart();
}
function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));//корзину в строку
}
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

$(document).ready(function () {
    init();
    loadCart();
});
