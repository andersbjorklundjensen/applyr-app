import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Styles from './RegisterView-styles';
import Field from '../../components/Field/Field';
import { useForm } from 'react-hook-form';
import registerUser from '../../api/user/register';
import isUsernameTaken from '../../api/user/isUsernameTaken';

const RegisterView = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const onSignUpFormSubmit = async ({ username, password }) => {
    setIsLoading(true);

    if (await isUsernameTaken(username)) {
      setIsLoading(false);
      setError("username", {
        type: "manual",
        message: "Username is taken!"
      });
    } else {
      const token = await registerUser(username, password);

      authDispatch({
        type: 'LOGIN',
        username,
        token,
      });

      setIsLoading(false);
      history.push('/');
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
              onSubmit={handleSubmit(onSignUpFormSubmit)}
            >
              <div>
                <Field register={register({ required: "Missing username" })}
                  name="username" error={errors.username}
                  type="text" placeholder="Username" maxLength="50" />
              </div>
              <div>
                <Field
                  register={register({
                    required: "Missing password",
                    minLength: { value: 8, message: "Password is too short" }
                  })}
                  name="password" error={errors.password}
                  type="password" placeholder="Password" minLength="8" maxLength="50" />
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