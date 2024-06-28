import { useEffect, useState } from 'react'
import PrivateRoute from "./routers/PrivateRouter";
import PublicRoute from "./routers/PublicRouter";
import { jwtDecode } from 'jwt-decode';
import { SnackbarProvider } from 'notistack';

function App() {
  const [user, setUser] = useState({
    token: null,
    userInfo: null,
    logged: false,
    isAdmin: false
  });

  const isUserLogged = localStorage.getItem('isUserLogged');
  const checkLogged = () => {
    if (isUserLogged) {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      setUser({
        token: token,
        userInfo: decoded.fullName,
        logged: true,
        isAdmin: decoded.isAdmin
      })
    }
  };
  useEffect(() => {
    checkLogged()
  }, []);
  return (
    <>
      <SnackbarProvider>
        {
          user.logged ?
            <PrivateRoute user={user} setUser={setUser} /> :
            <PublicRoute user={user} setUser={setUser} />
        }
      </SnackbarProvider>
    </>
  )
}

export default App;
