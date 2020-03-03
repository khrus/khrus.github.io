$(function() {

	page = $(document);

	var lastId;
	var navbar = $("#navbar");
	var navItems = navbar.find("a");
	var topOffset = 50;

	var scrollItems = navItems.map(function() {
		var item = $($(this).attr("href"));
		if (item.length) return item;
	});

	navItems.click(function() {
		var sectionId = $(this).attr('href');
		var offsetTop = $(href).offset().top - topOffset + 1;
		$(this).addClass('active');
		$('body, html').stop().animate({scrollTop: offsetTop}, 300);
		return false;
	});

	page.scroll(spyScroll);

	/***************************************************************************/
	function spyScroll() {

		var fromTop = page.scrollTop() + topOffset;

		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop)
			return this;
		});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : '';
		 
		if (lastId !== id) {
			lastId = id;
			navItems.filter('[href="#'+id+'"]').addClass('active')
				.siblings().removeClass('active');
		}
	}
	/***************************************************************************/
});