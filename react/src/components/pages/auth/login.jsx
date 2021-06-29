// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from 'appConfigs/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLoginUser } from 'utils/auth'
import TextField from 'components/common/form/textField'

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { Item } = Form
  const dispatch = useDispatch()
  const { USER_STATE } = useSelector(state => ({ ...state }))

  useEffect(() => {
    form.setFieldsValue({
      userEmail: email,
      userPassword: password
    })
  })

  useEffect(() => {
    if (USER_STATE && USER_STATE.token) history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_STATE])

  const handleLoginByGmail = async () => {
    try {
      const authResult = await auth.signInWithPopup(googleAuthProvider)
      const { user } = authResult
      const tokenInfo = await user.getIdTokenResult()
      dispatchLoginUser(dispatch, user.email, tokenInfo.token)
      history.push('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleLoginByEmail = async () => {
    setLoading(true)
    try {
      const authResult = await auth.signInWithEmailAndPassword(email, password)
      const { user } = authResult
      const tokenInfo = await user.getIdTokenResult()
      dispatchLoginUser(dispatch, user.email, tokenInfo.token)
      history.push('/')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Login User</h4>}
          <Form
            autoComplete="off"
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={handleLoginByEmail}
            form={form}
            layout="vertical"
          >
            <TextField
              label="Email"
              name="userEmail"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!'
                }
              ]}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={val => setEmail(val)}
            />

            <Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={<MailOutlined />}
                disabled={!email || !password}
                onClick={handleLoginByEmail}
              >
                Login with Email/Password
              </Button>
            </Item>
            <Item>
              <Button
                type="danger"
                htmlType="submit"
                className="login-form-button"
                icon={<GoogleOutlined />}
                onClick={handleLoginByGmail}
              >
                Login with Gmail
              </Button>
            </Item>
            <Item>
              <Link className="login-form-register" to="/register">
                Register Now!
              </Link>
              <Link className="text-danger login-form-forgot" to="/password/forgot">
                Forgot password?
              </Link>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object
}

export default LoginPage
