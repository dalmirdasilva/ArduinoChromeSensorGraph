function Plotter(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.colors = {
    x: '#ff0000',
    y: '#00ff00',
    z: '#0000ff',
    flags: '#ffffff',
    time: '#aaaaaa'
  };
  this.resetPreviousPositions();
}

Plotter.prototype.resetPreviousPositions = function () {
  this.previous = {
    x: {
      value: 0,
      time: 0
    },
    y: {
      value: 0,
      time: 0
    },
    z: {
      value: 0,
      time: 0
    },
    flags: 0,
    time: 0
  };
};

Plotter.prototype.plotX = function (time, x) {
  x = Util.normalize(this.canvas.height, x);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plot(this.previous.x.time, time, this.previous.x.value, x, this.colors.x);
  this.previous.x = {
    time: time,
    value: x
  };
};

Plotter.prototype.plotY = function (time, y) {
  y = Util.normalize(this.canvas.height, y);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plot(this.previous.y.time, time, this.previous.y.value, y, this.colors.y);
  this.previous.y = {
    time: time,
    value: y
  };
};

Plotter.prototype.plotZ = function (time, z) {
  z = Util.normalize(this.canvas.height, z);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plot(this.previous.z.time, time, this.previous.z.value, z, this.colors.z);
  this.previous.z = {
    time: time,
    value: z
  };
};

Plotter.prototype.plotFlags = function (flags) {
};

Plotter.prototype.plotTime = function (time) {
};

Plotter.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Plotter.prototype.plot = function(previousTime, time, previous, current, color) {
  if (previousTime > time) {
    this.clearCanvas();
    previousTime = 0;
  }
  this.ctx.beginPath();
  this.ctx.moveTo(previousTime, previous);
  this.ctx.lineTo(time, current);
  this.ctx.strokeStyle = color;
  this.ctx.stroke();
};