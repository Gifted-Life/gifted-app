const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TESTMEOUT':
      return {
        test: 'test',
      };
    default:
      return state;
  }
};

export default testReducer;

