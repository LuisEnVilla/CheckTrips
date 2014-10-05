$(function(){
	if(sessionStorage){
		$('#f1').text(sessionStorage.data1)
		$('#f2').text(sessionStorage.data2)
	}

	var v = $('.social')
	var ico = $('.compare-icon')
	$(ico).each(function() {
		var i = $(this)
		if ($(i).attr('id')===sessionStorage.data1 || $(i).attr('id')===sessionStorage.data2){
			$(i).addClass('green')
		}
	})

	$('#trigger').click(function() {
		v.first().fadeToggle(200, function nextBtn() {
			$(this).next('.social').fadeToggle('slow', nextBtn)
		})
	})
	
	v.click(function() {
		v.fadeToggle('slow')
	})

	$('#compare-btn').click(function() {
		$('#compare-card').slideToggle(400)
	})

	ico.click(function() {
		var aidi = $(this).attr('id')
		if ($(this).hasClass('green')) {
			$(this).removeClass('green')
			switch(aidi){
				case sessionStorage.data1:
					sessionStorage.removeItem('data1')
					$('#f1').text('')
					break
				case sessionStorage.data2:
					sessionStorage.removeItem('data2')
					$('#f2').text('')
					break
			}
		}
		else if (sessionStorage.data2 && sessionStorage.data1) {
			alert('Ya se han elegido dos elementos a comparar')
			return
		}
		else if (sessionStorage.data1) {
			if (sessionStorage.data1!==aidi){
				sessionStorage.setItem("data2", aidi)
				$('#f2').text(sessionStorage.data2)
				$(this).addClass('green')
			return
			}
		} else{
			sessionStorage.setItem("data1", aidi)
			$('#f1').text(sessionStorage.data1)
			$(this).addClass('green')
		}
	})

	$('#limpiar').click(function(event) {
		sessionStorage.clear()
		$('#f1').text('')
		$('#f2').text('')
		$(ico).removeClass('green')
	});

	$('#comparar').click(function(event) {
		if (sessionStorage.data1 && sessionStorage.data2) {
		window.location.assign('/compare/'+ sessionStorage.data1 +'/'+sessionStorage.data2+'/viaje')
		}
		if(!sessionStorage) {
			alert('No hay elementos a comparar')
		}
		else if (sessionStorage.data1 && !sessionStorage.data2
					 ||sessionStorage.data2 && !sessionStorage.data1) {
			alert('Elija dos elementos a comparar')
		}
	})
})