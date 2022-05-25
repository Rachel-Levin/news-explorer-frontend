class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this.customCheck = this.customCheck.bind(this);
  }

  customCheck(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Error: ${res.statusText}`)
    }
  }

  register = (email, password, name) => {
    return fetch(`${this._baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Request-Method": "POST",
        // "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this.customCheck(res));
  };

  login = (email, password) => {
    return fetch(`${this._baseUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Request-Method": "POST",
        // "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this.customCheck(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  };

  getUserInfo = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => this.customCheck(res));
  };

  getAllArticles = () => {
    let token = localStorage.getItem("jwt");
    // console.log('asdf',token);
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDk2ODU3NzcsImV4cCI6MTY1MDI5MDU3N30.2Y4z9J14tfU23BuBbBXJ3GLy8QEnD55P-dp5Nkpqb5k`,

      },
    }).then((res) => this.customCheck(res));
  };

  addArticle = (card, keyword, token) => {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDk2ODU3NzcsImV4cCI6MTY1MDI5MDU3N30.2Y4z9J14tfU23BuBbBXJ3GLy8QEnD55P-dp5Nkpqb5k`,
      },
      body: JSON.stringify({
        keyword: keyword,
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        urlToImage: card.urlToImage,
      }),
    }).then((res) => this.customCheck(res));
  };

  deleteArticle = (articleId) => {
    let token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDk2ODU3NzcsImV4cCI6MTY1MDI5MDU3N30.2Y4z9J14tfU23BuBbBXJ3GLy8QEnD55P-dp5Nkpqb5k`,
      },
    }).then((res) => this.customCheck(res));
  };
}



const mainApi = new MainApi({
  // baseUrl: "https://news.students.nomoreparties.sbs/api",
  baseUrl: "http://localhost:3013",
  // baseUrl: "https://news.rachel.students.nomoreparties.sbs",
  // baseUrl: "https://api.news.rachel.students.nomoreparties.sbs",
});

export default mainApi;
