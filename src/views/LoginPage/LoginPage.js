import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import { loginUser } from '../../actions/user_actions';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('');

  return (
    <div>
      <Formik
        initialValues={{
          fullname: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string()
            .required('Name is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              username: values.fullname,
              password: values.password,
            };
            // console.log(dataToSubmit);
            dispatch(loginUser(dataToSubmit))
              .then((response) => {
                console.log(response)
                if (response.payload.uid) {
                  window.localStorage.setItem(
                    'userId',
                    response.payload.uid
                  );
                  props.history.push('/recipe');
                } else {
                  setFormErrorMessage(
                    'Check out your Account or Password again'
                  );
                }
              })
              .catch((err) => {
                setFormErrorMessage('Check out your Account or Password again');
                setTimeout(() => {
                  setFormErrorMessage('');
                }, 3000);
              });
            setSubmitting(false);
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
                    id='fullname'
                    prefix={
                      <UserOutlined type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Enter your fullname'
                    type='fullname'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.fullname && touched.fullname
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.fullname && touched.fullname && (
                    <div className='input-feedback'>{errors.fullname}</div>
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
