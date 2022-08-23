class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

    this._getJSON = function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
  
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getJSON(res))
  };

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getJSON(res))
  };
  

  setUser(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
    .then(res => this._getJSON(res))
    .then(res => console.log(res))
  };

  setCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.place,
        link: card.link,
      })
    })
    .then(res => this._getJSON(res))
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getJSON(res))
  };

  setAvatar(picture) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: picture.link
      })
    })
    .then(res => this._getJSON(res))
  };

  toggleLike(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._getJSON(res))
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => this._getJSON(res))
    }
  };
}

const jwt = localStorage.getItem('jwt');

export const api = new Api({
  baseUrl: 'https://api.mesto.alexeyitm.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`,
  }
});