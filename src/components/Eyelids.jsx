import _ from "lodash";
import React, { useContext, useState, useEffect } from "react";

import PositionsContext from "../context/Positions";
import { useActions } from "../views/mainActions";

const getControlsText = (cAX, cAY, cBX, cBY) => {
  return `C ${cAX} ${cAY} , ${cBX} ${cBY}`;
}

const getControls = mode => {
  switch (mode) {
    case "NORMAL":
      return [0.7, 0.3, 0.3, -0.1, 0.6, 0.9, 0.25, 0.9];

    case "BLINK":
      return [0.75, 0.9, 0.25, 0.9, 0.75, 0.9, 0.25, 0.9];

    case "SNAKE":
      return [0.50, 0.6, 0.30, 0.6, 0.58, 0.8, 0.25, 0.9];

    case "MAD":
      return [0.71, 0.0, 0.30, 0.7, 0.58, 0.8, 0.25, 0.9];

    case "WORRIED":
      return [0.59, 0.6, 0.30, -0.4, 0.58, 0.7, 0.25, 0.7];

    case "SHOCK":
      return [0.75, -0.3, 0.25, -0.3, 0.75, 1, 0.25, 1];

    default:
      return [0.7, 0.3, 0.3, -0.1, 0.6, 0.9, 0.25, 0.9];
  }
}

const reachedControls = (destControls, controls) => {
  return _.every(destControls, (control, key) =>
    Math.abs(control - controls[key]) < 0.01
  );
}

const frameRate = 24;
const intervalTime = parseInt((1 / frameRate) * 1000)

const EyeLid = props => {
  const [state, dispatch] = useContext(PositionsContext);
  const actions = useActions(dispatch);

  const {
    type
  } = props;
  const isRight = type === "R";

  const {
    eyeWidth,
    eyeHeight,
    leftEyeMode,
    rightEyeMode,
    transTime
  } = state;

  const mode = isRight ? rightEyeMode : leftEyeMode;

  const [controls, setControls] = useState(getControls(mode));

  useEffect(() => {
    if (state.blinking && (state.leftEyeMode !== "BLINK" || state.rightEyeMode !== "BLINK")) {
      return;
    }
    const destControls = getControls(mode);
    const controlSteps = _.map(destControls, (val, key) =>
      (val - controls[key]) / (transTime * frameRate)
    );

    let counter = 0;
    const animationInterval = setInterval(() => {
      counter += 1;
      setControls(() => {
        if (counter >= frameRate * transTime) {
          clearInterval(animationInterval);
          if (state.blinking) {
            actions.stopBlink();
          }
          return destControls;
        }

        return controlSteps.map((step, key) => controls[key] + counter*step);
      });
    } , intervalTime);

    return () => {
      clearInterval(animationInterval);
    }
  }, [mode]);

  const startingX = 0;
  const startingY = eyeHeight / 2;

  const transform = isRight ?
    `scale(-1, 1) translate(-${eyeWidth}, 0)`
    : "";

  return (
    <svg className="absolute" width={eyeWidth} height={eyeHeight}>
      <path
        d={`
          M ${startingX} ${0}
          H ${eyeWidth}
          V ${startingY}
          ${getControlsText(
            eyeWidth*controls[0], eyeHeight*controls[1],
            eyeWidth*controls[2], eyeHeight*controls[3]
          )}
          , ${startingX} ${startingY}
        `}
        transform={transform}
        stroke="black"
        fill="black"
      />
      <path
        d={`
          M ${startingX} ${eyeHeight}
          H ${eyeWidth}
          V ${startingY}
          ${getControlsText(
            eyeWidth*controls[4], eyeHeight*controls[5],
            eyeWidth*controls[6], eyeHeight*controls[7]
          )}
          , ${0} ${startingY}
        `}
        transform={transform}
        stroke="black"
        fill="black"
      />
    </svg>
  )
}

export default EyeLid;