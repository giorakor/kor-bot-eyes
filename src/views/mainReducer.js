import { Actions } from "./mainActions";

const mainReducer = (state, action) => {
  switch (action.type) {
    case Actions.LOOK_TO:
      const pupilPos = {
        x: state.eyeWidth/2 + action.pos.x,
        y: state.eyeHeight/2 + action.pos.y
      }
      return (
        {
          ...state,
          leftPupilPos: pupilPos,
          rightPupilPos: pupilPos
        }
      )
    case Actions.MOVE_PUPIL:
      return (
        {
          ...state,
          leftPupilPos: {
            x: state.leftPupilPos.x + action.amount.x,
            y: state.leftPupilPos.y + action.amount.y
          },
          rightPupilPos: {
            x: state.rightPupilPos.x + action.amount.x,
            y: state.rightPupilPos.y + action.amount.y
          }
        }
      )
    case Actions.SET_RANDOM_AMOUNT:
      return(
        {
          ...state,
          randomMoveAmount: action.amount
        }
      );
    case Actions.SET_MODE:
      return (
        {
          ...state,
          rightEyeMode: action.mode,
          leftEyeMode: action.mode,
          transTime: action.transTime
        }
      )
    case Actions.BLINK:
      return (
        !state.blinking ? {
          ...state,
          rightEyeMode: action.mode,
          leftEyeMode: action.mode,
          transTime: action.transTime,
          beforeBlink: state.leftEyeMode,
          blinking: true
        } : state
      )
    case Actions.STOP_BLINK:
      return (
        {
          ...state,
          rightEyeMode: state.beforeBlink,
          leftEyeMode: state.beforeBlink,
          blinking: false
        }
      )
    default:
      return state;
  }
}

export default mainReducer;