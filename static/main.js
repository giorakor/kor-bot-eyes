const { ipcRenderer } = require("electron")

// Constants to use as right/left choose
const LEFT = false;
const RIGHT = true;
const BLINK_MODE = "BLINK";

// Animation constants
const frameRate = 30;
const intervalTime = (1 / frameRate) * 1000;

// Images paths
const eyeWhiteImg = "./eye-white.png";
const pupilImg = "./pupil.png";

const screenWidth = 1000;
const screenHeight = 576;
const eyesDistance = 70;
const eyeWidth = 450;
const eyeHeight = 400;
const pupilWidth = 700;
const pupilHeight = 450;
const eyesY = 100;
const rightPupilOffset = {
  x: -55,
  y: 0
};
const leftPupilOffset = {
  x: -55,
  y: 0
};

let rightPupilPos = clone(rightPupilOffset);
let leftPupilPos = clone(leftPupilOffset);
let randomMoveAmount = {
  x: 0,
  y: 0
};
let rightEyeMode = "NORMAL";
let leftEyeMode = "NORMAL";
let rightBeforeBlink = "NORMAL";
let leftBeforeBlink = "NORMAL";
let leftState = getMode("NORMAL");
let rightState = getMode("NORMAL");
let blinking = false;
let modeTransTime = 0.5;

const stopBlink = transTime => {
  leftEyeMode = leftBeforeBlink;
  rightEyeMode = rightBeforeBlink;
  modeTransTime = transTime;
  blinking = false;
}

const blink = transTime => {
  leftBeforeBlink = leftEyeMode;
  rightBeforeBlink = rightEyeMode;
  leftEyeMode = BLINK_MODE;
  rightEyeMode = BLINK_MODE;
  modeTransTime = transTime;
  blinking = true;
}

const lookTo = (x, y) => {
  rightPupilPos = { x: x + rightPupilOffset.x , y: y + rightPupilOffset.y };
  leftPupilPos = { x: x + leftPupilOffset.x , y: y + leftPupilOffset.y };
}

const createEyeLids = isRight => {
  let eyeState = isRight ? leftState : rightState;
  const mode = isRight ? rightEyeMode : leftEyeMode;

  eyeState.controls = getMode(mode).controls;

  const startingX = 0;
  const startingY = eyeHeight / 2;

  const transform = createLIdSvgTransform(isRight, eyeWidth);

  const { controls } = eyeState;

  return createLidSvg(startingX, startingY, controls, eyeWidth, eyeHeight, transform);
}

const updateEyeLids = (isRight, domElement) => {
  let eyeState = isRight ? leftState : rightState;
  const pupilPos = isRight ? rightPupilPos : leftPupilPos;
  const center = [eyeWidth / 2, eyeHeight / 2];

  const mode = isRight ? rightEyeMode : leftEyeMode;

  const destModeControls = getMode(mode).controls;

  const destPupilControls = eyeState.controls.map((__, key) => {
    const factor = key > 7 ? 8e-7 : 1e-6;
    const idx = Object.keys(pupilPos)[key % 2];
    const diff = pupilPos[idx] + randomMoveAmount[idx] - center[key % 2];
    const flipX = isRight && idx === "x" ? 1 : -1;
    const sizeNormal = idx === "x" ? eyeWidth : eyeHeight;
    return (sizeNormal * flipX * factor * diff);
  });

  const destControls = destModeControls;

  const controlsSteps = destControls.map((val, key) =>
    (val - eyeState.controls[key]) / (modeTransTime * frameRate)
  );

  if (modeTransTime <= intervalTime / 1000) {
    if (blinking) {
      stopBlink(0.3);
    }

    eyeState.controls = destControls;
  } else {
    eyeState.controls = controlsSteps.map((step, key) =>
      eyeState.controls[key] + step
    );
  }

  const startingX = 0;
  const startingY = eyeHeight / 2;

  const transform = createLIdSvgTransform(isRight, eyeWidth);

  const { controls } = eyeState;

  domElement.innerHTML =
    createLidSvg(startingX, startingY, controls, eyeWidth, eyeHeight, transform);
}

const createPupil = isRight => {
  const pos = isRight ? leftPupilPos : rightPupilPos;
  const mode = isRight ? rightEyeMode : leftEyeMode;

  const {
    squint: modeSquint,
    elevation
  } = getMode(mode);

  const squint = isRight ? modeSquint : -modeSquint;

  return createPupilHtml(pos, squint, elevation, pupilWidth, pupilHeight, pupilImg, randomMoveAmount)
}

const updatePupil = (isRight, domElement) => {
  const pos = isRight ? leftPupilPos : rightPupilPos;
  const mode = isRight ? rightEyeMode : leftEyeMode;

  const {
    squint: modeSquint,
    elevation
  } = getMode(mode);

  const squint = isRight ? modeSquint : -modeSquint;

  const style = createPupilStyle(pos, squint, elevation, randomMoveAmount);

  if (domElement.style !== style) {
    domElement.style = style;
  }
}

const createEyes = () => {
  const mainStyle = `
    width: ${px(screenWidth)};
    height: ${px(screenHeight)};
  `;

  const rightEyePos = {
    x: screenWidth / 2 - eyeWidth - eyesDistance / 2,
    y: eyesY
  };

  const leftEyePos = {
    x: screenWidth / 2 + eyesDistance / 2 ,
    y: eyesY
  };

  const eye = `
    <div /class="eyewhite">
      <img src=${eyeWhiteImg} width=${eyeWidth} height=${eyeHeight}/>
    </div>
    <div class="pupil"></div>
    <div class="eyelids"></div>
  `;

  return (`
    <div class="main-screen" style="${mainStyle}">
      <div id="right-eye" class="eye" style="${createEyeStyle(rightEyePos)}">
        ${eye}
      </div>
      <div id="left-eye" class="eye" style="${createEyeStyle(leftEyePos)}">
        ${eye}
      </div>
      <svg style="z-index: 100; position: absolute; left: 0; top: 0;" width=${screenWidth} height=${screenHeight}>
        <rect x=${(screenWidth- eyesDistance) / 2} width=${eyesDistance + 1} height=${screenHeight} fill="black"/>
        <rect width=${screenWidth} height=${eyesY} fill="black"/>
        <rect width=${(screenWidth - eyesDistance)/2 - eyeWidth + 1} height=${screenHeight} fill="black"/>
        <rect x=${(screenWidth + eyesDistance) / 2 + eyeWidth} width=${(screenWidth - eyesDistance)/2 - eyeWidth} height=${screenHeight} fill="black"/>
        <rect y=${eyesY + eyeHeight} width=${screenWidth} height=${screenHeight - eyesY - eyeHeight} fill="black"/>
      </svg>
    </div>
  `);
}

const setMode = (mode, trans=0.3) => {
  leftEyeMode = mode;
  rightEyeMode = mode;
  modeTransTime = trans;
}

const $root = document.querySelector("#root");
$root.innerHTML = createEyes();

const $rightPupil = document.querySelector("#right-eye .pupil");
const $rightLids = document.querySelector("#right-eye .eyelids");
const $leftPupil = document.querySelector("#left-eye .pupil");
const $leftLids = document.querySelector("#left-eye .eyelids");

$rightPupil.innerHTML = createPupil(RIGHT);
$rightLids.innerHTML = createEyeLids(RIGHT);
$leftPupil.innerHTML = createPupil(LEFT);
$leftLids.innerHTML = createEyeLids(LEFT);

setInterval(() => {
  modeTransTime = Math.max(modeTransTime - intervalTime / 1000, 0);

  updatePupil(RIGHT, $rightPupil);
  updatePupil(LEFT, $leftPupil);
  updateEyeLids(RIGHT, $rightLids);
  updateEyeLids(LEFT, $leftLids);
}, intervalTime);

const modes = Object.keys(MODES);

// Idle interval
setInterval(() => {
  if (Math.random() > 0.3) {
    randomMoveAmount = {
      x: parseInt(60*Math.random()) - 30,
      y: parseInt(20*Math.random()) - 10,
    };
  }
}, 700);

// Blink interval
setInterval(() => {
  if (Math.random()*10 > 8) {
    blink(0.15);
  }
}, 1000);

// Mode switch interval
setInterval(() => {
  const mode = modes[Math.floor(modes.length*Math.random())];
  if (mode === BLINK_MODE) return;
  setMode(mode, 0.3);
}, 5000);

ipcRenderer.on("data", data => {
  const { pitch, yaw } = data;
  console.log(pitch, yaw);
  console.log(rightEyePos);
  console.log(randomMoveAmount);
  const yMove = constrain(pitch * 20, -50, 50);
  const xMove = constrain(-1 * yaw * 2, -100, 100);
  lookTo(xMove, yMove);
});
