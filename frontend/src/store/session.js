import csrfFetch from './csrf'; // Import your custom csrfFetch function

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

export const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

export const removeSessionUser = () => ({
    type: REMOVE_SESSION_USER
});

export const login = (credential, password) => async dispatch => {
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({credential: credential, password: password})
    });
  
    const data = await response.json();
    dispatch(setSessionUser(data.user));
};
  
export default function sessionReducer(state = { user: null }, action){
    switch (action.type) {
        case SET_SESSION_USER:
          return { ...state, user: action.user };
        case REMOVE_SESSION_USER:
          return { ...state, user: null };
        default:
          return state;
      }
}
