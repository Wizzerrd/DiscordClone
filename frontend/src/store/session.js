import csrfFetch, { storeCSRFToken } from './csrf'; // Import your custom csrfFetch function
import { uiToDefault } from './ui';

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';
export const SET_ERRORS = "session/SET_ERRORS";
export const UPDATE_USERNAME = "session/UPDATE_USERNAME"
export const ADD_ERROR = "session/ADD_ERROR"


export const setErrors = (errors) => ({
  type: SET_ERRORS,
  errors,
});

export const addError = error => ({
  type: ADD_ERROR,
  error
})

export const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

export const removeSessionUser = () => ({
    type: REMOVE_SESSION_USER
});

export const updateUsername = (user) => ({
  type: UPDATE_USERNAME,
  user
})

export const login = (user) => async dispatch => {
  let {credential, password} = user
  credential ||= user.username;
  credential ||= user.email;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential: credential, password: password})
  });

  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setSessionUser(data.user));
  
  return res;
  
};

export const logout = () => async dispatch => {
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

export const updateUser = user => async dispatch => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user)
  })
  let newUser = await res.json()
  if(res.ok){
    sessionStorage.setItem("currentUser", JSON.stringify(newUser.user));
    await dispatch(updateUsername(newUser.user));
  }else{
    throw res
  }
}

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
          return {...state, errors: action.errors, signupErrors: action.errors};
        case ADD_ERROR:
          return {...state, errors: [...state.errors, action.error]}
        case UPDATE_USERNAME:
          return {...state, user: {...state.user, username: action.user.username}}
        default:
          return state;
      }
}
