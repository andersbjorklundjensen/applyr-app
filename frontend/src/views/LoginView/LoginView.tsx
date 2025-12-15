import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import login from '../../api/user/login';

interface SignInFormProps {
  username: string;
  password: string;
}

const LoginView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { authDispatch } = useContext(AuthContext);

  const onSignInFormSubmit = async ({
    username,
    password,
  }: SignInFormProps) => {
    setError(null);
    setIsLoading(true);
    const { data, error: loginError } = await login(username, password);

    if (loginError) {
      setError(loginError);
      setIsLoading(false);
      return;
    }

    authDispatch({
      type: 'LOGIN',
      username,
      token: data.token,
    });

    setIsLoading(false);
    navigate('/');
  };

  return (
    <BaseLayout>
      <div className="flex justify-center">
        <div className="text-center max-w-md w-full">
          <h1 className="text-4xl font-semibold mb-6">Log in</h1>
          {error !== null && (
            <div className="border-2 border-red-400 bg-red-100 py-2 mt-4 mb-4 rounded">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSignInFormSubmit)}
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
                minLength: 8,
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
              value="Log in"
              disabled={isLoading}
            />
          </form>
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <div className="mx-3">Logging in...</div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginView;
