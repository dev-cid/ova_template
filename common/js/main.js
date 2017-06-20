requirejs.config({
	//html파일 기준으로
	baseUrl:"../common/",
	paths:{
		'text': 'lib/require/text',
		'jquery': 'lib/jquery/jquery-1.11.1.min',
		'jquery-ui': 'lib/jquery/jquery-ui-1.10.4.custom.min',
		'jquery-easytabs': 'lib/jquery/jquery.easytabs.custom',
		'jquery-ui-touchpunch': 'lib/jquery/jquery.ui.touch-punch.min',
		'sg': 'lib/sg/sg-1.5',
		'sg-attr-defaultPack': 'lib/sg/sg.attr.defaultPack-1.2',
		'sg-attr-draggable': 'lib/sg/sg.attr.draggable-1.4',
		'sg-tag-defaultPack': 'lib/sg/sg.tag.defaultPack-1.5',
		//added 17/03/15
		'jquery-zoomooz': 'lib/jquery/jquery.zoomooz.min',
		'jquerypp': 'lib/jquery/jquerypp.custom',
		'jquery-bookblock': 'lib/jquery/jquery.bookblock',
		'modernizer': 'lib/jquery/modernizr.custom',
		//added 23/03/16
		'youtube-api' : 'lib/jquery/youtube_api',
		//added 04/04/2016
		'impress' : 'lib/jquery/impress'
	},
	
	waitSeconds: 0,
/*
	shim:
	AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
	참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/
*/
	shim:{
		'jquery-ui':{
			deps:['jquery']
		},
		'jquery-ui-touchpunch':{
			deps:['jquery-ui']
		},
		'jquery-fancybox':{
			deps:['jquery']
		},
		'jquery-easytabs':{
			deps:['jquery']
		},
		'sg':{
			deps:['jquery'],
			exports: "sg"
		},
		'sg-attr-defaultPack':{
			deps:['sg']
		},
		'sg-attr-draggable':{
			deps:['sg', 'jquery-ui']
		},		
		'sg-tag-defaultPack':{
			deps:['sg']
		},
		'jquery-zoomooz':{
			deps:['jquery']
		},
		'jquerypp':{
			deps:['jquery']
		},
		'jquery-bookblock':{
			deps:['jquerypp', 'jquery']
		},
		'modernizer': {
			deps:['jquery']
		},
		'youtube-api':{
			deps:['jquery']
		},
		'impress':{
			deps:['jquery']
		}
	}
});

require(
	
	[ 'jquery', 'jquery-ui', 'jquerypp', 'sg', 'sg-attr-defaultPack', 'sg-attr-draggable', 'sg-tag-defaultPack', 'jquery-easytabs', 'jquery-ui-touchpunch', 'jquery-bookblock', 'modernizer', 'youtube-api', 'impress' ],
	
	function ( ){
		sg.setStage( "#stage" );
		sg.setScaleMode( "showall" );
		sg.setLoadingImage( "../common/img/loader.gif" );
		
		sg.setSoundName({
			"success": "../common/sounds/success.mp3",
			"success-low": "../common/sounds/success-low.mp3",
			"error": "../common/sounds/error.mp3"
		});
		
		sg.init(function(){
			
			function getOutHeight( target ){
				var h = 0;
				var $this = $(target);
				h = $this.height();
				h += $this.cssVal("padding-top") + $this.cssVal("padding-bottom");
				h += $this.cssVal("margin-top") + $this.cssVal("margin-bottom");
				h += $this.cssVal("border-top-width") + $this.cssVal("border-bottom-width");
				return h;
			}
			
			function setInHeight( target, h ){
				var $this = $( target );
				var b = $this.cssVal('border-bottom-width');
				$this.css("min-height", h - (getOutHeight( target ) - $this.height()) + b);
				$this.css("max-height", h - (getOutHeight( target ) - $this.height()) + b);
			}
			
			setInHeight( ".ipt_contenido", sg.stageHeight - getOutHeight( "#content>header" ) );

			$("html").css( "user-select", "none" );
			
			$('.ipt_v_prev').click(function(){
				$('div[data-sg-id="btn-popup-close"]').trigger('click');
				var srcIframe = $(this).find('.urlVideo').text();
				$('.videoBox').fadeIn(300);
				var img_vdd = srcIframe.indexOf("xxx");
				if (img_vdd == -1)
				{
					$('.iptFaltaVideo').css('display','none');
					$('.videoBox').find('iframe').css('display','block');
					$('.videoBox').find('iframe').attr('src', srcIframe);
				}
				else
				{
					$('.videoBox').find('iframe').css('display','none');
					$('.videoBox').append('<img src="../css/img/img_prueba.jpg" style="width:100%;">');
					$('.videoBox').append('<span class="iptFaltaVideo">En proceso de actualización</span>');	
					$('.iptFaltaVideo').css('display','block');
				}
			});

			var $items = $('.bb-item'),
				count = $items.length,
				color = $('.ipt_contenido').css('border-color');

			$items.each(function(idx, elem){
				var $elem = $(elem);
				var pvalor = (( (idx+1) / count)*100);
				var bgposX;
				if (idx == 0) 
				{
					bgposX = '-1px';
					impContador(idx, bgposX, $elem);
				}
				else if (idx < 9) 
				{
					if (20.0 >= pvalor) 
					{
						bgposX = '-71px';
						impContador(idx, bgposX, $elem);
					}
					else if (40.0 >= pvalor) 
					{
						bgposX = '-140px';
						impContador(idx, bgposX, $elem);
					}
					else if (60.0 >= pvalor) 
					{
						bgposX = '-210px';
						impContador(idx, bgposX, $elem);
					}
					else if (80.0 >= pvalor || 100.0 > pvalor) 
					{
						bgposX = '-279px';
						impContador(idx, bgposX, $elem);
					}
					else if (100.0 == pvalor) 
					{
						bgposX = '-349px';
						impContador(idx, bgposX, $elem);
					}
				}
				else
				{
					if (20.0 >= pvalor) 
					{
						bgposX = '-72px';
						impContador(idx, bgposX, $elem);
					}
					else if (40.0 >= pvalor) 
					{
						bgposX = '-141px';
						impContador(idx, bgposX, $elem);
					}
					else if (60.0 >= pvalor) 
					{
						bgposX = '-211px';
						impContador(idx, bgposX, $elem);
					}
					else if (80.0 >= pvalor || 100.0 > pvalor) 
					{
						bgposX = '-280px';
						impContador(idx, bgposX, $elem);
					}
					else if (100.0 == pvalor) 
					{
						bgposX = '-350px';
						impContador(idx, bgposX, $elem);
					}
				}


			});

			function impContador(idx, bgposX, $elem)
			{
				var n = $('<div>', {Class: 'ipt-pagenumer'}).html('<span>'+(idx + 1)+' <span class="eslas"> | </span> '+count+'</span>');
				n.appendTo($elem);
				$(n).css({
					'background-position-x' : bgposX,
					'background-position-y' : '5px'
				});
			}

			
		});
	}
);