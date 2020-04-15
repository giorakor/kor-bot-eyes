import React, { useContext } from "react";

import PositionsContext from "../context/Positions";
import eyeWhiteImg from "../img/eye-white.png"

const EyeWhite = props => {
  const [state, dispatch] = useContext(PositionsContext);

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