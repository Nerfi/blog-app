import React, {useState, useEffect} from 'react';
import firebase from '../../firebase/firebase';

  //1 we create the context like below

 export const AuthContext = React.createContext();

  /*2 we created the function to handle the logic and we pass 'props', because
  this component will wrap others components, and those components will have access to
  the state we define in here */
 export const AuthProvider = (props) => {

  const [currentUser, setCurrentUser ] = useState(null); //there's no user logged in initialy
  const [userLogged, setUser] = useState(null)

    useEffect(() => {

      firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user)
      })


    },[]);


    console.log(firebase.auth().currentUser, 'current user hereeeeeeeeee');


    return(
      /* 3- every  context have a Provider, the mission of this prop is to
      provide the value that the components that will be wrap around it  will have acces */
      <AuthContext.Provider
        value={{
          currentUser,
          userLogged
        }}
      >
        {props.children}
    </AuthContext.Provider>
    );
 };

