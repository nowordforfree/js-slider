document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		document.getElementById('slider').appendChild(new Slider());
	}
}

function Slider () {
	var imgscount = 5;
	this.body = document.createElement('div');
	this.body.className = 'body';
	this.body.style.width = (imgscount * 100) + '%';
	for (var i = 0; i < imgscount; i++) {
		var img = document.createElement('img');
		img.src = 'img/' + (i + 1) + '.jpg';
		img.style.width = (100 / imgscount) + '%';
		img.style.left = i * (100 / imgscount) + '%';
		this.body.appendChild(img);
	}

	this.body.addEventListener('mouseover', function(e) {
		// debugger;
		// if (e.X) {

		// }
	});

	return this.body;
}

function move (elem, pix) {
	setTimeout(function() {
		var left = parseInt(elem.style.left) || 0;
		if (pix > 0) {
			elem.style.left = ++left + 'px';
			pix--;
		} else {
			elem.style.left = --left + 'px';
			pix++;
		}
		if (pix) { move(elem, pix); };
	}, 5);
}