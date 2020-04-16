import _ from "lodash";
import React, { useContext, useState, useEffect } from "react";

import Modes from "../modes";
import PositionsContext from "../context/Positions";
import { useActions } from "../views/mainActions";

const getControlsText = (cAX, cAY, cBX, cBY) => {
  return `C ${cAX} ${cAY} , ${cBX} ${cBY}`;
}

const frameRate = 24;
const intervalTime = parseInt((1 / frameRate) * 1000)

const EyeLid = props => {
  const [state, dispatch] = useContext(PositionsContext);
  const actions = useActions(dispatch);

  const {
    mode,
    type
  } = props;

  const {
    eyeWidth,
    eyeHeight,
    rightPupilPos,
    leftPupilPos,
    randomMoveAmount,
    transTime,
    blinking
  } = state;

  const isRight = type === "R";

  const pos = isRight ? rightPupilPos : leftPupilPos;
  const center = [eyeWidth/2, eyeHeight/2];

  const [controls, setControls] = useState(Modes(mode).controls);

  useEffect(() => {
    const destControls = Modes(mode).controls.map((control, key) => {
      const factor = key > 7 ? 8e-7 : 1e-6
      const idx = Object.keys(pos)[key % 2];
      const diff = pos[idx] + randomMoveAmount[idx] - center[key%2];
      const flipX = isRight && idx === "x" ? 1 : -1;
      const sizeNormal = idx === "x" ? eyeWidth : eyeHeight;
      return control - sizeNormal * flipX *  factor * diff;
    });

    const controlSteps = _.map(destControls, (val, key) =>
      (val - controls[key]) / (transTime * frameRate)
    );

    let counter = 0;
    const animationInterval = setInterval(() => {
      counter += 1;
      setControls(() => {
        if (counter >= frameRate * transTime) {
          clearInterval(animationInterval);
          if (blinking) {
            actions.stopBlink();
          }
          return destControls;
        }

        return controlSteps.map((step, key) => controls[key] + counter * step);
      });
    } , intervalTime);

    return () => {
      clearInterval(animationInterval);
    }
  }, [mode, pos, randomMoveAmount]);

  const startingX = 0;
  const startingY = eyeHeight / 2;

  const transform = isRight ?
    `scale(-1, 1) translate(-${eyeWidth}, 0)`
    : "";

  return (
    <svg className="spline absolute blur" width={eyeWidth} height={eyeHeight}>
      <path
        d={`
          M ${startingX} ${0}
          H ${eyeWidth}
          V ${startingY}
          ${getControlsText(
            eyeWidth*controls[0], eyeHeight*controls[1],
            eyeWidth*controls[2], eyeHeight*controls[3]
          )}
          , ${eyeWidth*controls[8]} ${eyeHeight*controls[9]}
          H ${-eyeWidth}
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
          , ${eyeWidth*controls[10]} ${eyeHeight*controls[11]}
          H ${-eyeWidth}
        `}
        transform={transform}
        stroke="black"
        fill="black"
      />
      <filter id="dropshadow" x="-2" y="-2" width={eyeWidth} height={eyeHeight}>
        <feGaussianBlur  stdDeviation="1"/>
      </filter>
    </svg>
  )
}

export default EyeLid;