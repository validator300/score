var main = function() { 
    $('.icon-menu').click(function() { 
        $('.menu').animate({ // метод animate
            left: '0px' //от -285 до 0px
        }, 200); //скорость движения меню в мс
        
        $('body').animate({ 
            left: '285px' 
        }, 200); 
    });
    $('.icon-close').click(function() { 
        $('.menu').animate({ 
            left: '-285px'
        }, 200); 
        
    $('body').animate({ 
            left: '0px' 
        }, 200);
    });
};

$(document).ready(main); //при загрузке , подгружает и эту функцию