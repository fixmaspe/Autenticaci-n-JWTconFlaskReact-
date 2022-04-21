export const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      apiUrl: "http://127.0.0.1:5000/",
      userData: [],
      authorized: false,
      error: null
    },
    actions: {


      isAuthenthicated: () => { //cada vez que se recarge la página va a ejecutar la funcion isAuthenticated
        if (sessionStorage.getItem("isAuth")) {
          setStore({
            authorized: JSON.parse(sessionStorage.getItem("isAuth")),
            userData: JSON.parse(sessionStorage.getItem("userData")),
          });
        }
      },


      register: (data) => {
        fetch(`http://127.0.0.1:5000/api/register`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      },
      login: async (data,history)=>{ //falta agregar history para redireccionar
        const request = {
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(data)
        }

        try{
        const resp = await fetch("http://127.0.0.1:5000/api/login",request)
        
        const infoUser = await resp.json()
        if (infoUser.msg){
          setStore({
            error: infoUser.msg
          })
        }else{
          setStore({
            userData:infoUser,
            authorized:true,
            error:null
          })

          sessionStorage.setItem("isAuth", true);
          sessionStorage.setItem("userData", JSON.stringify(infoUser))
          history.push("/")
          console.log(infoUser)
        }

        }catch(error){
          setStore({
            error: error.message
          })
        }
      },
      getProfile:()=>{
        const {userData}=getStore();
        const {access_token}=userData;
        console.log(access_token)
        fetch("http://127.0.0.1:5000/api/profile",{
          method:"GET",
          headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer " + access_token //AGREGAR ACCESS TOKEN, FUNCIONA
          }
        })
          .then(resp => resp.json())
          .then(data => console.log(data))
          .catch((error) => setStore({error:error.message})) //PREGUNTAR COMO CONSEGUIR EL MSG DE JWT PARA PINTAR EN PROFILE
         
      },
      logout:(history)=>{
        sessionStorage.clear()
        setStore({authorized:false, userData:[]})

        history.push("/")

      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      /* (data) => {
      fetch(`http://127.0.0.1:5000/api/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
      })
          .then((resp) => resp.json())
          .then((response) =>{console.log(response) 
            setStore({userData:response})})
          .catch((error) => console.error(error));
      }, */


    }
  };
};
