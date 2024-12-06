const constants = {
  baseUrl: "https://gorest.co.in/public/v2",
  endpoints: {
    POSTS: "/posts",
    USERS: "/users",
  },
  redirects: {
    GET_ACCESS_TOKEN: "https://gorest.co.in/my-account/access-tokens",
  },
  localStorage: {
    ACCESS_TOKEN: "accessToken",
    USER_ID: "userId",
  },
};

export default constants;
