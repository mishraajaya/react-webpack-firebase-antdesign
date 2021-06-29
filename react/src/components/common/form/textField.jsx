import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const TextField = ({ label, name, onChange, placeholder, prefix, rules }) => {
  const { Item } = Form
  return (
    <Item label={label} name={name} rules={rules}>
      <Input
        prefix={prefix}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
      />
    </Item>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.any,
  rules: PropTypes.array
}

export default TextField
