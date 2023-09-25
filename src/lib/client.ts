export default class Client {
  constructor(url) {
    this.url = url;
  }

  fetch(method, path, body) {
    const url = `${this.url}${path}`;
    return fetch(url, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: body && JSON.stringify(body),
      method: method,
      mode: 'cors',
    }).then((res) => res.json());
  }

  getAliases() {
    return this.fetch('GET', '/_alias');
  }

  getMappings() {
    return this.fetch('GET', '/_mapping');
  }

  getSettings() {
    return this.fetch('GET', '/_settings');
  }

  getIndexSettings(index) {
    const path = `/${index}/_settings`;
    return this.fetch('GET', path);
  }

  getIndexMapping(index) {
    const path = `/${index}/_mapping`;
    return this.fetch('GET', path);
  }

  analyze(body) {
    return this.fetch('POST', '/_analyze', body);
  }

  analyzeWithIndex(index, body) {
    const path = index ? `/${index}/_analyze` : '/_analyze';
    return this.fetch('POST', path, body);
  }
}
