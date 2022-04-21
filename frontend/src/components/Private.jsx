import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const Private = ({component: Component, ...otherProps}) => {
  const authorized = sessionStorage.getItem("isAuth");
  return <Route {...otherProps} render={(props) => authorized ? <Component {...props}/> : <Redirect to="/login" /> }></Route>
}

export default Private