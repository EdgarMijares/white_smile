$(document).ready(function(){
	/* -------------- MENU RESPONSE ------------- */
	var contador = 1;
 
	function main () {
		$('.menu_bar').click(function(){
			if (contador == 1) {
				$('nav').animate({
					left: '0'
				});
				contador = 0;
			} else {
				contador = 1;
				$('nav').animate({
					left: '-100%'
				});
			}
		});
 
		// Mostramos y ocultamos submenus
		$('.submenu').click(function(){
			$(this).children('.children').slideToggle();
		});
	}

	/* -------------- CONTENIDO --------------*/
	var banner = {
		padre: $('#banner'),
		numeroSlide: $('#banner').children('.slide').length,
		posicion: 1
	}

	var info = {
		padre: $('#info'),
		numeroSlide: $('#info').children('.slide').length,
		posicion: 1
	}

	banner.padre.children('.slide').first().css({
		'left': 0
	});

	info.padre.children('.slide').first().css({
		'left':0
	});

	var altoBanner = function(){
		var alto = banner.padre.children('.slide').outerHeight();
		banner.padre.css({
			'height': alto + 'px'
		});
	};

	var altoinfo = function(){
		var alto = info.padre.children('.active').outerHeight();
		info.padre.animate({
			'height': alto + 'px'
		});
	};

	altoBanner();
	altoinfo();

	$(window).resize(function(){
		altoBanner();
		altoinfo();
	});

	$('#info').children('.slide').each(function(){
		$('#botones').append('<span>');
	});

	$('#botones').children('span').first().addClass('active');

	//BOTON SIGUIENTE
	$('#banner-next').on('click', function(e){
		e.preventDefault();

		if(banner.posicion < banner.numeroSlide){
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left' : '0'
			});

			$('#banner .active').prev().animate({
				'left': '-100%'
			});

			banner.posicion = banner.posicion + 1;
		} else {
			$('#banner .active').animate({
				'left': '-100%'
			});

			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#banner .active').removeClass('active');
			banner.padre.children('.slide').first().addClass('active').animate({
				'left' : 0
			});

			banner.posicion = 1;
		}
	});

	//BOTON ANTERIOR

	$('#banner-prev').on('click', function(e){
		e.preventDefault();

		if(banner.posicion > 1){
			banner.padre.children().not('.active').css({
				'left' : '-100%'
			});

			$('#banner .active').animate({
				'left' : '100%'
			});

			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left' : 0
			});

			banner.posicion = banner.posicion - 1;
		} else {
			banner.padre.children().not('.active').css({
				'left' : '-100%'
			});

			$('#banner .active').animate({
				'left' : '100%'
			});

			$('#banner .active').removeClass('active');
			banner.padre.children().last().addClass('active').animate({
				'left': 0
			});

			banner.posicion = banner.numeroSlide;
		}
	});

	//BOTONES info -----------------------
	//BOTON SIGUIENTE
	$('#info-next').on('click', function(e){
		e.preventDefault();

		if(info.posicion < info.numeroSlide){
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left' : '0'
			});

			$('#info .active').prev().animate({
				'left': '-100%'
			});

			$('#botones').children('.active').removeClass('active').next().addClass('active');

			info.posicion = info.posicion + 1;
		} else {
			$('#info .active').animate({
				'left': '-100%'
			});

			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active');
			info.padre.children('.slide').first().addClass('active').animate({
				'left' : 0
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').first().addClass('active');

			info.posicion = 1;
		}
		altoinfo();
	});

	//BOTON ANTERIOR

	$('#info-prev').on('click', function(e){
		e.preventDefault();

		if(info.posicion > 1){
			info.padre.children().not('.active').css({
				'left' : '-100%'
			});

			$('#info .active').animate({
				'left' : '100%'
			});

			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left' : 0
			});

			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			info.posicion = info.posicion - 1;
		} else {
			info.padre.children().not('.active').css({
				'left' : '-100%'
			});

			$('#info .active').animate({
				'left' : '100%'
			});

			$('#info .active').removeClass('active');
			info.padre.children().last().addClass('active').animate({
				'left': 0
			});

			$('#botones').children('active').removeClass('active');
			$('#botones').children('span').last().addClass('active');

			info.posicion = info.numeroSlide;
		}
		altoinfo();
	});
});