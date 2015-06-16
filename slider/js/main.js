document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		document.getElementById('slider').appendChild(new Slider());
	}
}

function Slider () {
	this.body = document.createElement('div');
	this.body.className = 'body';
	var img = document.createElement('img');
	img.src = 'img/fallout_4.jpg';
	this.body.appendChild(img);
	return this.body;
}