function Frame() {
  this.a = 0;
  this.b = 0;
  this.c = 0;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.flags = 0;
  this.time = 0;
}

Frame.prototype.setA = function (a) {
  this.a = a;
};

Frame.prototype.setB = function (b) {
  this.b = b;
};

Frame.prototype.setC = function (c) {
  this.c = c;
};

Frame.prototype.setX = function (x) {
  this.x = x;
};

Frame.prototype.setY = function (y) {
  this.y = y;
};

Frame.prototype.setZ = function (z) {
  this.z = z;
};

Frame.prototype.setFlags = function (flags) {
  this.flags = flags;
};

Frame.prototype.setTime = function (time) {
  this.time = time;
};

Frame.prototype.getA = function () {
  return this.a;
};

Frame.prototype.getB = function () {
  return this.b;
};

Frame.prototype.getC = function () {
  return this.c;
};

Frame.prototype.getX = function () {
  return this.x;
};

Frame.prototype.getY = function () {
  return this.y;
};

Frame.prototype.getZ = function () {
  return this.z;
};

Frame.prototype.getFlags = function () {
  return this.flags;
};

Frame.prototype.getTime = function () {
  return this.time;
};

Frame.MARK = {
  START: 0xaa,
  END: 0xbb
};