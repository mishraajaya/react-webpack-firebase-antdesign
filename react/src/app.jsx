// @ts-nocheck
import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { auth } from 'appConfigs/firebase'
import { dispatchLoginUser } from 'utils/auth'
import ForgotPassword from 'components/pages/auth/forgotPassword'
import Header from 'components/common/header'
import HomePage from 'components/pages/home'
import LoginPage from 'components/pages/auth/login'
import RegisterPage from 'components/pages/auth/register'
import RegisterCompletePage from 'components/pages/auth/registerComplete'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const tokenInfo = await user.getIdTokenResult()
        dispatchLoginUser(dispatch, user.email, tokenInfo.token)
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/register/complete" component={RegisterCompletePage} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
      </Switch>
    </>
  )
}

export default App
