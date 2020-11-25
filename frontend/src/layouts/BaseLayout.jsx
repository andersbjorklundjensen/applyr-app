/** @jsx jsx */
import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import { css, jsx } from '@emotion/react'

const BaseLayout = ({ children }) => {
  return (
    <div className="container"
      css={css`max-width: 1110px`}>
      <div className="pt-3 mb-5">
        <Topbar />
      </div>
      {children}
    </div>
  )
}

export default BaseLayout;