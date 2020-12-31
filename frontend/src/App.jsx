import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
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
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route path="/login" component={LoginView} exact />
        <Route path="/register" component={RegisterView} exact />
        <ProtectedRoute path="/settings" component={SettingsView} exact />
        <ProtectedRoute path="/job/list" component={JobListView} exact />
        <ProtectedRoute path="/job/add" component={JobAddView} exact />
        <ProtectedRoute path="/job/edit/:jobId" component={JobEditView} exact />
        <ProtectedRoute path="/job/:jobId" component={JobView} exact />
      </Switch>
    </AuthContextProvider>
  </Router>
);

export default App;
