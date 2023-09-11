import { useRecoilState } from "recoil";
import { authAtom } from "state/auth";
import { useEffect, useState } from "react";

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

  function request(method: string) {
    return async (url: string, body: any) => {
      const requestOptions: any = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      try {
        setIsLoading(true);
        await fetch(baseUrl + url, requestOptions).then(handleResponse);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
  }

  // helper functions

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL as any);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response: any) {
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
