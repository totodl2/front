const combineReducers = reducers => {
  const keys = Object.keys(reducers);

  return (state = {}, action) =>
    keys.reduce((previousState, key) => {
      const oldState = state[key];
      const newState = reducers[key](previousState[key], action);
      if (oldState === newState) {
        return previousState;
      }

      return {
        ...previousState,
        [key]: newState,
      };
    }, state);
};

export default combineReducers;
