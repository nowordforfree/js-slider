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
	this.animate = function (options, callback) {
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
			} else {
				callback();
			}
		});
	}
	this.updateimgs = function() {
		for (var i = -1; i < 2; i++) {
			var img = document.createElement('img');
			img.style.width = (100 / 3) + '%';
			img.style.left = i * (100 / 3) + '%';
			if (this.current === 0 && i < this.current) {
				img.src = 'img/' + this.images[this.images.length + i];
			}
			else if (this.current === this.images.length - 1 && i > 0) {
				img.src = 'img/' + this.images[0];	
			}
			else {
				img.src = 'img/' + this.images[this.current + i];
			}
			if (this.body.childNodes[i + 1]) {
				if (this.body.childNodes[i + 1].src !== img.src) {
					this.body.replaceChild(img, this.body.childNodes[i + 1]);
				}
			} else {
				this.body.appendChild(img);
			}
		}
	}
	this.updateimgs();

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
				self.body.style.left = -(offset * progress) + 'px';
			}
		}, function () {
			self.current = self.current < self.images.length - 1 ? self.current + 1 : 0;
			self.updateimgs();
			self.body.style.left = '0px';
		});
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