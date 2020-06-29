import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom'
import { AppContext } from './context'
import AuthPage from './pages/Auth'
import DashboardPage from './pages/Dashboard'
import Navigation from './components/Navigation'
import { AppProvider } from './context'
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute:React.FC<RouteProps> = ({ children, ...props }) => {
  const { state } = useContext(AppContext)
  return (
    <Route {...props}>
      {state.token ? children : <Redirect to="/login" />}
    </Route>
  )
}

const App:React.FC<{}> = () => {
  return (
    <AppProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/login">
            <AuthPage />
          </Route>
          <PrivateRoute exact path="/dashboard">
            <DashboardPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default App;
