$(function(){
	
	var v = $('.social');
	
	$('#trigger').click(function() {
		v.first().fadeToggle(200, function nextBtn() {
			$(this).next('.social').fadeToggle('slow', nextBtn)
		})
	})
	
	v.click(function() {
		v.fadeToggle('slow')
		$('.modal-body p:nth-child(2)').text(window.location.href)
		switch($(this).attr('id')){
			case 'one':
				$('h4.modal-title').text('Compartir en Facebook')
			break
			case 'two':
				$('h4.modal-title').text('Compartir en Twitter')
			break
			case 'three':
				$('h4.modal-title').text('Compartir en Google Plus')
			break
		}
	})

	$('#compare-btn').click(function() {
		console.log('click')
		$('#compare-card').slideToggle(400)
	})

	$('.compare-icon').click(function() {
		var cont = $('#compare-card>.card-content')
		
		if (sessionStorage.data2) {
			alert('Ya se han elegido dos elementos a comparar')
			return
		}

		if (sessionStorage.data1) {
			if (sessionStorage.data1!==$(this).next('.flat-btn').attr('href')){
				sessionStorage.setItem("data2", $(this).next('.flat-btn').attr('href'))
				cont.append('<p>' + sessionStorage.data2 + '</p>')
				$(this).toggleClass('green')
			return
			}else {
				alert('El elemento a comparar es el mismo')
			}
		} 
		sessionStorage.setItem("data1", $(this).next('.flat-btn').attr('href'))
	$(this).toggleClass('.green')
		cont.append('<p>' + sessionStorage.data1 + '</p>')
	})


})