document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		document.getElementById('container').appendChild(new Slider());
	}
}

function Slider (images) {
	this.images = images || ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
	this.current = 0;
	this.html = document.createElement('div');
	this.html.id = 'slider';
	this.html.style.margin = '15px auto';
	this.html.style.width = '95%';
	this.html.style.height = '85%';
	this.html.style.overflow = 'hidden';
	var body = document.createElement('div');
	body.className = 'body';
	body.style.position = 'relative';
	body.style.height = '100%';
	body.style.width = '300%';
	body.style.left = '-100%';
	body.style.minHeight = '350px';
	this.html.appendChild(body);
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
			img.style.position = 'absolute';
			img.style.top = 0;
			img.style.height = '100%';
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
			if (this.html.firstChild.childNodes[i + 1]) {
				if (this.html.firstChild.childNodes[i + 1].src !== img.src) {
					this.html.firstChild.replaceChild(img, this.html.firstChild.childNodes[i + 1]);
				}
			} else {
				this.html.firstChild.appendChild(img);
			}
		}
	}
	var self = this;
	this.interval = carousel(1000, 5000);

	function carousel (speed, timeout) {
		return setInterval(function() {
			var offset = parseInt(getComputedStyle(self.html).width);
			self.animate({
				duration: speed,
				timing: makeEaseInOut(quad),
				draw: function(progress) {
					self.html.firstChild.style.left = -(offset * progress) + 'px';
				}
			}, function () {
				self.current = self.current < self.images.length - 1 ? self.current + 1 : 0;
				self.updateimgs();
				self.html.firstChild.style.left = '-100%';
			});
		}, timeout);
	}

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
	this.updateimgs();

	this.html.firstChild.addEventListener('mouseover', function (e) {
		if (e.target === this) {
			clearInterval(this.interval);
			return false;
		}
	});

	this.html.firstChild.addEventListener('mouseleave', function (e) {
		if (e.target === this) {
			this.interval = carousel(1000, 5000);
			return false;
		}
	})

	return this.html;
}