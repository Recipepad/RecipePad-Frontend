import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';

const { Title } = Typography;

function LoginPage(props) {
    const [formErrorMessage] = useState('');
    const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  return (
    <div>
      <Formik
        initialValues={{
          email: initialEmail,
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
            };
            console.log(dataToSubmit);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <div className='appLogin'>
              <Title level={2}>Sign In</Title>
              <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                <Form.Item required>
                  <Input
                    id='email'
                    prefix={
                      <UserOutlined type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Enter your email'
                    type='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className='input-feedback'>{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id='password'
                    prefix={
                      <LockOutlined type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Enter your password'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className='input-feedback'>{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label>
                    <p
                      style={{
                        color: '#ff0000bf',
                        fontSize: '0.7rem',
                        border: '1px solid',
                        padding: '1rem',
                        borderRadius: '10px',
                      }}
                    >
                      {formErrorMessage}
                    </p>
                  </label>
                )}
                <Form.Item>
                  <div>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                      style={{ minWidth: '100%' }}
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      Log in
                    </Button>
                  </div>
                  Or <a href='/register'>register now!</a>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(LoginPage);
