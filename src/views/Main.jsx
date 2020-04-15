import React, { useContext, useState, useReducer, useEffect } from "react";

import U from "../utils";
import mainReducer from "./mainReducer";
import { useActions } from "./mainActions";
import PositionsContext from "../context/Positions";
import Eye from "../components/Eye";

const initialPositions = {
  screenWidth: 1280,
  screenHeight: 800,
  eyesDistance: 60,
  eyeWidth: 600,
  eyeHeight: 400,
  eyesY: 150,
  rightPupilPos: {
    x: 0,
    y: 0
  },
  leftPupilPos: {
    x: 0,
    y: 0
  },
  randomMoveAmount: 0,
  rightEyeMode: "NORMAL",
  leftEyeMode: "NORMAL",
  transTime: 0.5
}

const modes = ["SNAKE", "SHOCK", "NORMAL", "WORRIED", "MAD"];
const Main = props => {
  const [state, dispatch] = useReducer(mainReducer, initialPositions);
  const actions = useActions(dispatch);

  const {
    screenWidth,
    screenHeight,
    eyesDistance,
    eyeWidth,
    eyesY
  } = state;

  const style = {
    width: U.px(screenWidth),
    height: U.px(screenHeight),
  };

  const firstEyePos = {
    x: screenWidth / 2 - eyeWidth - eyesDistance / 2,
    y: eyesY
  };

  const secondEyePos = {
    x: screenWidth / 2 + eyesDistance / 2 ,
    y: eyesY
  };

  useEffect(() => {
    actions.lookTo({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const idleInterval = setInterval(() => {
      actions.setRandomAmount({
        x: parseInt(200*Math.random()) - 100,
        y: parseInt(50*Math.random()) - 25,
      });
    }, 700);

    const blinkInterval = setInterval(() => {
      if (Math.random()*10 > 8) {
        actions.blink("BLINK", 0.2);
      }
    }, 800);

    const stateInterval = setInterval(() => {
      const mode = modes[Math.floor(4*Math.random())];
      actions.setMode(mode, 0.4);
    }, 2500);

    return (() => {
      clearInterval(idleInterval);
      clearInterval(blinkInterval);
      clearInterval(stateInterval);
    });
  }, []);

  return (
    <div {...props} style={style}>
      <PositionsContext.Provider value={[state, dispatch]}>
        <Eye type="R" pos={firstEyePos}/>
        <Eye type="L" pos={secondEyePos}/>
      </PositionsContext.Provider>
      {/* <button onClick={() => actions.lookTo({ x: -50, y: 0 })}>right</button>
      <button onClick={() => actions.lookTo({ x: 50, y: 0 })}>left</button>
      <button onClick={() => actions.setMode("NORMAL", 0.2)}>normal</button>
      <button onClick={() => actions.setMode("BLINK", 0.2)}>blink</button>
      <button onClick={() => actions.setMode("SNAKE", 0.3)}>snake</button>
      <button onClick={() => actions.setMode("MAD", 0.3)}>mad</button>
      <button onClick={() => actions.setMode("SHOCK", 0.3)}>shock</button>
      <button onClick={() => actions.setMode("WORRIED", 0.3)}>worried</button> */}
    </div>
  );
}

export default Main;