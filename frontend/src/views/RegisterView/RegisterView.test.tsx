import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AuthContextProvider from "../../state/auth/AuthContext";
import { Router } from "react-router-dom";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import api from '../../config/api';
import { createMemoryHistory } from "history";
import { Routes } from "../../App";

const server = setupServer(
  rest.post(`${api.API_URL}/user/username`, (req, res, ctx) => {
    return res(ctx.json({ usernameExists: false }))
  }),

  rest.post(`${api.API_URL}/user/register`, (req, res, ctx) => {
    return res(ctx.json({ token: 'token' }))
  }),
)

describe('Register view functionality', () => {
  beforeAll(() => server.listen())
  it('should register a user', async () => {
    const history = createMemoryHistory()
    history.push('/register')
    const { debug } = render(
      <Router history={history}>
        <AuthContextProvider>
          {Routes}
        </AuthContextProvider>
      </Router>
    )

    expect(history.location.pathname).toBe("/register");

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signupButton = screen.getByRole('button');

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    })

    expect(usernameInput.value).toBe('username')
    expect(passwordInput.value).toBe('password')

    await act(async () => {
      fireEvent.click(signupButton);
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })

    expect(history.location.pathname).toBe("/");
  });
})
