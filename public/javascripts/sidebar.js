$(document).ready(function($) {
	console.log('000');
	var overlay = $('.sidebar-overlay');

    $('.sidebar-toggle').click(function() {
    	console.log('clicki');
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.click(function() {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
    console.log(overlay);
});