const qs = require("qs");

const baseUrl = "http://192.168.56.119"; // 此处替换为你自己的 gitlab 地址

export default (app) => {
  return {
    async post({url, params = {}, query = {}}) {
      const sendUrl = `${baseUrl}${url}?${qs.stringify(query)}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: "json",
          method: "POST",
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
    async methodV({ url, method, params = {}, query = {} }) {
      const sendUrl = `${baseUrl}/api/v4${url}?${qs.stringify(query)}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: "json",
          method,
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
  };
};