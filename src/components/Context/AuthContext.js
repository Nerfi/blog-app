import React from 'react';

const authContext = React.createContext();

const auth =  props => {
  return (
    <authContext.Provider value={}>
    {props.children}
    </authContext.Provider>
  );
}
