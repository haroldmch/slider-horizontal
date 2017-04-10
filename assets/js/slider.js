	$(document).ready(function(){
		var anchors = [];
		var anchors_left = [];
		var delay_slider = false;
		var delay_finger = true;
		var current;
		var last;
		
		$.each( $('.articulo'), function(i, val){
			$(this).attr("ondragstart","return false");
			anchors[i] = "#"+$(val).prop("id");
		});
				
		for(var i=0, j=0; i < anchors.length;i++){
			//anchors_left[i] = $(anchors[i]).offset().left;
			anchors_left[i] = j;
			j = anchors_left[i] + ($(anchors[i]).width());
		}
				
		/*for(var i=0; i < anchors_left.length;i++){
			console.log(anchors_left[i]);
		}*/

		$.initialize = function (){
			last = $.move(anchors.length,($(window).width()+15));
			$.loopPlaySlider();
			current = 0;
			$('.contenedor').css("width",$(".articulo").width() * anchors.length+"px");	
		}	
		
		$(window).resize(function(){
			/*for(var i=0, j=0; i < anchors.length;i++){
				anchors_left[i] = j;
				j = anchors_left[i] + ($(anchors[i]).width());
			}*/
			
			$('.slider').animate({
				scrollLeft: 0+"px"
			}, 400);
			
			current = 0;
			last = $.move(anchors.length,($(window).width()+15));
			$('.contenedor').css("width",$(".articulo").width() * anchors.length+"px");	

		});
		
		$('.der').click(function(){
			$.right();
		});
		
		$('.izq').click(function(){
			$.left();
		});
		
		/*Touch*/
		$('.articulo').on('drag', function(e) {
			if(delay_finger){
				delay_finger = false;
				var direction = e.direction;
						
				if(direction > 0)
					$.left();
				else
					$.right();
					
				var timeoutID = setTimeout(function(){
					delay_finger = true;
				}, 1000);
			}		
		});
		
		//Funciones
		
		$.loopPlaySlider = function (){
			if(play_slider == false){
				return;
			}
			else if(play_slider == true){
				loop = setInterval('$.right()',time);
				play_slider = false;
			}
			else{
				clearInterval (loop);
				play_slider = true;
			}
		}
		
		$.right = function (){
			if(!delay_slider){
				delay_slider = true;
				if(current < last){
					current++;
					$('.slider').animate({
						scrollLeft: anchors_left[current]+"px"
					}, 400,function(){
						delay_slider = false;
					});
				}else{
					current = 0;
					$('.slider').animate({
						scrollLeft: anchors_left[current]+"px"
					}, 400,function(){
						delay_slider = false;
					});
				}
			}		
		}
		
		$.left = function (){
			if(!delay_slider){
				delay_slider = true;
				if(current > 0){
					current--;
					$('.slider').animate({
						scrollLeft: anchors_left[current]+"px"
					}, 400,function(){
						delay_slider = false;
					});
				}else{
					current = last;
					$('.slider').animate({
						scrollLeft: anchors_left[current]+"px"
					}, 400,function(){
						delay_slider = false;
					});
				}
			}
		}
		
		$.move = function(data,display){
			var min;
			if(display > $(".articulo").width()){
				for(var i=0, j=$(".articulo").width(); i < data;i++){
					if((display/ j) >= 1){
						min = i+1;
					}else
						break;	
					j = j + $(".articulo").width();
				}

				//console.log(min);
				
				if((data - min) <= 0){
					$('.boton').css("display","none");
					return 0;
				}
				else
					return data - min;
			}
			else
				return data-1;
			
		}
	});