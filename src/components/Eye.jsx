import React, { useContext } from "react";
import PropTypes from "prop-types"

import U from "../utils";
import PositionsContext from "../context/Positions";
import EyeWhite from "./EyeWhite";
import Eyelids from "./Eyelids";
import Pupil from "./Pupil";

const defaultProps = {
  pos: { x: 0, y: 0 },
  size: 1,
  type: "R",
  pupilPos: { x: 0, y: 0 },
  eyeLidsMode: "NORMAL"
}

const propTypes = {
  pos: PropTypes.object,
  size: PropTypes.number,
  type: PropTypes.string,
  eyeLidsMode: PropTypes.string
}

const Eye = props => {
  const [state, dispatch] = useContext(PositionsContext);

  const {
    pos,
    eyeLidsMode,
    type
  } = props;

  const style = {
    left: U.px(pos.x),
    top: U.px(pos.y)
  }

  return (
    <div className="eye" style={style}>
      <EyeWhite/>
      <Pupil
        pos={type === "R" ? state.rightPupilPos : state.leftPupilPos}
      />
      <Eyelids type={type} mode={eyeLidsMode}/>
    </div>
  );
}

Eye.defaultProps = defaultProps;
Eye.propTypes = propTypes;

export default Eye;