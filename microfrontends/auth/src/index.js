import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

console.log('auth')
// ReactDOM.render(<App />, document.getElementById('root'));

export { Register, Login, ProtectedRoute };
