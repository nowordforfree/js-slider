document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		document.getElementById('slider').appendChild(new Slider());
	}
}

function Slider () {
	this.images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
	this.current = 0;
	this.body = document.createElement('div');
	this.body.className = 'body';
	this.body.style.width = (this.images.length * 100) + '%';
	var self = this;

	for (var i = 0; i < this.images.length; i++) {
		var img = document.createElement('img');
		img.src = 'img/' + this.images[i];
		img.style.width = (100 / this.images.length) + '%';
		img.style.left = i * (100 / this.images.length) + '%';
		this.body.appendChild(img);
	}

	this.body.addEventListener('mouseover', function(e) {
		// debugger;
		// if (e.X) {

		// }
	});

	setInterval(function() {
		if (self.current < self.images.length) {
			animate(function (timePassed) {
				self.body.style.left = -timePassed + 'px';
			}, 1000);
			self.current++;
		} else {
			animate(function (timePassed) {
				self.body.style.left = '0px';
			}, 1000);
			self.current = 0;
		}
	}, 5000);

	function animate(draw, duration) {
		var start = performance.now();
		requestAnimationFrame(function animate(time) {
			// определить, сколько прошло времени с начала анимации
			var timePassed = time - start;
			// возможно небольшое превышение времени, в этом случае зафиксировать конец
			if (timePassed > duration) { timePassed = duration; };
			// нарисовать состояние анимации в момент timePassed
			draw(timePassed);
			// если время анимации не закончилось - запланировать ещё кадр
			if (timePassed < duration) {
				requestAnimationFrame(animate);
			}
		});
	}

	function delta(progress) {
		return 1 - sin((1 - progress) * П/2);
	}

	// function draw (progress) {
	// 	this.body.style.left = progress + 'px';
	// }

	// function move (elem, pix) {
	// 	var timer = setInterval(function() {
	// 		if (!pix) { clearInterval(timer); };
	// 		var left = parseInt(elem.style.left) || 0;
	// 		if (pix > 0) {
	// 			elem.style.left = ++left + 'px';
	// 			pix--;
	// 		} else {
	// 			elem.style.left = --left + 'px';
	// 			pix++;
	// 		}
	// 	}, 5);
	// }

	// setInterval(function() {
	// 	move(self.body, -850);
	// }, 5000);
	
	return this.body;
}