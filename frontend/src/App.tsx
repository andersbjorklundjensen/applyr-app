import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './state/auth/AuthContext';
import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';
import RegisterView from './views/RegisterView/RegisterView';
import JobListView from './views/JobListView/JobListView';
import JobAddView from './views/JobAddView/JobAddView';
import JobView from './views/JobView/JobView';
import JobEditView from './views/JobEditView/JobEditView';
import SettingsView from './views/SettingsView/SettingsView';

const App = () => (
  <Router>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/list"
          element={
            <ProtectedRoute>
              <JobListView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/add"
          element={
            <ProtectedRoute>
              <JobAddView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/edit/:jobId"
          element={
            <ProtectedRoute>
              <JobEditView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:jobId"
          element={
            <ProtectedRoute>
              <JobView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  </Router>
);

export default App;
