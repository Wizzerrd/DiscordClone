import csrfFetch, { storeCSRFToken } from './csrf'; // Import your custom csrfFetch function

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';
export const SET_ERRORS = "session/SET_ERRORS";


export const setErrors = (errors) => ({
  type: SET_ERRORS,
  errors,
});

export const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

export const removeSessionUser = () => ({
    type: REMOVE_SESSION_USER
});

export const login = (user) => async dispatch => {
  let {credential, password} = user
  credential ||= user.username;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential: credential, password: password})
  });

  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setSessionUser(data.user));
  
  return res;
  
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE"
  })
  storeCurrentUser(null);
  dispatch(removeSessionUser());
  return res;
};

export const signup = (user) => async (dispatch) => {
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user)
  });
  dispatch(login(user))
};

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}


export const restoreSession = () => async dispatch => {
  const res = await csrfFetch("/api/session");
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setSessionUser(data.user));
  return res;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
  errors: []
}
  
export default function sessionReducer(state = initialState, action){
    switch (action.type) {
        case SET_SESSION_USER:
          return { ...state, user: action.user };
        case REMOVE_SESSION_USER:
          return { ...state, user: null };
        case SET_ERRORS:
          return {...state, signupErrors: action.errors,};
        default:
          return state;
      }
}
