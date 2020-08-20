import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Styles from './LoginView-styles';
import Field from '../../components/Field/Field';
import { useForm } from 'react-hook-form';
import login from '../../api/user/login';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const user = new User();

  const onSignInFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    user.login(username, password)
      .then((response) => {
        authDispatch({
          type: 'LOGIN',
          username,
          token: response.token,
        });
        setIsLoading(false);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <BaseLayout>
      <Styles>
        <Row>
          <Col lg>
            <div className="sign-in">
              <div className="form-wrapper">
                <h1>Log in</h1>
                <form className="login-form" onSubmit={(e) => onSignInFormSubmit(e)}>
                  <Field type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength="50" />
                  <Field type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength="50" />
                  <input type="submit" value="Sign in" />
                </form>
                {isLoading && (
                  <div className="spinner-wrapper">
                    <Loader visible={isLoading} type="TailSpin" color="#00BFFF" height={50} width={50} />
                    <div>Signing in...</div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Styles>
    </BaseLayout>
  );
};

export default LoginView;
