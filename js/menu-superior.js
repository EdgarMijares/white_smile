$(document).ready(main);
 
var contador = 1;
 
function main(){
	$('.fa-bars').click(function(){
		// $('nav').toggle(); 
 		console.log("Click" + contador);
		if(contador == 1){
			$('.menuSup').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('.menuSup').animate({
				left: '-100%'
			});
		}
 
	});
 
};