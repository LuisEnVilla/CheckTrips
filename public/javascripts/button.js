$(function(){
	var v = $('.social')
	var ico = $('.compare-icon')

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

	if(sessionStorage.data1){
		$('#f1').text(sessionStorage.data1)
	}
	if(sessionStorage.data2){
		$('#f2').text(sessionStorage.data2)
	}
	if(sessionStorage.getItem('data3[0]')){
		$('#f3').text(sessionStorage.getItem('data3[0]'))
	}
	if(sessionStorage.getItem('data4[0]')){
		$('#f4').text(sessionStorage.getItem('data4[0]'))
	}

	$(ico).each(function() {
		var i = $(this)
		if($(i).hasClass('f')){
			if($(i).attr('aidi')===sessionStorage.getItem('data3[1]') ||
				$(i).attr('aidi')===sessionStorage.getItem('data4[1]')){
				$(i).addClass('green')
			}
		}
		else if ($(i).attr('id')===sessionStorage.data1 || $(i).attr('id')===sessionStorage.data2){
			$(i).addClass('green')
		}
	})

	ico.click(function() {
		var aidi;
		if($(this).hasClass('f')){
			aidi = $(this).attr('aidi')
		}
		else {
			aidi = $(this).attr('id')
		}
		
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
				case sessionStorage.getItem('data3[1]'):
					sessionStorage.removeItem('data3[0]')
					sessionStorage.removeItem('data3[1]')
					$('#f3').text('')
					break
				case sessionStorage.getItem('data4[1]'):
					sessionStorage.removeItem('data4[0]')
					sessionStorage.removeItem('data4[1]')
					$('#f4').text('')
					break
			}
		}
		else if($(this).hasClass('f')){
			if (sessionStorage.getItem('data3[1]') && sessionStorage.getItem('data4[1]')) {
			alert('Ya se han elegido dos elementos a comparar')
			return
		}
		else if (sessionStorage.getItem('data3[1]')) {
			if (sessionStorage.getItem('data3[1]')!==aidi){
				sessionStorage.setItem("data4[0]", $(this).attr('id'))
				sessionStorage.setItem("data4[1]", aidi)
				$('#f4').text($(this).attr('id'))
				$(this).addClass('green')
			return
			}
		} else{
			sessionStorage.setItem("data3[0]", $(this).attr('id'))
				sessionStorage.setItem("data3[1]", aidi)
			$('#f3').text($(this).attr('id'))
			$(this).addClass('green')
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
		$('#f3').text('')
		$('#f4').text('')
		$(ico).removeClass('green')
	})

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

	$('#comparar2').click(function(event) {
		if (sessionStorage.getItem('data3[1]') && sessionStorage.getItem('data4[1]')) {
		window.location.assign('/compare/'+ sessionStorage.getItem('data3[1]') +'/'+sessionStorage.getItem('data4[1]')+'/funcionarios')
		}
		if(!sessionStorage) {
			alert('No hay elementos a comparar')
		}
		else if (sessionStorage.data3 && !sessionStorage.data4
					 ||sessionStorage.data4 && !sessionStorage.data3) {
			alert('Elija dos elementos a comparar')
		}
	})
	var overlay = $('.sidebar-overlay');

    $('.sidebar-toggle').on('click', function() {
    	console.log('clicki');
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.on('click', function() {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
    console.log(overlay);


})