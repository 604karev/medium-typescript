import { useRecoilState } from "recoil";
import { authAtom } from "state/auth";
import { useEffect, useState } from "react";

type HTTPMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

interface IRequestOptions {
  method: HTTPMethods;
  headers?: { [key: string]: any };
  body?: string;
}

export function useFetch() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = `https://conduit.productionready.io/api`;

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    isLoading: isLoading,
  };

  function request(method: HTTPMethods) {
    return async (url: string, body: string) => {
      const requestOptions: IRequestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body && requestOptions.headers) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      try {
        setIsLoading(true);
        return await fetch(baseUrl + url, requestOptions).then(handleResponse);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
  }

  // helper functions

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token;
    const isLoggedIn = !!token;
    if (!process.env.REACT_APP_API_URL) return;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse<T extends Object>(response: any): T {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem("user");
          setAuth(null);
          // history.push('/account/login');
        }

        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }

      return data;
    });
  }
}
