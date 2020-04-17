import React, { useEffect, useContext } from "react";

import { getVContext } from "./VirtualReducer";

const useAnimation = (dispatch, deps) => {
  useEffect(() => {
    const animation = () => {
      requestAnimationFrame(animation);
      // const animationInterval = setInterval(() => {
        const [state, ] = getVContext();
        dispatch(state);
      // }, parseInt((1/24)*1000))
    }
    const animationRequest = requestAnimationFrame(animation);
    return (() => {
      // clearInterval(animationInterval);
      cancelAnimationFrame(animationRequest);
    });
  }, deps);
}

export default useAnimation;