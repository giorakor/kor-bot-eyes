import React, { useContext, useState, useReducer, useEffect } from "react";

import U from "../utils";
import Modes from "../modes";
import mainReducer from "./mainReducer";
import { useActions } from "./mainActions";
import PositionsContext from "../context/Positions";
import Eye from "../components/Eye";

const initialPositions = {
  screenWidth: 1280,
  screenHeight: 800,
  eyesDistance: 70,
  eyeWidth: 550,
  eyeHeight: 500,
  eyesY: 100,
  rightPupilPos: {
    x: 0,
    y: 0
  },
  leftPupilPos: {
    x: 0,
    y: 0
  },
  randomMoveAmount: {
    x: 0,
    y: 0
  },
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

  const {
    shakeSpeed
  } = Modes(state.leftEyeMode);

  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        actions.setRandomAmount({
          x: parseInt(70*Math.random()) - 35,
          y: parseInt(20*Math.random()) - 10,
        });
      }
    }, 700 / shakeSpeed);

    const blinkInterval = setInterval(() => {
      if (Math.random()*10 > 8) {
        actions.blink("BLINK", 0.15);
      }
    }, 800);

    const stateInterval = setInterval(() => {
      // const mode = modes[Math.floor(modes.length*Math.random())];
      // actions.setMode(mode, 0.3);
    }, 2500);

    return (() => {
      clearInterval(idleInterval);
      clearInterval(blinkInterval);
      clearInterval(stateInterval);
    });
  }, [state.leftEyeMode]);

  return (
    <div {...props} style={style}>
      <PositionsContext.Provider value={[state, dispatch]}>
        <Eye type="R" pos={firstEyePos}/>
        <Eye type="L" pos={secondEyePos}/>
      </PositionsContext.Provider>
      {/* <button onClick={() => actions.lookTo({ x: -100, y: 0 })}>left</button>
      <button onClick={() => actions.lookTo({ x: 0, y: 0 })}>center</button>
      <button onClick={() => actions.lookTo({ x: 100, y: 0 })}>right</button>
      <button onClick={() => actions.setMode("NORMAL", 0.2)}>normal</button>
      <button onClick={() => actions.setMode("BLINK", 0.2)}>blink</button>
      <button onClick={() => actions.setMode("SNAKE", 0.3)}>snake</button>
      <button onClick={() => actions.setMode("MAD", 0.3)}>mad</button>
      <button onClick={() => actions.setMode("SHOCK", 0.3)}>shock</button>
      <button onClick={() => actions.setMode("WORRIED", 0.3)}>worried</button>
      <h1 style={{backgroundColor: "white"}}>{state.leftEyeMode}, {state.rightEyeMode}</h1> */}
    </div>
  );
}

export default Main;