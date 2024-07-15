import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/edit-profile" component={EditProfilePopup} />
                <Route path="/edit-avatar" component={EditAvatarPopup} />
            </Switch>
        </Router>
    );
};

export default App;
