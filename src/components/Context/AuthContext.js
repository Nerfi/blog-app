import React,{useEffect, useState} from 'react';


 export const UserSessionContext = React.createContext(null);

const AuthProvider = (props) => {
  return (
       <UserSessionContext.Provider
    value={{
      user: null
    }}>
  {/*we call (props.children) because we wrap the <App >  component with the AuthPRovider*/}
      {props.children}
    }

    </UserSessionContext.Provider>
  );
};

export default AuthProvider;

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
