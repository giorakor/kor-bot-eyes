import _ from "lodash";

let virtualState;
let dispatcher;

const useVReducer = (reducer, initial) => {
  if (!virtualState) {
    virtualState = initial;
    dispatcher = action => {
      virtualState = reducer(virtualState, action);
    }
  }

  return [virtualState, dispatcher];
}

const getVContext = () => {
  return [virtualState, dispatcher];
}

export { getVContext, useVReducer };