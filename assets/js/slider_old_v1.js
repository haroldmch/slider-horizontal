	$(document).ready(function(){
		var anchors = [];
		var anchors_left = [];
				
		$.each( $('.articulo'), function(i, val){
			anchors[i] = "#"+$(val).prop("id");
		});
				
		for(var i=0, j=0; i < anchors.length;i++){
			//anchors_left[i] = $(anchors[i]).offset().left;
			anchors_left[i] = j;
			j = anchors_left[i] + ($(anchors[i]).width());
		}
				
		for(var i=0; i < anchors_left.length;i++){
			console.log(anchors_left[i]);
		}
				
		var current = 0;
		var last = (anchors.length - 1);
		
		$('.der').on('click',function (e) {
			if(current < last){
				current++;
				//console.log("derecha: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
				//console.log("derecha: "+current);
				});
			}else{
				current = 0;
				//console.log("derecha: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
				//console.log("derecha: "+current);
				});
			}		
		});
				
		$('.izq').on('click',function (e) {
			if(current > 0){
				current--;
				//console.log("izquierda: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
					//console.log("derecha: "+current);
				});
			}else{
				current = last;
				//console.log("izquierda: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
					//console.log("derecha: "+current);
				});
			}
		});
				
		$(window).resize(function(){
			for(var i=0, j=0; i < anchors.length;i++){
				//anchors_left[i] = $(anchors[i]).offset().left;
				anchors_left[i] = j;
				j = anchors_left[i] + ($(anchors[i]).width());
			}
					
			$('.slider').animate({
				scrollLeft: 0+"px"
			}, 400,function(){
				current = 0;
			});
		
		});
			
		$.initialize = function (){
			$.loop_play();
		}
		
		//Loop play
		$.loop_play = function (){
			if(play_slider == true){
				loop = setInterval('$.next_slider()',time);
				play_slider = false;
				//$('#play').html('||');
			}
			else{
				clearInterval (loop);
				play_slider = true;
				//$('#play').html('>');
			}
		}
		
		$.next_slider = function (){
			if(current < last){
				current++;
				//console.log("derecha: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
				//console.log("derecha: "+current);
				});
			}else{
				current = 0;
				//console.log("derecha: "+current);
				$('.slider').animate({
					scrollLeft: anchors_left[current]+"px"
				}, 400,function(){
				//console.log("derecha: "+current);
				});
			}
		}
		
	});