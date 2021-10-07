/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
	var $window = $(window),
		$body = $("body"),
		$header = $("#header"),
		$banner = $("#banner");

	// Breakpoints.
	breakpoints({
		xlarge: "(max-width: 1680px)",
		large: "(max-width: 1280px)",
		medium: "(max-width: 980px)",
		small: "(max-width: 736px)",
		xsmall: "(max-width: 480px)",
	});

	// Play initial animations on page load.
	$window.on("load", function () {
		window.setTimeout(function () {
			$body.removeClass("is-preload");
		}, 100);
	});

	// Header.
	if ($banner.length > 0 && $header.hasClass("alt")) {
		$window.on("resize", function () {
			$window.trigger("scroll");
		});

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () {
				$header.removeClass("alt");
			},
			enter: function () {
				$header.addClass("alt");
			},
			leave: function () {
				$header.removeClass("alt");
			},
		});
	}

	// Menu.
	var $menu = $("#menu");

	$menu._locked = false;

	$menu._lock = function () {
		if ($menu._locked) return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;
	};

	$menu._show = function () {
		if ($menu._lock()) $body.addClass("is-menu-visible");
	};

	$menu._hide = function () {
		if ($menu._lock()) $body.removeClass("is-menu-visible");
	};

	$menu._toggle = function () {
		if ($menu._lock()) $body.toggleClass("is-menu-visible");
	};

	$menu
		.appendTo($body)
		.on("click", function (event) {
			event.stopPropagation();

			// Hide.
			$menu._hide();
		})
		.find(".inner")
		.on("click", ".close", function (event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			// Hide.
			$menu._hide();
		})
		.on("click", function (event) {
			event.stopPropagation();
		})
		.on("click", "a", function (event) {
			var href = $(this).attr("href");

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 350);
		});

	$body
		.on("click", 'a[href="#menu"]', function (event) {
			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();
		})
		.on("keydown", function (event) {
			// Hide on escape.
			if (event.keyCode == 27) $menu._hide();
		});
})(jQuery);


// Images and videos on index main projects
var projects = [
	[
		"terogue",
		'<img src="images/terogue-logo-2.png" alt="" />',
		'<video width="100%" style="margin-bottom: -3.5%;" autoplay loop muted playsinline> <source src="videos/terogue-1.mp4" type="video/mp4"> </video>'
	],
	[
		"video-fps-increase",
		'<img src="images/video-fps-increase-preview.png" alt="" />',
		'<video width="100%" style="margin-bottom: -3.5%;" autoplay loop muted playsinline> <source src="videos/video-fps-increase-1.mp4" type="video/mp4"> </video>'
	],
	[
		"opengl-projects",
		'<img src="images/solar-system-preview.png" alt="" />',
		'<video width="100%" style="margin-bottom: -3.5%;" autoplay loop muted playsinline> <source src="videos/solar-system-1.mp4" type="video/mp4"> </video>'
	]
]

$(function () {
	projects.forEach(function (project) {
		var id = project[0];
		var imageHTML = project[1];
		var videoHTML = project[2];
		var projectVisuals = document.getElementById(id).getElementsByClassName("image")[0];

		if (window.matchMedia("(pointer: coarse)").matches) { // On touchscreen device, 'hover' doesn't work as I'd like. Directly load the video and forget about the image
			projectVisuals.innerHTML = videoHTML;
		}
		else { // On classic device (with mouse), play with the hover tag
			$("#" + id).hover(
				// Mouse hover = true, load video
				function () { projectVisuals.innerHTML = videoHTML; },
				// Mouse hover = false, load image
				function () { projectVisuals.innerHTML = imageHTML; }
			);
		}
	});
});


// Back to top button smooth scrolling
$(function() {
	document.getElementById("back-to-top-button").onclick = function() {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};
});
