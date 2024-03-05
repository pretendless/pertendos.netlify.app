/**
 * This file is just for the demonstration of the theme and switching styles instantly.
 * Please remove this file and any references in the markup in production.
*/

(function($){

    "use strict";

    var $page    = $('html').css('visibility', 'hidden'),
    theme    = $page.data('theme'),
    $linkcss = $('#theme-css');


    if (location.search && location.search.match(/^\?style=/)) {

        sessionStorage[theme+'-style'] = location.search.replace('?style=', '');
    }

    var style = sessionStorage[theme+'-style'] || 'default';

    if (style != 'default') {
        $linkcss.after('<link rel="stylesheet" href="css/theme.'+style+'.css">');
    }


    $(function(){

        /*
        * Auto relate active links to views
        */

        // active links
        $('.uk-navbar .uk-active > a, .uk-offcanvas .uk-active > a, footer .uk-active > a').each(function(){
            $(this).parents('li').removeClass('uk-active');
        });


        if(location.pathname.match(/\.html$/)) {

            var url = location.pathname.split('/').slice(-1)[0];


            $('a[href="'+url+'"]').each(function(){
                $(this).parents('li').addClass('uk-active');
            });
        }

        if (style != 'default') {

            $(window).on('load', function(){

                var img = document.createElement('img');

                img.onerror = function(){
                    setTimeout(function(){
                        $page.css('visibility', '');
                    }, 100);
                };

                img.src = 'css/theme.'+style+'.css';

                $('[data-demo-style]').each(function(){

                    var ele = $(this), src;

                    if (ele.is('img') && !ele.attr('src').match(/placehold\.it/)) {

                        var img = ele;

                        src = img.attr('src').split('.');

                        src.push(src[src.length-1]);

                        src[src.length-2] = style;

                        img.attr('src', src.join('.'));

                        if (img.parent()[0].style.backgroundImage) {
                            img.parent()[0].style.backgroundImage = 'url('+src.join('.')+')';
                        }

                        // slideshow images
                        if (img.parents('.uk-slideshow') && img.prev().hasClass('uk-cover-background')) {
                            img.prev()[0].style.backgroundImage = 'url('+src.join('.')+')';
                        }

                    } else if(ele.css('background-image')) {

                        var bg  = ele.css('background-image').match(/url\((.*)\)/);

                        if (bg.match(/placehold\.it/)) {
                            return;
                        }

                        src = bg[1].split('.');

                        src.push(src[src.length-1]);

                        src[src.length-2] = style;

                        ele[0].style.backgroundImage = 'url('+src.join('.')+')';
                    }

                });

                $page.css('visibility', '');

                setTimeout(function(){
                    $.UIkit.$win.trigger('resize');
                }, 400);
            });

        } else {
            $page.css('visibility', '');
        }

    });

})(jQuery);
