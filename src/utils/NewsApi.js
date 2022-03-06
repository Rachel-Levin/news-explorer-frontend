// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('4ae4d0cebb2f4f89a5f14c08796ef8db');
// // To query /v2/everything
// // You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });


///////////////////////////
class NewsApi {
  constructor({ baseUrl, headers, from, to }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.from = from;
    this.to = to;
    this._customNewsFetch = this._customNewsFetch.bind(this);
  }

  _customNewsFetch = (url, headers) =>
    fetch(url, headers)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })


      getInitialNews(keyword) {
        let news_url = `${this._baseUrl}?q=${keyword}&from=${this._from}&to=${this._to}&pageSize=100&apiKey=4ae4d0cebb2f4f89a5f14c08796ef8db`;
        return this._customNewsFetch(news_url, {
          headers: this._headers,
        })
      }
}

  //Calculate one week ago:
  const date = new Date();
  const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  const day = last.getDate();
  const month = last.getMonth() + 1;
  const year = last.getFullYear();
  const from = year + "/" + month + "/" + day;
  const to = date;

  const newsApi = new NewsApi({
    baseUrl: "https://nomoreparties.co/news/v2/everything",
    headers: {
      // authorization: "c9fcdf91-0946-4f38-ad4e-ad86375bc281",
      // authorization: 'Bearer ' + localStorage.getItem('token'),
      "Content-Type": "application/json"
    },
    from: from,
    to: to
  });
  
  export default newsApi;