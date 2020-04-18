import React, { useContext, useState, useReducer, useEffect } from "react";

import U from "../utils";
import Modes from "../modes";
import useAnimation from "../Animation";
import { useVReducer } from "../VirtualReducer";
import mainReducer from "./mainReducer";
import { useActions } from "./mainActions";
import RealPositionsContext from "../context/RealPositions";
import Eye from "../components/Eye";

// const { ipcRenderer } = window.require("electron");

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
  leftEyeControls: Modes("NORMAL").controls,
  rightEyeControls: Modes("NORMAL").controls,
  transTime: 0.5
}

const modes = ["SNAKE", "SHOCK", "NORMAL", "WORRIED", "MAD"];

const Main = props => {
  const [realState, setState] = useState(initialPositions);
  const [vState, vDispatch] = useVReducer(mainReducer, initialPositions)
  const actions = useActions(vDispatch);

  const {
    screenWidth,
    screenHeight,
    eyesDistance,
    eyeWidth,
    eyeHeight,
    eyesY
  } = realState;

  const style = {
    width: U.px(screenWidth),
    height: U.px(screenHeight),
    overflow: "hidden"
  };

  const firstEyePos = {
    x: screenWidth / 2 - eyeWidth - eyesDistance / 2,
    y: eyesY
  };

  const secondEyePos = {
    x: screenWidth / 2 + eyesDistance / 2 ,
    y: eyesY
  };

  useAnimation(setState, []);

  useEffect(() => {
    // document.requestFullScreen();
    actions.lookTo({ x: 0, y: 0 });
    // ipcRenderer.on("data", (err, data) => {
    //   const { pitch, yaw } = data;
    //   const yMove = U.constrain(pitch * 20, -50, 50);
    //   const xMove = U.constrain(-1 * yaw * 2, -100, 100);
    //   actions.lookTo({ x: xMove, y: yMove });
    // });

    // return () => {
    //   ipcRenderer.removeAllListeners();
    // }
  }, []);

  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        actions.setRandomAmount({
          x: parseInt(60*Math.random()) - 30,
          y: parseInt(20*Math.random()) - 10,
        });
      }
    }, 700);

    const blinkInterval = setInterval(() => {
      if (Math.random()*10 > 8) {
        actions.blink("BLINK", 0.15);
      }
    }, 800);

    const stateInterval = setInterval(() => {
      const mode = modes[Math.floor(modes.length*Math.random())];
      actions.setMode(mode, 0.3);
    }, 2500);

    return (() => {
      clearInterval(idleInterval);
      clearInterval(blinkInterval);
      clearInterval(stateInterval);
    });
  }, [realState.leftEyeMode]);

  return (
    <div {...props} style={style}>
      <RealPositionsContext.Provider value={realState}>
        <Eye  type="R" pos={firstEyePos}/>
        <Eye  type="L" pos={secondEyePos}/>
      </RealPositionsContext.Provider>
      <div style={{ position: "relative", zIndex: 200 }}>
        <button onClick={() => actions.lookTo({ x: -100, y: 0 })}>left</button>
        <button onClick={() => actions.lookTo({ x: 0, y: 0 })}>center</button>
        <button onClick={() => actions.lookTo({ x: 100, y: 0 })}>right</button>
        <button onClick={() => actions.setMode("NORMAL", 0.2)}>normal</button>
        <button onClick={() => actions.setMode("BLINK", 0.2)}>blink</button>
        <button onClick={() => actions.setMode("SNAKE", 0.3)}>snake</button>
        <button onClick={() => actions.setMode("MAD", 0.3)}>mad</button>
        <button onClick={() => actions.setMode("SHOCK", 0.3)}>shock</button>
        <button onClick={() => actions.setMode("WORRIED", 0.3)}>worried</button>
        <h1 style={{backgroundColor: "white"}}>{realState.leftEyeMode}, {realState.rightEyeMode}</h1>
      </div>
      <svg style={{ zIndex: 100, position: "fixed", left: 0, top: 0 }} width={screenWidth} height={screenHeight}>
        <rect x={(screenWidth- eyesDistance) / 2} width={eyesDistance + 1} height={screenHeight} fill="black"/>
        <rect width={screenWidth} height={eyesY} fill="black"/>
        <rect width={(screenWidth - eyesDistance)/2 - eyeWidth + 1} height={screenHeight} fill="black"/>
        <rect x={(screenWidth + eyesDistance) / 2 + eyeWidth} width={(screenWidth - eyesDistance)/2 - eyeWidth} height={screenHeight} fill="black"/>
        <rect y={eyesY + eyeHeight} width={screenWidth} height={screenHeight - eyesY - eyeHeight} fill="black"/>
      </svg>
    </div>
  );
}

export default Main;