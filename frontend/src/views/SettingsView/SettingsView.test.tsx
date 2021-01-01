import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AuthContextProvider from "../../state/auth/AuthContext";
import { Router } from "react-router-dom";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import api from '../../config/api';
import { createMemoryHistory } from "history";
import SettingsView from './SettingsView';

const server = setupServer(
  rest.post(`${api.API_URL}/backup/request`, (req, res, ctx) => {
    return res(ctx.json({}))
  }),

  rest.get(`${api.API_URL}/backup/list`, (req, res, ctx) => {
    return res(ctx.json({
      backups: [
        { _id: 1, filename: 'filename1', created: 12 }
      ]
    }))
  }),

  rest.get(`${api.API_URL}/backup/1`, (req, res, ctx) => {
    return res(ctx.json({ }))
  }),
)

describe('Settings view functionality', () => {
  beforeAll(() => server.listen())
  it('should request a backup when clicking button', async () => {
    const history = createMemoryHistory()
    const { debug } = render(
      <Router history={history}>
        <AuthContextProvider>
          <SettingsView />
        </AuthContextProvider>
      </Router>
    )

    await act(async () => {
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })

    const a = screen.getByText('filename1');

    server.use(
      rest.get(`${api.API_URL}/backup/list`, (req, res, ctx) => {
        return res.once(ctx.json({
          backups: [
            { _id: 1, filename: 'filename1', created: 12 },
            { _id: 2, filename: 'filename2', created: 123 }
          ]
        }))
      }),
    )

    const requestBackupButton = screen.getByRole('button', { name: 'Request backup' });
    fireEvent.click(requestBackupButton);

    await act(async () => {
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })

    const b = screen.getByText('filename2');
  })
  it('should download a file when clicking it', async () => {
    const history = createMemoryHistory()
    const { debug } = render(
      <Router history={history}>
        <AuthContextProvider>
          <SettingsView />
        </AuthContextProvider>
      </Router>
    )

    await act(async () => {
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })

    const a = screen.getByText('filename1');

    fireEvent.click(a)

    await act(async () => {
      await new Promise((res) => {
        setTimeout(res, 1000);
      })
    })
  })
})