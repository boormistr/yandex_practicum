import React, { useState, useContext, lazy, Suspense } from 'react';
import '../blocks/login/login.css';
// import { CurrentUserContext } from 'shell/CurrentUserContext';
// const CurrentUserContext = lazy(() => import('shell/CurrentUserContext'));
// const CurrentUserContext = lazy(() => import('shell/CurrentUserContext').catch(() => {
//   return { default: () => <>Component is not available!</> };
// }));

function Login({ onLogin }) {
  // console.log(CurrentUserContext);
  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    // if (onLogin) {
    //   onLogin(userData).then((newUserData) => {
    //     setCurrentUser(newUserData);
    //   });
    // }
  }

  return (
      // <Suspense fallback={<div>Loading...</div>}>
        <div className="auth-form">
          <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__wrapper">
              <h3 className="auth-form__title">Вход</h3>
              <label className="auth-form__input">
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="auth-form__textfield"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </label>
              <label className="auth-form__input">
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="auth-form__textfield"
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </label>
            </div>
            <button className="auth-form__button" type="submit">
              Войти
            </button>
          </form>
        </div>
      // </Suspense>
  );
}

export default Login;
