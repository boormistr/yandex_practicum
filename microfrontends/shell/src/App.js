import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router, useHistory } from 'react-router-dom';
import {ServiceProvider} from './contexts/CurrentUserContext';

const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const Main = React.lazy(() => import('./components/Main'));
const InfoTooltip = React.lazy(() => import('./components/InfoTooltip'));
const EditProfilePopup = React.lazy(() => import('profile/EditProfilePopup'));
const EditAvatarPopup = React.lazy(() => import('profile/EditAvatarPopup'));
const AddPlacePopup = React.lazy(() => import('cards/AddPlacePopup'));
const ImagePopup = React.lazy(() => import('cards/ImagePopup'));
const PopupWithForm = React.lazy(() => import('cards/PopupWithForm'));
const Register = React.lazy(() => import('auth/Register'));
const Login = React.lazy(() => import('auth/Login'));
const ProtectedRoute = React.lazy(() => import('auth/ProtectedRoute'));
import api from './utils/api';
import * as auth from './utils/auth';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const history = useHistory();

    useEffect(() => {
        api.getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(userUpdate) {
        api.setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api.setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api.addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function onRegister({ email, password }) {
        auth.register(email, password)
            .then((res) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                history.push("/signin");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onLogin({ email, password }) {
        console.log(email, password)
        console.log('here')
        auth.login(email, password)
            .then((res) => {
                setIsLoggedIn(true);
                setEmail(email);
                history.push("/");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onSignOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        history.push("/signin");
    }

    return (
        <ServiceProvider value={currentUser}>
            <div className="page__content">
                <Suspense fallback={<div>Loading...</div>}>
                    <Router>
                        <Header email={email} onSignOut={onSignOut} />
                        <Switch>
                            <Route exact path="/" render={() => (

                                <ProtectedRoute
                                    component={Main}
                                    cards={cards}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    loggedIn={isLoggedIn}
                                />
                            )} />
                            <Route path="/signup" render={() => <Register onRegister={onRegister} />} />
                            <Route path="/signin" render={() => <Login onLogin={onLogin} />} />
                        </Switch>
                        <Footer />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onUpdateUser={handleUpdateUser}
                            onClose={closeAllPopups}
                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onAddPlace={handleAddPlaceSubmit}
                            onClose={closeAllPopups}
                        />
                        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onUpdateAvatar={handleUpdateAvatar}
                            onClose={closeAllPopups}
                        />
                        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                        <InfoTooltip
                            isOpen={isInfoToolTipOpen}
                            onClose={closeAllPopups}
                            status={tooltipStatus}
                        />
                    </Router>
                </Suspense>
            </div>
        </ServiceProvider>
    );
}
console.log('App shell\n' + ServiceProvider)
export default App;
