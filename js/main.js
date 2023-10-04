$('.banner .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	lazyLoad:true,
    nav:false,
    startPosition: 0,
	autoplay:true,
	dots: false,
	autoplayTimeout:10000,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$('.testimonials .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
	lazyLoad:true,
    nav:false,
    startPosition: 0,
	autoplay:true,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:2
        },
        1000:{
            items:2
        }
    }
})
$(document).ready(function() {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  var syncedSecondary = true;
  bigimage.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    dots: false,
    loop: true,
	autoplay:false,
    responsiveRefreshRate: 200,
    navText: [
    ]
	}).on("changed.owl.carousel", syncPosition);

	thumbs.on("initialized.owl.carousel", function() {
		thumbs
		.find(".owl-item")
		.eq(0)
		.addClass("current");
	})
    .owlCarousel({
		items: 9999,
		dots: false,
		nav: false,
		autoplay:false,
		navText: [
		],
		smartSpeed: 200,
		slideSpeed: 500,
		slideBy: 1,
		responsiveRefreshRate: 100
	}).on("changed.owl.carousel", syncPosition2);

	function syncPosition(el) {
		console.log(el);
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
	thumbs.find(".owl-item").removeClass("current").eq(current).addClass("current");
	var onscreen = thumbs.find(".owl-item.active").length - 1;
	console.log(onscreen)
	var start = thumbs
		.find(".owl-item.active")
		.first()
		.index();
		var end = thumbs.find(".owl-item.active").last().index();
		console.log(end);
		if (current > end) {
			thumbs.data("owl.carousel").to(current, 100, true);
		}
		if (current < start) {
			thumbs.data("owl.carousel").to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			bigimage.data("owl.carousel").to(number, 100, true);
		}	
	}

	/*thumbs.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		bigimage.data("owl.carousel").to(number, 300, true);
	});*/
});
$('.gallery-info .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	lazyLoad:true,
    nav:false,
	autoplay:true,
    startPosition: 0,
	//autoplayTimeout:1000,
    responsive:{
        0:{
            items:2
        },
        767:{
            items:4
        },
        1000:{
            items:4
        }
    }
})
$('.tab-content .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	lazyLoad:true,
    nav:false,
	autoplay:false,
    startPosition: 0,
	dots: false,
	//autoplayTimeout:1000,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$(document).ready(function(){
	$(".card-header button").click(function(){
		$(this).toggleClass("active");
	});
});
$(window).scroll(function(){
    if ($(window).scrollTop() >= 200) {
        $('.mobile-sticky-deal').addClass('sticky');
		$('body').addClass('sticky');
    }
    else {
        $('.mobile-sticky-deal').removeClass('sticky');
		$('body').removeClass('sticky');
    }
});

$(document).ready(function(){
	$(".btn-complete").click(function(){
		$('body').addClass("loading");
	});
	$(".hotel-description .btn.btn-secondary").click(function(){
		$('.facilities').addClass("active");
		$(this).addClass("d-none");
	});
	$(".facilities a.remove").click(function(){
		$('.facilities').removeClass("active");
		$('.hotel-description .btn.btn-secondary').addClass("d-block");
	});
	$(".packages .btn.btn-secondary").click(function(e){
		$(this).parent().parent().parent().parent().addClass("Inclusions-active");
	});
	$(".packages a.remove").click(function(e){
		$(this).parent().parent().parent().parent().removeClass("Inclusions-active");
	});
	
	$(".package.one").click(function(){
		$('.full-packages.one').toggleClass("active");
		$('.package.one').removeClass("active");
	});
	
	$(".full-packages.one .col-lg-8 h3").click(function(){
		$('.package.one').toggleClass("active");
		$('.full-packages.one').toggleClass("active");
	});
	
	$(".full-packages.two .col-lg-8 h3").click(function(){
		$('.package.two').removeClass("inactive");
		$('.full-packages.two').toggleClass("active");
	});
	
	$(".package.two").click(function(){
		$('.full-packages.two').toggleClass("active");
		$('.package.two').addClass("inactive");
	});
	
	$(".full-packages.three .col-lg-8 h3").click(function(){
		$('.package.three').removeClass("inactive");
		$('.full-packages.three').toggleClass("active");
	});
	
	$(".package.three").click(function(){
		$('.full-packages.three').toggleClass("active");
		$('.package.three').addClass("inactive");
	});
	
	$(".remove-menu.d-none").click(function(){
		$('.navbar-collapse.collapse').removeClass("show");
	});
});
$(document).ready(function(){

$(".btn-complete").click(function(){
// 	var delay = 2000; 
// 	var url = 'payment-success.html'
// 	setTimeout(function(){ window.location = url; }, delay);
})
});
$(document).ready(function () {
	$(".read-more-btn").click(function () {
		$(this).prev().slideToggle();
		if ($(this).html() == 'Less Info <i class="pl-2 fa fa-minus" aria-hidden="true"></i>') {
			$(this).html('More Info <i class="pl-2 fa fa-plus" aria-hidden="true"></i>');
		} else {
			$(this).html('Less Info <i class="pl-2 fa fa-minus" aria-hidden="true"></i>');
		}
	});
});

$(document).ready(function() {
  var bigimage = $("#big-1");
  var thumbs = $("#thumbs-1");
  var syncedSecondary = true;
  bigimage.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    dots: false,
    loop: true,
	autoplay:false,
    responsiveRefreshRate: 200,
    navText: [
    ]
	}).on("changed.owl.carousel", syncPosition);

	thumbs.on("initialized.owl.carousel", function() {
		thumbs
		.find(".owl-item")
		.eq(0)
		.addClass("current");
	})
    .owlCarousel({
		items: 9999,
		dots: false,
		nav: false,
		autoplay:false,
		navText: [
		],
		smartSpeed: 200,
		slideSpeed: 500,
		slideBy: 1,
		responsiveRefreshRate: 100
	}).on("changed.owl.carousel", syncPosition2);

	function syncPosition(el) {
		console.log(el);
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
	thumbs.find(".owl-item").removeClass("current").eq(current).addClass("current");
	var onscreen = thumbs.find(".owl-item.active").length - 1;
	console.log(onscreen)
	var start = thumbs
		.find(".owl-item.active")
		.first()
		.index();
		var end = thumbs.find(".owl-item.active").last().index();
		console.log(end);
		if (current > end) {
			thumbs.data("owl.carousel").to(current, 100, true);
		}
		if (current < start) {
			thumbs.data("owl.carousel").to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			bigimage.data("owl.carousel").to(number, 100, true);
		}	
	}

	/*thumbs.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		bigimage.data("owl.carousel").to(number, 300, true);
	});*/
});



$(document).ready(function () {
	const owl = $(".owl-carousel");

	owl.owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000, // Set autoplay interval (adjust as needed)
		autoplayHoverPause: true,
	});

	// Navigation Icons
	$(".next-slide").click(function () {
		owl.trigger("next.owl.carousel");
	});
	$(".prev-slide").click(function () {
		owl.trigger("prev.owl.carousel");
	});
});


        $(document).ready(function() {
            $("[data-fancybox]").fancybox({
                // Customize Fancybox options if needed
            });
        });
    

