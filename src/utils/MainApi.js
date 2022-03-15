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

  // export const getAllArticles = (token) => {
  //     return fetch(`${this._baseUrl}/articles`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => this.customCheck(res));
  //   };

  getAllArticles = (token) => {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDcyNjI0ODksImV4cCI6MTY0Nzg2NzI4OX0.IAHXwkO9KWWRrR7lL883KTvG5ER8eP-Tn_3Q8VFJtsU`,

      },
    }).then((res) => this.customCheck(res));
  };

  addArticle = (card, keyword) => {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDcyNjI0ODksImV4cCI6MTY0Nzg2NzI4OX0.IAHXwkO9KWWRrR7lL883KTvG5ER8eP-Tn_3Q8VFJtsU`,
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
  
  deleteArticle = (articleId, token) => {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmM2FkOTFmNDgyNzMwNDU1MGQ4OTEiLCJpYXQiOjE2NDcyNjI0ODksImV4cCI6MTY0Nzg2NzI4OX0.IAHXwkO9KWWRrR7lL883KTvG5ER8eP-Tn_3Q8VFJtsU`,
      },
    }).then((res) => this.customCheck(res));
  };
}



const mainApi = new MainApi({
  // baseUrl: "https://news.students.nomoreparties.sbs/api",
  baseUrl: "http://localhost:3013",
  // baseUrl: "https://news.students.nomoreparties.sbs",
});

export default mainApi;
