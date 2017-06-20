var bookmark;
function OperationsScorm() 
{
	iniciarLMS();
	var ok;
	

	function iniciarLMS() {

		ok = ScormProcessInitialize();

		if (ok) {

			bookmark = ScormProcessGetValue("cmi.core.lesson_location");

			if (bookmark != "")
			{

				//if (confirm("¿Desea continuar donde guardo antes?")) {
				console.log("Quedaste en la página: " + bookmark);
				$('#bb-nav-last').trigger('click');
				$('div[data-sg-key="999"]').trigger('click');

				//}
			}
			else{
				console.log("No se trajo el valor guardado");
			}	
		}		
	}

	window.onbeforeunload = function (){
		if (ok) 
		{
			var elements = $('.bb-item');
			var miPage;

			$(elements).each(function(index, elem){
				var actualID = "#" + elem.id;
				if ($(actualID).css('display') == 'block'){
					miPage = index + 1;
				}
			});

			console.log(miPage);

			ScormProcessSetValue("cmi.core.lesson_location", miPage);
			ScormProcessFinish();
			//top.close();
		}
	};

	var paginas = $(".bb-item");
	var botonFinalizar = paginas.last().find('button');

	botonFinalizar.on('click', function() {

		if (ok) 
		{
			var score = Math.round(Math.random()*10);
			var bookmark = "";

			ScormProcessSetValue("cmi.core.score.raw", score);
	        ScormProcessSetValue("cmi.core.score.min", "0");
	        ScormProcessSetValue("cmi.core.score.max", "10");
	        ScormProcessSetValue("cmi.core.lesson_location", bookmark);
	        ScormProcessFinish();
	        top.close();

		}
	});
}