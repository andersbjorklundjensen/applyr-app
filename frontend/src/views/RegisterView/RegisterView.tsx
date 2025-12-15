import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import registerUser from '../../api/user/register';
import isUsernameTaken from '../../api/user/isUsernameTaken';

interface SignUpFormProps {
  username: string;
  password: string;
}

const RegisterView: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormProps>();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignUpFormSubmit = async ({
    username,
    password,
  }: SignUpFormProps) => {
    setIsLoading(true);

    const {
      data: { usernameExists },
    } = await isUsernameTaken(username);

    if (usernameExists) {
      setIsLoading(false);
      setError('username', {
        type: 'manual',
        message: 'Username is taken!',
      });
    } else {
      const {
        data: { token },
      } = await registerUser(username, password);

      authDispatch({
        type: 'LOGIN',
        username,
        token,
      });

      setIsLoading(false);
      navigate('/');
    }
  };

  return (
    <BaseLayout>
      <div className="flex justify-center">
        <div className="text-center max-w-md w-full">
          <h1 className="text-4xl font-semibold mb-6">Sign up</h1>
          <form
            onSubmit={handleSubmit(onSignUpFormSubmit)}
            className="space-y-4"
          >
            <Field
              register={register('username', { required: 'Missing username' })}
              name="username"
              error={errors.username}
              type="text"
              placeholder="Username"
              maxLength={30}
            />
            <Field
              register={register('password', {
                required: 'Missing password',
                minLength: { value: 8, message: 'Password is too short' },
              })}
              name="password"
              error={errors.password}
              type="password"
              placeholder="Password"
              maxLength={30}
            />
            <input
              className="w-full rounded-full py-2.5 text-white bg-[#e24f54] hover:bg-[#d43f44] transition-colors duration-200 cursor-pointer border-none"
              type="submit"
              value="Sign up"
              disabled={isLoading}
            />
          </form>
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <div className="mx-3">Signing up...</div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default RegisterView;
