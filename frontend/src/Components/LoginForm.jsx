import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setLogin } from '../store/slices/userSlices';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async(values) => {
      setAuthFailed(false);
      try {
        console.log(values)
        const responce = await axios.get('./users.json', values);
        console.log(responce.data.username)
        dispatch(setLogin(responce.data));
        if (values.username === responce.data.username && values.password === responce.data.password) {
          navigate('/profile');
        } else {
          setAuthFailed(true);
        }
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.responce.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return
        }
        throw error
      }
    }
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
      <Form onSubmit={formik.handleSubmit} className="p-3">
        <fieldset disabled={formik.isSubmitting}>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          id="username"
          autoComplete="username"
          isInvalid={authFailed}
          required
          ref={inputRef}
           />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          autoComplete="current-password"
          isInvalid={authFailed}
          required
          id="password"
           />
           <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">Войти</Button>
        </fieldset>
      </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;