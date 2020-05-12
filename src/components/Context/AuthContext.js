//import React,{createContext} from 'react';

//const initialState = {
 // token: null,
  //  userId: null,
  //  error: null,
    //loading: false
//};

//passing the initial values of the context
//const AuthContext = React.createContext(initialState);


//wrapper component
//const AuthProvider =  props => {
 // return (
   // <AuthContext.Provider value={initialState}>
     // {props.children}
   // </AuthContext.Provider>
  //);
//
//


//nuevo context
//1creamos el contexto en la  folder , co su valor inicial, el que queramos
//en este caso initial value
import {createContext} from 'react';

const initialValue = {
    token: null,
    userId: null,
    error: null,
    loading: false
  };

export const UserContext = createContext(initialValue);
