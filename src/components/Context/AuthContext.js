import React from 'react';

//passing the initial values of the context
const authContext = React.createContext({
   token: null,
    userId: null,
    error: null,
    loading: false
  });

//wrapper component
const Auth =  props => {
  return (
    <authContext.Provider value={authContext}>
    {props.children}
    </authContext.Provider>
  );
}

export {authContext, Auth};
