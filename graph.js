function Graph(width, height) {
  this.width = width;
  this.height = height;
}

Graph.prototype.initComponents = function () {
  this.canvas = document.getElementById("canvas");
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.plotter = new Plotter(this.canvas);
  this.parser = new Parser();
  this.parser.addEventListener(Parser.EVENT.FRAME_PARSED, {notify: this.notifyFrameParsed.bind(this)});
};

Graph.prototype.notify = function (buffer) {
  this.parser.parseBuffer(buffer);
};

Graph.prototype.notifyPortStateChange = function (newState) {
  if (newState == SerialPort.STATE.CONNECTED) {
    this.initComponents();
  }
};

Graph.prototype.notifyFrameParsed = function (frame) {
  this.plotFrame(frame);
};

Graph.prototype.plotFrame = function (frame) {
  this.plotter.plotX(frame.getTime(), frame.getX());
  this.plotter.plotY(frame.getTime(), frame.getY());
  this.plotter.plotZ(frame.getTime(), frame.getZ());
  this.plotter.plotFlags(frame.getTime(), frame.getFlags());
  this.plotter.plotTime(frame.getTime());
};
