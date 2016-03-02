function Util() {
}

Util.bufferToArrayBuffer = function (buffer) {
  var buf = new ArrayBuffer(buffer.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < buffer.length; i++) {
    bufView[i] = buffer[i];
  }
  return buf;
};

Util.stringToArrayBuffer = function (string) {
  var buf = new ArrayBuffer(string.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < string.length; i++) {
    bufView[i] = string.charCodeAt(i);
  }
  return buf;
};

Util.areArraysEqual = function (a0, a1) {
  return JSON.stringify(a0) == JSON.stringify(a1);
};

Util.readInt16 = function (buffer, pos) {
  var bytes = buffer.slice(pos, pos + 2);
  return new Int16Array(bytes.reverse().buffer)[0];
};

Util.readUint32 = function (buffer, pos) {
  return new Uint32Array(buffer.buffer.slice(pos, pos + 4))[0];
};

Util.normalize = function (graphHeight, value) {
  return (graphHeight - ((value + 32768) * (graphHeight/65535)));
};

Util.normalize = function (graphHeight, value) {
  return (graphHeight - ((value + 32768) * (graphHeight/65535)));
};

Util.normalizeTime = function (graphWidth, value) {
  return (value / 20) % graphWidth;
};
