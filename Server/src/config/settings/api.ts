import { ApiSetting } from "../../types/ProjectSetting";

const Api: ApiSetting = {
  api: {
    version: "v1",
    routes: {
      authentication: {
        baseurl: "auth",
        endpoints: {
          login: { url: "login", method: "POST" },
          logout: { url: "logout", method: "POST" },
          signup: { url: "signup", method: "POST" },
        },
      },
      user: {
        baseurl: "user",
        endpoints: {
          getProfile: { url: "get-profile", method: "GET" },
          updateProfile: { url: "update-profile", method: "PUT" },
          getOthers: { url: "other-users", method: "GET" },
        },
      },
      message: {
        baseurl: "message",
        endpoints: {
          send: { url: "send", method: "POST" },
          get: { url: "get-message", method: "POST" },
        },
      },
    },
  },
};

export { Api };
