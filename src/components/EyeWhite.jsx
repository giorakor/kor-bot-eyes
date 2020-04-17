import React, { useContext } from "react";

import RealPositionsContext from "../context/RealPositions";
import eyeWhiteImg from "../img/eye-white.png"

const EyeWhite = props => {
  const state = useContext(RealPositionsContext);

  const {
    eyeWidth,
    eyeHeight
  } = state;

  return (
    <div className="eyewhite">
      <img src={eyeWhiteImg} width={eyeWidth} height={eyeHeight}/>
    </div>
  )
}

export default EyeWhite;