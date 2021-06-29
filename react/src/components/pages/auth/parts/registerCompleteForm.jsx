// @ts-nocheck
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, SendOutlined } from '@ant-design/icons'
import { auth } from 'appConfigs/firebase'
import { toast } from 'react-toastify'
import { dispatchLoginUser } from 'utils/auth'

const RegisterCompleteForm = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { Item } = Form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setEmail(window.localStorage.getItem('userEmailForRegistration'))
    form.setFieldsValue({
      userEmail: window.localStorage.getItem('userEmailForRegistration'),
      userPassword: password
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      if (result.user.emailVerified) {
        // delete email from localstorage
        window.localStorage.removeItem('userEmailForRegistration')
        // get userId token
        const user = auth.currentUser
        await user.updatePassword(password)
        const userToken = await user.getIdTokenResult()
        dispatchLoginUser(dispatch, user.email, userToken.token)
        // redirect to homepage
        history.push('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
      >
        <Item
          label="Email"
          name="userEmail"
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input
            disabled
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Item>
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
            icon={<SendOutlined />}
            className="login-form-button"
            onClick={handleSubmit}
          >
            Complete Registration
          </Button>
        </Item>
      </Form>
    </>
  )
}

export default RegisterCompleteForm
