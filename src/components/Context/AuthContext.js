import React from 'react';

//initiaiizing the contezt with a null value, user is not logged in
 export const UserSessionContext = React.createContext({
  loggedIn: false,
  user: {}
 });

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
