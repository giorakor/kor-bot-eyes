import React, { useContext } from "react";

import U from "../utils";
import Modes from "../modes";
import RealPositionsContext from "../context/RealPositions";
import EyeWhite from "./EyeWhite";
import Eyelids from "./Eyelids";
import Pupil from "./Pupil";

const Eye = props => {
  const state = useContext(RealPositionsContext);

  const {
    pos,
    type
  } = props;

  const isRight = type === "R";

  const {
    rightPupilPos,
    leftPupilPos,
    leftEyeMode,
    rightEyeMode
  } = state;

  const style = {
    left: U.px(pos.x),
    top: U.px(pos.y)
  }

  const mode = isRight ? rightEyeMode : leftEyeMode;

  const {
    squint,
    elevation
  } = Modes(mode);

  const prevMode = Modes(state.beforeBlink);

  return (
    <div className="eye" style={style}>
      <EyeWhite/>
      <Pupil
        squint={isRight ? squint : -squint}
        pos={isRight ? rightPupilPos : leftPupilPos}
        elevation={state.blinking ? prevMode.elevation : elevation }
      />
      <Eyelids type={type} mode={mode}/>
    </div>
  );
}

export default Eye;