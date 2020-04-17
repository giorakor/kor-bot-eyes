import React, { useState, useEffect, useCallback, useContext } from "react";

import U from "../utils";
import RealPositionsContext from "../context/RealPositions";
import pupilImg from "../img/pupil.png"

const width = 225;
const height = 225;

const Pupil = props => {
  const state = useContext(RealPositionsContext);

  const {
    pos,
    squint,
    elevation
  } = props;

  const innerStyle = {
    left: - width / 2,
    top: - height / 2
  }

  const style = {
    left: U.px(pos.x + state.randomMoveAmount.x + squint),
    top: U.px(pos.y + state.randomMoveAmount.y - elevation)
  }

  return (
    <div className="pupil" style={style}>
      <img
        className="absolute"
        style={innerStyle}
        src={pupilImg}
        width={width}
        height={height}
      />
    </div>
  )
}

export default Pupil;