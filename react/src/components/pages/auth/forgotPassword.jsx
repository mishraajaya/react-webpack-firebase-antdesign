// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Form, Button } from 'antd'
import { toast } from 'react-toastify'
import { auth } from 'appConfigs/firebase'
import { useSelector } from 'react-redux'
import { MailOutlined, SendOutlined } from '@ant-design/icons'
import TextField from 'components/common/form/textField'

const ForgotPassword = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { Item } = Form

  const { USER_STATE } = useSelector(state => ({ ...state }))

  useEffect(() => {
    if (USER_STATE && USER_STATE.token) history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_STATE])

  const handleChangeSubmit = async () => {
    setLoading(true)

    const config = {
      url: 'http://localhost:3000/login',
      handleCodeInApp: true
    }

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Check your Email for Link to Reset Password!!!')
      })
      .catch(error => {
        toast.error(error.message)
      })
    history.push('/')
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
          <Form
            autoComplete="off"
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={handleChangeSubmit}
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
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={<SendOutlined style={{ fontSize: '19px' }} />}
                disabled={!email}
                onClick={handleChangeSubmit}
              >
                Login with Email/Password
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
