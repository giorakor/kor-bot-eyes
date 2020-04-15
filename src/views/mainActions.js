const Actions = {
  NORMAL: "NORMAL",
  LOOK_TO: "LOOK_TO",
  MOVE_PUPIL: "MOVE_PUPIL",
  SET_RANDOM_AMOUNT: "SET_RANDOM_AMOUNT",
  SET_MODE: "SET_MODE",
  BLINK: "BLINK",
  STOP_BLINK: "STOP_BLINK",
};

const useActions = dispatch => ({
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
  }
});

export {
  Actions,
  useActions
}