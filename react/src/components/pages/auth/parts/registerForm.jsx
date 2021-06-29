// @ts-nocheck
import React, { useState } from 'react'
import { auth } from 'appConfigs/firebase'
import { toast } from 'react-toastify'
import { Form, Button } from 'antd'
import { MailOutlined, SendOutlined } from '@ant-design/icons'
import TextField from 'components/common/form/textField'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const config = {
      url: 'http://localhost:3000/register/complete',
      handleCodeInApp: true
    }

    const result = await auth.sendSignInLinkToEmail(email, config)
    console.log('result=', result)
    toast.success(`Email is sent to ${email}. Click the link to complete your registration!!!`)

    // save email in localstorage
    window.localStorage.setItem('userEmailForRegistration', email)
    // setting the textbox empty
    setEmail('')
  }

  const handleEmailChange = value => setEmail(value)

  return (
    <Form
      autoComplete="off"
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true
      }}
      onFinish={handleSubmit}
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
        onChange={handleEmailChange}
      />
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        icon={<SendOutlined style={{ fontSize: '19px' }} />}
        onClick={handleSubmit}
      >
        Register with Your Email
      </Button>
    </Form>
  )
}

export default RegisterForm
