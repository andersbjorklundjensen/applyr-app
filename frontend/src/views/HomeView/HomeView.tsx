/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { Link } from 'react-router-dom';

const HomeView = (): JSX.Element => (
  <BaseLayout>
    <div className="container md:flex">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-semibold">Simple job tracking</h1>
        <h3 className="text-2xl font-semibold">
          Dont waste time keeping track of job applications
        </h3>
        <div className="my-4 w-4/5">
          When searching for a job, sending out an application is quick. Being
          organized and knowing where you are in the process with each of them
          can be a challenge. Let Applyr help you with this problem.
        </div>
        <Link
          css={css`
            background-color: #f6cd42;
          `}
          className="inline-block rounded-full py-3 px-7"
          to="/register"
        >
          Get started!
        </Link>
      </div>
      <div className="md:w-1/2">
        <img className="mt-2 w-full" alt="#" src="/img/hero-image.jpg" />
      </div>
    </div>
  </BaseLayout>
);

export default HomeView;
