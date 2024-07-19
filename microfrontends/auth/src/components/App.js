import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/protected" component={() => <div>Protected Content</div>} />
            </Switch>
        </Router>
    );
};

export default App;
