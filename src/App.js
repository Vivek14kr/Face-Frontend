import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { PrivateRoute } from "./components/privateRoute";
import ContactList from "./components/ContactList";
import "./App.css"
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route
        exact
        path="/home"
        element={
          <PrivateRoute>
            <ContactList />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
    // <Home/>
  );
}


export default App;
