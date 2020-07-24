const { init } = require('raspi');
const { Serial } = require('raspi-serial');

const SerialHelper = {};

SerialHelper.init = (options, onMessage) => {
  const { delimiter, messageLength } = options;

  let readBuffer = [];
  let inMessage = false;
  let message = [];

  init(() => {
    const serial = new Serial(options);
    serial.open(() => {
      serial.on('data', data => {
        const newBufferElements = [...data];
        newBufferElements.forEach(element => {
          readBuffer.push(element);

          if (inMessage) {
            message.push(element);
          }

          let found = false;
          if (readBuffer.length >= delimiter.length) {
            found = delimiter.every((val, idx) => val === readBuffer[readBuffer.length - 2 + idx]);
          }
          if (found) {
            inMessage = true;
          }
          if (message.length >= messageLength) {
            onMessage(message);
            inMessage = false;
            message = [];
            readBuffer = [];
          }

          return found;
        });
      });
    });
  });
};

SerialHelper.parseMessage = message => {
  return {
    pitch: (message[0] - 128) / 10,
    yaw: message[1] - 128,
    velocity: (message[2] - 128) / 50,
    dizzy: message[3]
  };
}

module.exports = SerialHelper;