function Parser() {
  this.notifier = new EventNotifier();
  this.state = Parser.STATE.INITIAL;
  this.pos = 0;
  this.buffer = null;
  this.bufferPointer = 0;
  this.frame = new Frame();
}

Parser.prototype.parseBuffer = function (buffer) {
  for (var i = 0; i < buffer.length; i++) {
    if (!this.parse(buffer[i])) {
      break;
    }
  }
  return i;
};

Parser.prototype.parse = function (byte) {
  var parsed = true;
  switch (this.state) {
    case Parser.STATE.EOF_PARSED:
    case Parser.STATE.INITIAL:
      if (byte == Frame.MARK.START) {
        this.state = Parser.STATE.SOF_PARSED;
        this.buffer = new Uint8Array(Parser.CONST.MAX_FRAME_SIZE);
        this.bufferPointer = 0;
      } else {
        parsed = false;
      }
      this.pos = 0;
      break;
    case Parser.STATE.SOF_PARSED:
      if (this.pos++ >= Parser.CONST.X_SIZE) {
        this.state = Parser.STATE.X_PARSED;
        this.pos = 0;
      }
      break;
    case Parser.STATE.X_PARSED:
      if (this.pos++ >= Parser.CONST.Y_SIZE) {
        this.state = Parser.STATE.Y_PARSED;
        this.pos = 0;
      }
      break;
    case Parser.STATE.Y_PARSED:
      if (this.pos++ >= Parser.CONST.Z_SIZE) {
        this.state = Parser.STATE.Z_PARSED;
        this.pos = 0;
      }
      break;
    case Parser.STATE.Z_PARSED:
      this.state = Parser.STATE.FLAGS_PARSED;
      this.pos = 0;
      break;
    case Parser.STATE.FLAGS_PARSED:
      if (this.pos++ >= Parser.CONST.TIME_SIZE) {
        this.state = Parser.STATE.TIME_PARSED;
        this.pos = 0;
      }
      break;
    case Parser.STATE.TIME_PARSED:
      if (byte == Frame.MARK.END) {
        this.state = Parser.STATE.EOF_PARSED;
        this.notifyFrameWasParsed();
      } else {
        parsed = false;
      }
      break;
  }
  if (parsed) {
    this.buffer[this.bufferPointer++] = byte;
  }
  return parsed;
};

Parser.prototype.notifyFrameWasParsed = function() {
  this.makeFrame();
  this.notifier.notifyEvent(Parser.EVENT.FRAME_PARSED, this.frame);
};

Parser.prototype.makeFrame = function () {
  this.frame.setX(Util.readInt16(this.buffer, Parser.POS.X_POS));
  this.frame.setY(Util.readInt16(this.buffer, Parser.POS.Y_POS));
  this.frame.setZ(Util.readInt16(this.buffer, Parser.POS.Z_POS));
  this.frame.setFlags(this.buffer[Parser.POS.FLAGS_POS]);
  this.frame.setTime(Util.readUint32(this.buffer, Parser.POS.TIME_POS));
};

Parser.prototype.addEventListener = function (event, listener) {
  this.notifier.addEventListener(event, listener);
};

Parser.CONST = {
  X_SIZE: 2,
  Y_SIZE: 2,
  Z_SIZE: 2,
  TIME_SIZE: 4,
  MAX_FRAME_SIZE: 1 + 2 + 2 + 2 + 1 + 4 + 1
};

Parser.EVENT = {
  FRAME_PARSED: 0x00
};

Parser.POS = {
  X_POS: 1,
  Y_POS: 3,
  Z_POS: 5,
  FLAGS_POS: 7,
  TIME_POS: 8
};

Parser.STATE = {
  INITIAL: 0x00,
  SOF_PARSED: 0x01,
  X_PARSED: 0x02,
  Y_PARSED: 0x03,
  Z_PARSED: 0x04,
  FLAGS_PARSED: 0x05,
  TIME_PARSED: 0x06,
  EOF_PARSED: 0x07
};