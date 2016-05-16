function Plotter(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.colors = {
    a: '#00ffff',
    b: '#ff00ff',
    c: '#ffff00',
    x: '#ff0000',
    y: '#00ff00',
    z: '#0000ff',
    flags: {
      one: '#fb05ff',
      two: '#ffffff',
      three: '#ffffff',
      four: '#ffffff'
    },
    time: '#aaaaaa'
  };
  this.resetPreviousPositions();
  this.clearCanvas();
}

Plotter.prototype.resetPreviousPositions = function () {
  this.previous = {
    a: {
      value: 0,
      time: 0
    },
    b: {
      value: 0,
      time: 0
    },
    c: {
      value: 0,
      time: 0
    },
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

Plotter.prototype.plotA = function (time, a) {
  a = Util.normalize(this.canvas.height, a);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.a.time, time, this.previous.a.value, a, this.colors.a);
  this.previous.a = {
    time: time,
    value: a
  };
};

Plotter.prototype.plotB = function (time, b) {
  b = Util.normalize(this.canvas.height, b);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.b.time, time, this.previous.b.value, b, this.colors.b);
  this.previous.b = {
    time: time,
    value: b
  };
};

Plotter.prototype.plotC = function (time, c) {
  c = Util.normalize(this.canvas.height, c);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.c.time, time, this.previous.c.value, c, this.colors.c);
  this.previous.c = {
    time: time,
    value: c
  };
};

Plotter.prototype.plotX = function (time, x) {
  x = Util.normalize(this.canvas.height, x);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.x.time, time, this.previous.x.value, x, this.colors.x);
  this.previous.x = {
    time: time,
    value: x
  };
};

Plotter.prototype.plotY = function (time, y) {
  y = Util.normalize(this.canvas.height, y);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.y.time, time, this.previous.y.value, y, this.colors.y);
  this.previous.y = {
    time: time,
    value: y
  };
};

Plotter.prototype.plotZ = function (time, z) {
  z = Util.normalize(this.canvas.height, z);
  time = Util.normalizeTime(this.canvas.width, time);
  this.plotContinuousSample(this.previous.z.time, time, this.previous.z.value, z, this.colors.z);
  this.previous.z = {
    time: time,
    value: z
  };
};

Plotter.prototype.plotFlags = function (time, flags) {
  if (flags & 0x01 > 0) {
    time = Util.normalizeTime(this.canvas.width, time);
    this.plotDiscreteSample(time, this.colors.flags.one);
  }
};

Plotter.prototype.plotTime = function (time) {
};

Plotter.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (var i = 50; i < this.canvas.width; i += 50) {
    this.ctx.beginPath();
    this.ctx.moveTo(i, 0);
    this.ctx.lineTo(i, this.canvas.height);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.stroke();
  }
  var part = this.canvas.height / 16;
  for (var i = part; i < this.canvas.height; i += part) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, i);
    this.ctx.lineTo(this.canvas.width, i);
    this.ctx.strokeStyle = (i == this.canvas.height / 2) ? '#aaaaaa' : '#ffffff';
    this.ctx.stroke();
  }
};

Plotter.prototype.plotDiscreteSample = function (time, color) {
  this.ctx.beginPath();
  this.ctx.moveTo(time, 0);
  this.ctx.lineTo(time, this.canvas.height);
  this.ctx.strokeStyle = color;
  this.ctx.stroke();
};

Plotter.prototype.plotContinuousSample = function (previousTime, time, previous, current, color) {
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
