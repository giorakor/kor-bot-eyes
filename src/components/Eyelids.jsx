import _ from "lodash";
import React, { useContext, useState, useEffect } from "react";

import Modes from "../modes";
import RealPositionsContext from "../context/RealPositions";
import { useActions } from "../views/mainActions";
import { getVContext } from "../VirtualReducer";

const getControlsText = (cAX, cAY, cBX, cBY) => {
  return `C ${cAX} ${cAY} , ${cBX} ${cBY}`;
}

const frameRate = 24;
const intervalTime = parseInt((1 / frameRate) * 1000)

const EyeLid = props => {
  const [vState, dispatch] = getVContext();
  const state = useContext(RealPositionsContext);
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
    leftEyeControls,
    rightEyeControls,
    randomMoveAmount,
    transTime,
    blinking
  } = state;

  const isRight = type === "R";

  const pos = isRight ? rightPupilPos : leftPupilPos;
  const controls = isRight ? leftEyeControls : rightEyeControls;
  const center = [eyeWidth/2, eyeHeight/2];

  useEffect(() => {
    actions.setControls(Modes(mode).controls, isRight);
  }, [])

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
        if (counter >= frameRate * transTime) {
          clearInterval(animationInterval);
          if (blinking) {
            actions.stopBlink(0.3);
          }
          return actions.setControls(destControls, isRight, transTime - intervalTime/1000);
        }

        const newControls = controlSteps.map((step, key) => controls[key] + counter * step);
        actions.setControls(newControls, isRight, transTime - intervalTime/1000);
        return newControls;
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
    <svg style={{ zIndex: 100 }} className="spline absolute blur" width={eyeWidth} height={eyeHeight}>
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
    </svg>
  )
}

export default EyeLid;