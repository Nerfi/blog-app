import React, {useState, useEffect} from 'react';
import firebase from '../../firebase/firebase';

 //NEW TSTING WITH YOUTUBE VIDEO FROM MASKIN
 export const AuthContext = React.createContext();

 export const AuthProvider = (props) => {

  const [currentUser, setCurrentUser ] = useState(null); //there's no user logged in initialy

    useEffect(() => {

      firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user)
      })


    },[]);

    return(
      <AuthContext.Provider
        value={{
          currentUser
        }}
      >
        {props.children}
    </AuthContext.Provider>
    );
 };

//const AuthProvider = (props) => {
  //return (

      // <UserSessionContext.Provider
   // value={{
     // user: null
    //}}>
  //{/*we call (props.children) because we wrap the <App >  component with the AuthPRovider*/}
     // {props.children}
  //  }

   // </UserSessionContext.Provider>
  //);
//};

//export default AuthProvider;

/* example code of whtat Im talking about

cosnt reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
      case "SET_USER":
      return {
        // returning the current state, whatever it might be
        ...state,
        user: action.user
      }
    }
}

*/
