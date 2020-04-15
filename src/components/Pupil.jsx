import React, { useState, useEffect, useCallback, useContext } from "react";

import U from "../utils";
import PositionsContext from "../context/Positions";
import { useActions } from "../views/mainActions";
import pupilImg from "../img/pupil.png"

const width = 250;
const height = 250;

const Pupil = props => {
  const [state, dispatch] = useContext(PositionsContext);

  const {
    pos
  } = props;

  const innerStyle = {
    left: - width / 2,
    top: - height / 2
  }

  const style = {
    left: U.px(pos.x + state.randomMoveAmount.x),
    top: U.px(pos.y + state.randomMoveAmount.y)
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