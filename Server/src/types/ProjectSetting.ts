interface ApiSetting {
  api: {
    version: `v${number}`;
    routes: {
      [group: string]: {
        baseurl: string;
        endpoints: {
          [key: string]: {
            url: string;
            method: string;
          };
        };
      };
    };
  };
}

export { ApiSetting };
