import {BrowserRouter,Switch,Route} from "react-router-dom"
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./views/Home"
import Register from "./views/Register.jsx"
import injectContext from "./store/appContext";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Private from "./components/Private";


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route  path="/register" component={Register}/>
      <Route  path="/login" component={Login}/>
      {/* <Route path="/profile" component={Profile}/> */}
      <Private path="/profile" component={()=> <Profile/>}/>
    </Switch>

    </BrowserRouter>

  );
}

export default injectContext(App);
