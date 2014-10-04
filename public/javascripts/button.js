$(function(){
	
	var v = $('.social');
	
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
		$(this).toggleClass('green')
	})

	var cont = $('#compare-card>.card-content')

	$('.compare-icon').click(function() {
		 $( this ).toggleClass( "green" )
		 console.log($(this).attr('class'))
		 $( this ).toggleClass( "green" )
		 console.log($(this).attr('class'))
		var aidi = $(this).next('.flat-btn').attr('href').split('/')[2]
		console.log(aidi);

		if (sessionStorage.data2) {
			alert('Ya se han elegido dos elementos a comparar')
			return
		}

		if (sessionStorage.data1) {
			if (sessionStorage.data1!==aidi){
				sessionStorage.setItem("data2", aidi)
				cont.append('<p>' + sessionStorage.data2 + '</p>')
				$(this).toggleClass('green')
			return
			}else {
				alert('El elemento a comparar es el mismo')
			}
		} 
		sessionStorage.setItem("data1", aidi)
		cont.append('<p>' + sessionStorage.data1 + '</p>')
	})

	$('#limpiar').click(function(event) {
		sessionStorage.clear()
		cont.remove()
	});

	$('#comparar').click(function(event) {
		window.location.assign('/compare/'+'2013.I.0013'+'/'+'2013.N.0013'+'/viaje')
	});
})