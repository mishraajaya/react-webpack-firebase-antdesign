export const dispatchLoginUser = (dispatch, email, token) => {
  dispatch({
    type: 'USER_LOGGED_IN',
    payload: {
      email,
      token
    }
  })
}

export const dispatchLogoutUser = dispatch => {
  dispatch({
    type: 'USER_LOGOUT',
    payload: null
  })
}
