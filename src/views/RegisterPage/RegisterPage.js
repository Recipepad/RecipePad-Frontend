import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import registerUser from '../../actions/user_actions';
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';

const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          fullname: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string()
            .required('Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
              username: values.fullname,
              image: ``
            };

            dispatch(registerUser(dataToSubmit)).then(response => {
              if (response.payload.uid) {
                props.history.push("/login");
              } else {
                alert ('Register Not Successful')
                // alert(response.payload.err)
                // console.log(response.payload)
              }
            })
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
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
            <div className="appRegister">
              <Title level={2}>Sign Up</Title>
              <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
                <Form.Item required label="Full Name">
                  <Input
                    id="fullname"
                    placeholder="Enter your full name"
                    type="text"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.fullname && touched.fullname ? 'text-input error' : 'text-input'
                    }
                  />
                </Form.Item>

                <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                  <Input
                    id="email"
                    placeholder="Enter your Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Confirm" hasFeedback>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">{errors.confirmPassword}</div>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                    Submit
                </Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage