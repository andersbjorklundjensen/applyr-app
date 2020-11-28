/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import { useForm } from 'react-hook-form';
import login from '../../api/user/login';

const LoginView = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const onSignInFormSubmit = async ({ username, password }) => {
    setIsLoading(true);
    const token = await login(username, password);

    authDispatch({
      type: 'LOGIN',
      username,
      token,
    });

    setIsLoading(false);
    history.push('/');
  };

  return (
    <BaseLayout>
      <div className="flex justify-center">
        <div className="mt-16 text-center">
          <h1 className="text-4xl font-semibold">Log in</h1>
          <form
            css={css`* { margin: 15px 0; }`}
            onSubmit={handleSubmit(onSignInFormSubmit)}
          >
            <Field register={register({ required: "Missing username" })}
              name="username" error={errors.username}
              type="text" placeholder="Username" maxLength="50" />
            <Field register={register({ required: 'Missing password' })}
              name="password" error={errors.password}
              type="password" placeholder="Password" maxLength="50" />
            <input
              css={css`background-color: #E24F54;`}
              className="w-full rounded-full py-2.5 text-white"
              type="submit" value="Log in" />
          </form>
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader visible={isLoading} type="TailSpin" color="#00BFFF" height={50} width={50} />
              <div className="mx-3">Logging in...</div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginView;
