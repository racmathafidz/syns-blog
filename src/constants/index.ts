const constants = {
  endpoints: {
    GET_POSTS: "/public/v2/posts",
    GET_DETAIL_POSTS: "/public/v2/posts/{{id}}",
    CREATE_POSTS: "/public/v2/users/{{id}}/posts",
    EDIT_POSTS: "/public/v2/posts/{{id}}",
    DELETE_POSTS: "/public/v2/posts/{{id}}",
    GET_USERS: "/public/v2/users/{{id}}",
    CREATE_USERS: "/public/v2/users",
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
