document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		document.getElementById('slider').appendChild(new Slider());
	}
}

function Slider (images) {
	this.images = images || ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
	this.current = 0;
	this.body = document.createElement('div');
	this.body.className = 'body';
	this.body.style.width = '300%';
	this.animate = function (options) {
		var start = performance.now();
		requestAnimationFrame(function animate(time) {
			var timeFraction = (time - start) / options.duration;
			if (timeFraction > 1) {
				timeFraction = 1;
			}
			var progress = options.timing(timeFraction)
			options.draw(progress);
			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	}
	this.updateimgs = function() {
		for (var i = 0; i < 3; i++) {
			var img = document.createElement('img');
			img.src = 'img/' + this.images[this.current];
			img.style.width = (100 / 3) + '%';
			img.style.left = i * (100 / 3) + '%';
			this.body.appendChild(img);
		}
	}

	this.body.addEventListener('mouseover', function(e) {
		// debugger;
		// if (e.X) {

		// }
	});
	var self = this;

	setInterval(function() {
		var offset = parseInt(getComputedStyle(self.body.parentNode).width);
		self.animate({
			duration: 1000,
			timing: makeEaseInOut(quad),
			draw: function(progress) {
				self.body.style.left = offset * progress + 'px';
			}
		});
		self.current++;
	}, 5000);

	function quad (progress) {
		return Math.pow(progress, 2);
	}

	function makeEaseInOut(timing) {
		return function(timeFraction) {
			if (timeFraction < .5)
				return timing(2 * timeFraction) / 2;
			else
				return (2 - timing(2 * (1 - timeFraction))) / 2;
		}
	}

	return this.body;
}