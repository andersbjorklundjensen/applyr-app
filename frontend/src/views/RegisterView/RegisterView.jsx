import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Styles from './RegisterView-styles';
import User from '../../api/User';
import Field from '../../components/Field/Field';

const RegisterView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidPassword(password.length >= 8);
  }, [password]);

  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const user = new User();

  const isUsernameTaken = async () => {
    let usernameTaken;
    if (username) {
      await user.checkUsername(username)
        .then((response) => {
          usernameTaken = response.usernameExists;
        })
        .catch((e) => console.log(e));
    } else {
      usernameTaken = false;
    }
    return usernameTaken;
  };

  useEffect(() => {
    (async () => {
      if (await isUsernameTaken()) {
        setValidUsername(false);
      } else {
        setValidUsername(true);
      }
    })();
  }, [username]);

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    if (validUsername && validPassword) {
      setIsLoading(true);
      user.register(username, password)
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
    }
  };

  return (
    <BaseLayout>
      <Styles>
        <div className="sign-up">
          <div className="form-wrapper">
            <h1>Sign up</h1>
            <form
              className="signup-form"
              onSubmit={(e) => onSignUpFormSubmit(e)}
            >
              <div>
                <Field type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength="50" />
                {!validUsername && <div>Username is taken!</div>}
              </div>
              <div>
                <Field type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} min="8" maxLength="50" />
                {!validPassword && <div>Password must contain 8 characters!</div>}
              </div>
              <input type="submit" value="Sign up" />
            </form>
            {isLoading && (
              <div className="spinner-wrapper">
                <Loader visible={isLoading} type="TailSpin" color="#00BFFF" height={50} width={50} />
                <div>Signing up...</div>
              </div>
            )}
          </div>
        </div>
      </Styles>
    </BaseLayout>
  );
};

export default RegisterView;
