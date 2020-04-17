const Actions = {
  NORMAL: "NORMAL",
  LOOK_TO: "LOOK_TO",
  MOVE_PUPIL: "MOVE_PUPIL",
  SET_RANDOM_AMOUNT: "SET_RANDOM_AMOUNT",
  SET_MODE: "SET_MODE",
  BLINK: "BLINK",
  STOP_BLINK: "STOP_BLINK",
  SET_CONTROLS: "SET_CONTROLS"
};

let actions;
const useActions = dispatch => {
  if (!!actions) {
    return actions
  }
  actions = {
    nomral: () => {
      dispatch({
        type: Actions.NORMAL
      });
    },
    lookTo: pos => {
      dispatch({
        type: Actions.LOOK_TO,
        pos
      });
    },
    movePupil: amount => {
      dispatch({
        type: Actions.MOVE_PUPIL,
        amount
      });
    },
    setRandomAmount: amount => {
      dispatch({
        type: Actions.SET_RANDOM_AMOUNT,
        amount
      })
    },
    setMode: (mode, transTime) => {
      dispatch({
        type: Actions.SET_MODE,
        mode,
        transTime
      })
    },
    blink: (mode, transTime) => {
      dispatch({
        type: Actions.BLINK,
        mode,
        transTime
      });
    },
    stopBlink: () => {
      dispatch({
        type: Actions.STOP_BLINK,
      })
    },
    setControls: (controls, right) => {
      if (right) {
        dispatch({
          type: Actions.SET_CONTROLS,
          rightEyeControls: controls
        });
      } else {
        dispatch({
          type: Actions.SET_CONTROLS,
          leftEyeControls: controls
        });
      }
    }
  }
  return actions;
};

export {
  Actions,
  useActions
}