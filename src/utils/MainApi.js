class MainApi {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
      this.customCheck = this.customCheck.bind(this);
    }
  
    customCheck (res) {
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
  
    addArticle = (data, keyword) => {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: keyword,
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        source: data.source.name,
        url: data.url,
        urlToImage: data.urlToImage,
      }),
    }).then((res) => this.customCheck(res));
  };
}

const mainApi = new MainApi({
    baseUrl: "http://localhost:3000/",
  });
  
export default mainApi;
