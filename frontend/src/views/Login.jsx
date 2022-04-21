import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {useHistory} from "react-router-dom"

const Login = (props) => {
  const { store,actions } = useContext(Context);
  const history = useHistory()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dataInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = (event) => {
    event.preventDefault();
    actions.login(data,history)
    setData({
      email: "",
      password: "",
    });
  };

  const [nombre,setNombre]=useState("")
  const [id,setId]=useState("")

  const pintar = () => {
    console.log(store.userData)
    setNombre(store.userData.user.email)
    setId(store.userData.user.id)
  }

  useEffect(()=>{
    if(store.athorized)history.push("/")
  },[])


  return (
    <div className="container">
      <div className="row mt-5">
      {!!store.error && (
              <div className="alert alert-danger h5" role="alert">
                <i className="bi bi-exclamation-circle-fill text-danger"></i> {store.error}
              </div>
            )}
        <div className="col-6 mt-5 mx-auto">
          <form
            action=""
            className="border border-warning rounded"
            onSubmit={sendData}
          >
            <div className="mb-3 p-2">
              <label className="h5" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={dataInput}
                value={data.email}
              />
            </div>
            <div className="mb-3 p-2">
              <label className="h5" htmlFor="password">
                Password: 
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={dataInput}
                value={data.password}
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-warning my-2 py-2 mx-1">
                <p className="h5">Login</p>
              </button>
            </div>
          </form>
          {/* <button onClick={pintar}>PINTAR</button>
          <p>{nombre}</p>
          <p>{id}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
