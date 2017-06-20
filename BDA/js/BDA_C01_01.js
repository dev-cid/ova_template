function init() {
    window.triggered = false;

    window.showpg = function() {
        $('.bb-nav-next').trigger('click');
        $('body').trigger('page-changed');
    }

    $('body').on('page-changed', function() {
        /*
        if (($('#item1').css('display') == 'block')) {
        $('.bb-nav-prev').addClass('none');
        }
        else if (($('#item2').css('display') == 'block')) {
        $('.bb-nav-prev').removeClass('none');
        }
        */
    });



    $('.bdt-pop-up button').click(function() {
        var popId = $(this).data('target');
        $("#" + popId).addClass("animated animate fadeOut")
        setTimeout(function() {
                $("#" + popId).addClass("hide");
            }, 300)
            // $('.ventana').fadeOut('slow', function() {
            //     // this.id.remove();
            //     $(this).attr('id')
            // });
    });



    var Page = (function() {

        var $container = $('.ipt_contenedor_general'),
            $bookBlock = $('#bb-bookblock'),
            $items = $bookBlock.children(),
            itemsCount = $items.length,
            current = 0,
            bb = $('#bb-bookblock').bookblock({
                speed: 800,
                perspective: 2000,
                shadowSides: 0.8,
                shadowFlip: 0.4,
                onEndFlip: function(old, page, isLimit) {

                    current = page;
                    updateTOC();
                    updateNavigation(isLimit);
                    window.triggered = true;
                }
            }),
            $img = $('.imgclick'),
            $navNext = $('#bb-nav-next'),
            $navPrev = $('#bb-nav-prev').addClass('off'),
            $navFirst = $('#bb-nav-first').addClass('off'),
            $navLast = $('#bb-nav-last'),
            $menuItems = $container.find('ul.menu-toc > li'),
            $tblcontents = $('#tblcontents'),
            $closeTblContents = $('#closeTOC'),
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            supportTransitions = Modernizr.csstransitions;

        function init() {
            initEvents();
            $(document)
                .off('keydown')
                .keydown(function(e) {
                    var keyCode = e.keyCode || e.which,
                        arrow = {
                            left: 37,
                            up: 38,
                            right: 39,
                            down: 40
                        };


                    // if (bb.current == 5 || bb.current == 11 || bb.current == 17) return;
                    // if (bb.current == 6 || bb.current == 12 || bb.current == 18) return;


                    switch (keyCode) {
                        case arrow.left:
                            // if (bb.current == 7 || bb.current == 13 || bb.current == 19) return;
                            bb.prev();
                            break;
                        case arrow.right:
                            $('body').trigger('page-changed');

                            bb.next();
                            break;
                    }
                });
        }

        function initEvents() {

            // add navigation events
            $navNext.on('click touchstart', function() {
                $('body').trigger('page-changed');
                bb.next();
                return false;
            });

            $navPrev.on('click touchstart', function() {
                // if (bb.current == 7 || bb.current == 13 || bb.current == 19) return;
                bb.prev();
            });

            $navFirst.on('click touchstart', function() {
                bb.jump(1);
                return false;
            });

            $navLast.on('click touchstart', function() {
                var goToPage = $('#item' + bookmark);

                if (($(goToPage).has('iframe').length == 1)) {
                    $('.navegadorBotones').css('opacity', '0');
                    $('.ipt_ocultar').css('opacity', '0');

                    var iframe = $(goToPage).find('iframe');
                    $(iframe).attr('src', function() {
                        return $(this).data('src');
                    });
                }
                if (($(goToPage).has('button').length == 1)) {
                    $('.navegadorBotones').css('opacity', '0');
                    $('.ipt_ocultar').css('opacity', '0');

                    var intBookmark = parseInt(bookmark);

                    var NextPage = intBookmark + 1;

                    var iframe = $('#item' + NextPage).find('iframe');
                    $(iframe).attr('src', function() {
                        return $(this).data('src');
                    });
                }

                bb.jump(bookmark); //(6);
                return false;
            });

            $('.bb-nav-interactivoDos').click(function() {
                bb.next();
                return false;

            });

            $('.bb-nav-interactivoTres').click(function() {
                bb.next();
                return false;

            });

            // add swipe events
            $items.on({
                'swipeleft': function(event) {
                    if ($container.data('opened')) {
                        return false;
                    }
                    bb.next();
                    return false;
                },
                'swiperight': function(event) {
                    if ($container.data('opened')) {
                        return false;
                    }
                    bb.prev();
                    return false;
                }
            });

            // show table of contents
            $tblcontents.on('click', toggleTOC);
            $closeTblContents.on('click', toggleTOC);

            // click a menu item
            $menuItems.on('click', function() {

                var $el = $(this),
                    idx = $el.index(),
                    jump = function() {
                        bb.jump(idx + 1);
                    };

                current !== idx ? closeTOC(jump) : closeTOC();

                return false;

            });

            $img.on('click', function() {
                var $el = $(this),
                    idx = $el.attr('page'),
                    jump = function() {
                        bb.jump(idx + 1);
                    };

                current !== idx ? closeTOC(jump) : closeTOC();

                return false;
            });

        }

        function updateTOC() {
            $menuItems.removeClass('menu-toc-current').eq(current).addClass('menu-toc-current');
        }

        function updateNavigation(isLastPage) {

            if (current === 0) {
                $navNext.removeClass('off');
                $navPrev.addClass('off');
                $navFirst.addClass('off');
                $navLast.removeClass('off');
            } else if (isLastPage) {
                $navNext.addClass('off');
                $navLast.addClass('off');
                $navPrev.removeClass('off');
                $navFirst.removeClass('off');
            } else {
                $navNext.removeClass('off');
                $navPrev.removeClass('off');
                $navLast.removeClass('off');
                $navFirst.removeClass('off');
            }

        }

        function toggleTOC() {
            var opened = $container.data('opened');
            opened ? closeTOC() : openTOC();
        }

        function openTOC() {
            $container.addClass('slideRight').data('opened', true);
            setTimeout(function() {
                $('#back_menu_image').addClass('dblock_shadow');
            }, 300);
        }

        function closeTOC(callback) {

            updateNavigation(current === itemsCount - 1);
            $container.removeClass('slideRight').data('opened', false);
            setTimeout(function() {
                $('#back_menu_image').removeClass('dblock_shadow');
            }, 300);
            if (callback) {
                if (supportTransitions) {
                    $container.on(transEndEventName, function() {
                        $(this).off(transEndEventName);
                        callback.call();
                    });
                } else {
                    callback.call();
                }
            }

        }

        imgPopUp();
        // $('#banner').css('top', '-100%');
        // $('#banner2').fadeOut();
        bb.jump(location.hash.substr(1));
        return { init: init };

    })();

    Page.init();

    $('#ipt_title_curso').text(function() {
        var titulo = $('.title1>span').text();
        return titulo;
    });

    $('#ipt_title_curso').text(function() {
        var titulo = $('.title1>span').text();
        return titulo;
    });

    /*OperationsScorm();*/

    $('.btnPopScorm').on('click', function() {
        var $this = $(this);

        if ($($this).data('confirm') == 'Si') {
            $('div[data-sg-id="btn-popup-close"]').trigger('click');
        } else if ($($this).data('confirm') == 'No') {
            $('div[data-sg-id="btn-popup-close"]').trigger('click');
            $('#bb-nav-first').trigger('click');
        }
    });



    $('.v-button').click(function() {
        $('#banner').css('right', '-100%');
    });

    $('#banner2').click(function() {
        $(this).fadeOut();
    });

    $('.ipt_v_prev').click(function() {
        $('div[data-sg-id="btn-popup-close"]').trigger('click');
        var srcIframe = $(this).find('.urlVideo').text();
        $('.videoBox').fadeIn(300);
        $('.videoBox').find('iframe').attr('src', srcIframe);
    });

    $('.videoBoxClose').click(function() {
        $('#YTplayerInn').attr('src', '');
        $('.videoBox').fadeOut();
    });

    // item4_tabs
    $('#item2_tabs li').on('click', function() {
        $('#item2_tabs li').removeClass('selected');
        $this = $(this);
        $this.addClass('selected');
        $('#item2_tabs .tab').removeClass('selected');
        $('#item2_tab' + $this.data('tabid')).addClass('selected');
    });

    // Infográgicos
    $('.info_prev').click(function() {
        $('.infografia').fadeIn(300);
        setTimeout(function() {
            $('#sec1 .itemssec').css("opacity", "1");
        }, 500);
    });

    $('.infografiaClose').click(function() { $('.infografia').fadeOut(); });

    $.each($('.nav_infografias span'), function(i, e) {
        var x = $(this).attr('class');
        var tam = $('#' + x).css('height');
        $(this).click(function() {
            $('.nav_infografias span').css('background', 'transparent');
            $(this).css('background', 'rgb(158, 91, 106)');

            switch (i) {
                case 0:
                    setTimeout(function() {
                        $('#sec1 .itemssec').css("opacity", "1");
                    }, 600);
                    break;
                case 1:
                    setTimeout(function() {
                        $('#sec2 .itemssec').css("opacity", "1");
                    }, 600);
                    break;
                case 2:
                    setTimeout(function() {
                        $('#sec3 .itemssec').css("opacity", "1");
                    }, 600);
                    break;
            }

            $('.sectionsinfo').animate({
                'top': parseInt(tam) * (i * -1)
            }, 700, 'swing');
        });
    });

    $('.info_prev').click(function() {
        setTimeout(function() {
            $('.itemssec .ground').css('margin-top', '0em');
            $('.setImg-sec1 .img1').css('margin-left', '0');
            $('.setImg-sec1 .img2').css('margin-top', '10px');
            $('.setImg-sec1 .img3').css('margin-left', '26em');
        }, 1000)
    });

    $('#n2').click(function() {
        setTimeout(function() {
            $('.box-increment').css({
                width: '83.333%',
                opacity: 1
            });
        }, 1000)
    });

    $('.BA-content-t1__hidden').click(function() {
        $(this).removeClass('visible-content')
    })

}
