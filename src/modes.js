const Modes = mode => {
  switch(mode) {
    case "NORMAL":
      return {
        controls: [0.7, 0.3, 0.3, -0.1, 0.6, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
        squint: 0,
        elevation: 10,
        shakeSpeed: 1
      }
    case "BLINK":
      return {
        controls: [0.75, 0.85, 0.25, 0.85, 0.75, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5],
        squint: 20,
        elevation: null,
        shakeSpeed: 1
      }
    case "SNAKE":
      return {
        controls: [0.50, 0.6, 0.30, 0.6, 0.58, 0.8, 0.25, 0.9, 0, 0.5, 0, 0.5],
        squint: -20,
        elevation: -80,
        shakeSpeed: 1
      }
    case "MAD":
      return {
        controls: [0.71, 0.0, 0.30, 0.7, 0.58, 0.8, 0.25, 0.9, 0, 0.5, 0, 0.5],
        squint: 40,
        elevation: -50,
        shakeSpeed: 1
      }
    case "WORRIED":
      return {
        controls: [0.59, 0.6, 0.30, -0.4, 0.58, 0.7, 0.25, 0.7, 0, 0.5, 0, 0.5],
        squint: 50,
        elevation: 60,
        shakeSpeed: 5
      }
    case "SHOCK":
      return {
        controls: [0.75, -0.3, 0.25, -0.3, 0.75, 1, 0.25, 1, 0, 0.5, 0, 0.5],
        squint: 0,
        elevation: 40,
        shakeSpeed: 1
      }
    default:
      return {
        controls: [0.7, 0.3, 0.3, -0.1, 0.6, 0.9, 0.25, 0.9, 0, 0.5, 0, 0.5, 0, 0.5],
        squint: 20,
        elevation: 10,
        shakeSpeed: 1
      }
  }
};

export default Modes;