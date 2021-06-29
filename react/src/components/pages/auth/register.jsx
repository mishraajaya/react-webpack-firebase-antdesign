// @ts-nocheck
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import RegisterForm from './parts/registerForm'

const RegisterPage = ({ history }) => {
  const { USER_STATE } = useSelector(state => ({ ...state }))

  useEffect(() => {
    if (USER_STATE && USER_STATE.token) history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_STATE])

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

RegisterPage.propTypes = {
  history: PropTypes.object
}

export default RegisterPage
