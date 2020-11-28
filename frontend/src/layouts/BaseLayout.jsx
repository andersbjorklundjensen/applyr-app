/** @jsx jsx */
import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import { css, jsx } from '@emotion/react'

const BaseLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4"
      css={css`max-width: 1110px`}>
      <div className="my-14">
        <Topbar />
      </div>
      {children}
    </div>
  )
}

export default BaseLayout;