import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/add-place" component={AddPlacePopup} />
                <Route path="/image" component={ImagePopup} />
                <Route path="/popup" component={PopupWithForm} />
            </Switch>
        </Router>
    );
};

export default App;
