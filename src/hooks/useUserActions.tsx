import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { authAtom, userAtom, usersAtom } from "state";
import { useFetch } from "./useFetch";
import { useLocation, useNavigate } from "react-router-dom";

export function useUserActions() {
  const baseUrl = `https://conduit.productionready.io/api`;
  const { get, post, put, delete: del } = useFetch();
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    resetUsers: useResetRecoilState(usersAtom),
    resetUser: useResetRecoilState(userAtom),
  };

  function login({ username, password }: any) {
    return post(`${baseUrl}/user`, { username, password }).then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);

      // get return url from location state or default to home page
      const { from }: any = pathname || {
        from: { pathname: "/" },
      };
      navigate(from);
    });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/account/login");
  }

  function register(user: any) {
    return post(`/users`, user).then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
      navigate("/");
    });
  }

  function getAll() {
    return get(baseUrl).then(setUsers as any);
  }

  function getById(id: string) {
    return get(`${baseUrl}/${id}`).then(setUser as any);
  }

  function update(id: any, params: any) {
    return put(`${baseUrl}/${id}`, params).then((x) => {
      // update stored user if the logged in user updated their own record
      if (id === auth?.id) {
        // update local storage
        const user = { ...auth, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        // update auth user in recoil state
        setAuth(user);
      }
      return x;
    });
  }

  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id: string) {
    setUsers((users: any) =>
      users.map((x: any) => {
        // add isDeleting prop to user being deleted
        if (x.id === id) return { ...x, isDeleting: true };

        return x;
      })
    );

    return del(`${baseUrl}/${id}`).then(() => {
      // remove user from list after deleting
      setUsers((users: any) => users.filter((x: any) => x.id !== id));

      // auto logout if the logged in user deleted their own record
      if (id === auth?.id) {
        logout();
      }
    });
  }
}
