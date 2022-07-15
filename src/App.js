import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "./store/GlobalStore";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Welcome from "./components/Welcome";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH", payload: { user } });
    });
    console.log(state.auth);
    return () => {
      unsubAuth();
    };
  }, [dispatch, auth]);

  return (
    <div>
      {Object.keys(state.auth).length === 0 || state.auth.user === null ? (
        <Login />
      ) : (
        <div className="app">
          <div className="appBody">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Sidebar />
                  <Welcome />
                </Route>
                <Route exact path="/rooms/:roomId">
                  <Sidebar />
                  <Chat />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
