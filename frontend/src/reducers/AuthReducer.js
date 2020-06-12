const AuthReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'LOGIN':
      newState = {
        ...state,
        username: action.username,
        token: action.token,
      };
      localStorage.setItem('job-app:auth', JSON.stringify(newState));
      return newState;

    case 'LOGOUT':
      newState = {};
      localStorage.removeItem('job-app:auth');
      return newState;

    default:
      return state;
  }
};

export default AuthReducer;
