const APIRequest = {
  request: async function (method, url, body = null) {
    const options = {
      method,
      headers: {},
    };

    if (body) {
      options.body = body;
    }

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  },
};
export default APIRequest;
