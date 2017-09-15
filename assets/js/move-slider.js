var MOVESETTINGS = {
	anchors: [{}],
	current: [{}],
	last: [{}],
	loop: [{}],
	time: [{}],
	delay: false,
	finger: false,
	indexs: 0
};

$(function(){

	$.each($('.move-slider'), function(i){
		var $this = $(this);
		var slides = [];
		var anchors = [];

		$.each($this.find('.move-slide'), function(){
			var $this = $(this);
			$this.attr("ondragstart","return false");
			slides.push({
				img: $this.find('img').attr('src'),
				alt: $this.find('img').attr('alt'),
				anchor: $this
			});
		});
		for(var h=0, j=0; h < slides.length; h++){
			anchors[h] = j;
			j = anchors[h] + (slides[h].anchor.width());
		}

		MOVESETTINGS['anchors'][i] = anchors;
		MOVESETTINGS['current'][i] = 0;
		MOVESETTINGS['last'][i] = anchors.length - 1;
		MOVESETTINGS['loop'][i] = !$this.attr('move-loop')? false : true;
		MOVESETTINGS['time'][i] = !MOVESETTINGS['loop'][i]? false : $this.attr('move-time');
		MOVESETTINGS['indexs'] = i + 1;
		$this.find('.move-container').css("width", ($this.find('.move-slide').width() * anchors.length) +"px");	
		$this.find('.move-slide').width($this.find('.move-container').width() / anchors.length)
		i++;
	});

	for(var i = 0; i < 	MOVESETTINGS['indexs']; i++){
		moveLoop(i);
	}

});

//Move Slides
$('.move-btn-right').on('click', function(e){
	e.preventDefault();
	var $this = $(this);
	var slider = $this.parent().parent();
	var index = slider.index('.move-slider');
	
	moveSlide(slider, index, 1);
});
$('.move-btn-left').on('click', function(e){
	e.preventDefault();
	var $this = $(this);
	var slider = $this.parent().parent();
	var index = slider.index('.move-slider');
	
	moveSlide(slider, index, -1);
});

//Funciones
function moveSlide($slider, index, direction){
	if(direction > 0){
		if(!MOVESETTINGS['delay']){
			MOVESETTINGS['delay'] = true;
			if(MOVESETTINGS['current'][index] < MOVESETTINGS['last'][index]){
				MOVESETTINGS['current'][index]++;
				$slider.animate({
					scrollLeft: MOVESETTINGS['anchors'][index][MOVESETTINGS['current'][index]]+"px"
				}, 400,function(){
					MOVESETTINGS['delay'] = false;
				});
			}else{
				MOVESETTINGS['current'][index] = 0;
				$slider.animate({
					scrollLeft: MOVESETTINGS['anchors'][index][MOVESETTINGS['current'][index]]+"px"
				}, 400,function(){
					MOVESETTINGS['delay'] = false;
				});
			}
		}	
	}else{
		if(!MOVESETTINGS['delay']){
			MOVESETTINGS['delay'] = true;
			if(MOVESETTINGS['current'][index] > 0){
				MOVESETTINGS['current'][index]--;
				$slider.animate({
					scrollLeft: MOVESETTINGS['anchors'][index][MOVESETTINGS['current'][index]]+"px"
				}, 400,function(){
					MOVESETTINGS['delay'] = false;
				});
			}else{
				MOVESETTINGS['current'][index] = MOVESETTINGS['last'][index];
				$slider.animate({
					scrollLeft: MOVESETTINGS['anchors'][index][MOVESETTINGS['current'][index]]+"px"
				}, 400,function(){
					MOVESETTINGS['delay'] = false;
				});
			}
		}
	}
}
function moveLoop(index){
	if(MOVESETTINGS['loop'][index]){
		setInterval(function(){
			var $slider = $('.move-slider').eq(index);
			moveSlide($slider, index, 1);
			//console.log($slider, index, 1);
		}, 	MOVESETTINGS['time'][index]);
	}
}
