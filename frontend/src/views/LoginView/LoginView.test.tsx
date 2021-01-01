import { createMemoryHistory } from "history";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import AuthContextProvider from "../../state/auth/AuthContext";
import { Routes } from "../../App";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import api from '../../config/api';

const server = setupServer(
  rest.post(`${api.API_URL}/user/login`, (req, res, ctx) => {
    return res(ctx.json({ token: 'token' }))
  }),
)

describe('Login view functionality', () => {
  beforeAll(() => server.listen())
  it('', async () => {
    const history = createMemoryHistory()
    history.push('/login')
    render(
      <Router history={history}>
        <AuthContextProvider>
          {Routes}
        </AuthContextProvider>
      </Router>
    )

    expect(history.location.pathname).toBe("/login");

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button');

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    })

    await act(async () => {
      fireEvent.click(loginButton);
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })

    expect(history.location.pathname).toBe("/");
  })
})