var cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {  
                out += `<img src="imagen/${goods[id].img}">`;
                out +='<br>'
                out += `<a href="cart/http/${goods[id].a}" class="a-goods">Оглянути товар</a>`;
                out += `<p id="class_name"> ${goods[id].name} </p>`;
                out += '<br>'
              
                out += `<button data-id="${id}" class="minus-goods">Зменьшити</button>  `;
                out += ` ${cart[id]}  `;
                out += `<button data-id="${id}" class="plus-goods">Додати</button>  `; 
                out += `<button data-id="${id}" class="del-goods">Видалити</button>`;
                out += `<p>Цiна: ${cart[id]*goods[id].cost }</p>`;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "php/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
               function(data){
                console.log(data);
                    // if (data==1) {
                    //     alert('Заказ отправлен');
                    // }
                    // else {
                    //     alert('Повторите заказ');
                    // }
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}


$(document).ready(function () {
   loadCart();
   $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});