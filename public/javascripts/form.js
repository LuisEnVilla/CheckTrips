$(function() {
	$('select').select2();
	$('a.btn.flat-btn').click(function(event) {
		event.preventDefault();
		var tabs = '#tabs a[href=#pane' + $(this).attr('id') + ']';
		console.log(tabs);
		$(tabs).tab('show');
	});
})