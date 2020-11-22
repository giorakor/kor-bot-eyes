/* Controls scheme:
  [
    // toplid:
    x1, y1, x2, y2,
    // bottomlid:
    x1, y1, x2, y2
  ]
*/

const MODES = {
  BLINK:
  {
    controls: [0.75, 0.9, 0.25, 0.9, 0.75, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: 20,
    elevation: -20,
    shakeSpeed: 1
  },
  NORMAL:
  {
    controls: [0.7, 0.3, 0.3, -0.15, 0.6, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: 0,
    elevation: 10,
    shakeSpeed: 1
  },
  SNAKE:
  {
    controls: [0.50, 0.6, 0.30, 0.6, 0.58, 0.8, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: -5,
    elevation: -30,
    shakeSpeed: 1
  },
  MAD:
  {
    controls: [0.71, 0.0, 0.30, 0.7, 0.58, 0.8, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: 10,
    elevation: -20,
    shakeSpeed: 1
  },
  WORRIED:
  {
    controls: [0.7, 0.7, 0.30, -0.4, 0.58, 0.7, 0.25, 0.7, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: 10,
    elevation: 40,
    shakeSpeed: 5
  },
  SHOCK:
  {
    controls: [
      0.9, -0.1, 0.1, -0.1,
      0.85, 1.1, 0.15, 1.1,
      0, 0.5, 0, 0.5, 0, 0.5],
    squint: -10,
    elevation: 10,
    shakeSpeed: 1
  },
  default:
  {
    controls: [0.7, 0.3, 0.3, -0.1, 0.6, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
    squint: 20,
    elevation: 10,
    shakeSpeed: 1
  }
}

const clone = obj => JSON.parse(JSON.stringify(obj));

const getMode = mode => clone(!!MODES[mode] ? MODES[mode] : MODES.default);
