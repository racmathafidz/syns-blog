import axios from "axios";
import { getFromLocalStorage } from "./helper";
import constants from "@/constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage(constants.localStorage.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    const statusCode =
      errorResponse && errorResponse ? parseInt(errorResponse.status) : null;

    // REST API Http Response Codes
    // 200: OK. Everything worked as expected.
    // 201: A resource was successfully created in response to a POST request. The Location header contains the URL pointing to the newly created resource.
    // 204: The request was handled successfully and the response contains no body content (like a DELETE request).
    // 304: The resource was not modified. You can use the cached version.
    // 400: Bad request. This could be caused by various actions by the user, such as providing invalid JSON data in the request body etc.
    // 401: Authentication failed.
    // 403: The authenticated user is not allowed to access the specified API endpoint.
    // 404: The requested resource does not exist.
    // 405: Method not allowed. Please check the Allow header for the allowed HTTP methods.
    // 415: Unsupported media type. The requested content type or version number is invalid.
    // 422: Data validation failed (in response to a POST request, for example). Please check the response body for detailed error messages.
    // 429: Too many requests. The request was rejected due to rate limiting.
    // 500: Internal server error. This could be caused by internal program errors.

    switch (statusCode) {
      case 401:
        console.error("Unauthorized - Redirect to login");
        break;
      case 403:
        console.error("Unauthorized - Redirect to login");
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 405:
        console.error("Method not allowed");
        break;
      case 415:
        console.error("Unsupported media type");
        break;
      case 422:
        console.error("Data validation failed");
        break;
      case 429:
        console.error("Too many requests");
        break;
      case 500:
        console.error("Server error - Try again later");
        break;
      default:
        console.error(`Unhandled status code: ${statusCode}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
