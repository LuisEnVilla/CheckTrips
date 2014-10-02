$(function(){
	var v = $('.social');
	$('#trigger').click(function() {
		v.first().toggle(200, function nextBtn() {
			$(this).next('.social').toggle('slow', nextBtn);
		});
	})
	v.click(function() {
		v.toggle('slow')
	});
})