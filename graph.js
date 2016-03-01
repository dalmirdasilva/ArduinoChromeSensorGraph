function Graph(width, height) {
  this.width = width;
  this.height = height;
  this.initComponents();
  this.initCanvasContext();
}

Graph.prototype.initComponents = function() {
  this.canvas = document.getElementById("canvas");
};

Graph.prototype.initCanvasContext = function() {
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.context = this.canvas.getContext("2d");
  this.context.lineWidth = 1;
};

Graph.prototype.notify = function(buffer) {
  console.log(buffer);
};

Graph.prototype.parseFrame = function(buffer) {

};
