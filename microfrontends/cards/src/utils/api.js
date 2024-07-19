class Api {
    constructor({ address, token, groupId }) {
        this._token = token;
        this._groupId = groupId;
        this._address = address;
    }

    getAppInfo() {
        return Promise.all([this.getCardList(), this.getUserInfo()]);
    }

    getCardList() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token,
            },
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    addCard({ name, link }) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, link }),
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    removeCard(cardID) {
        return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    changeLikeCardStatus(cardID, like) {
        return fetch(`${this._address}/${this._groupId}/cards/like/${cardID}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
}

export default Api;
