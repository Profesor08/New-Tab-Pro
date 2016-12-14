
var FlyingThroughTheSpace = function(element_id, options)
{

	var defaultOptions = {
		speed: 1,
		count: 10,
		size: 2,
		background: 'rgba(0, 0, 0, 1)',
		backgroundOpacity: 'rgba(0, 0, 0, 1)',
		verticalScale: 4,
		horizontalScale: 4,
		distance: 12,
		colors: [
			"#9BB0FF",
			"#AABFFF",
			"#C8D6FD",
			"#F8F7FD",
			//"#FCFFD4",
			//"#FEF4EA",
			//"#FFF3A1",
			//"#FED2A3",
			//"#FFA350",
			//"#FECB72",
			//"#FF5E53"
		]
	};

	if (options !== null)
	{
		for (var prop in defaultOptions)
		{
			if (defaultOptions.hasOwnProperty(prop))
			{
				if (!options.hasOwnProperty(prop))
				{
					options[prop] = defaultOptions[prop];
				}
			}
		}
	}

	var canvas = document.querySelector(element_id);

	var ctx = canvas.getContext("2d");

	var halfHorizontal, halfVertical;

	var stars = [];

	var run = true;

	var rand = function (min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var getColor = function()
	{
		return options.colors[rand(0, options.colors.length - 1)];
	};

	var Star = function()
	{

		this.reset = function() 
		{
			this.x = rand(-canvas.width * options.horizontalScale, canvas.width * options.horizontalScale);
			this.y = rand(-canvas.height * options.verticalScale, canvas.height * options.verticalScale);
			this.z = rand(1, options.distance);
			this.color = getColor();
		};

		this.draw = function()
		{

			this.z -= options.speed;

			let x = this.x / this.z;
			let y = this.y / this.z;
			let x2 = this.x / (this.z + options.speed * 0.50);
			let y2 = this.y / (this.z + options.speed * 0.50);

			ctx.strokeStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y2);
			ctx.stroke();

			if (x < -halfHorizontal || x > halfHorizontal || y < -halfVertical || y > halfVertical)
			{
				this.reset();
			}
		};

		this.reset();
	};

	this.updateCanvasSize = function()
	{
		canvas.width = canvas.parentNode.offsetWidth;
		canvas.height = canvas.parentNode.offsetHeight;
		halfHorizontal = canvas.width / 2;
		halfVertical = canvas.height / 2;
		ctx.fillStyle = options.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	this.start = function()
	{
		this.run = true;
		this.draw();
	};

	this.stop = function()
	{
		this.run = false;

		for(var i = 0; i < stars.length; i++)
		{
			stars[i].reset();
		}
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = options.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	this.pause = function()
	{
		this.run = false;
	};

	this.draw = function()
	{
		if (this.run)
		{
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = options.backgroundOpacity;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.translate(canvas.width / 2, canvas.height / 2);

			for(var i = 0; i < stars.length; i++)
			{
				stars[i].draw();
			}

			window.requestAnimationFrame(() => this.draw());
		}
	};

	this.updateCanvasSize();

	for(var i = 0; i < options.count; i++)
	{
		stars.push(new Star());
	}
	
	window.addEventListener("resize", () => this.updateCanvasSize());
};


