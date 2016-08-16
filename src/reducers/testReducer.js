const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TESTMEOUT':
      console.log('hey')
      return {
        test: 'test',
      };
    default:
      return state;
  }
};

export default testReducer;

