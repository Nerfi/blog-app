import {createContext} from 'react';
//check this out maybe later I will need to delete this
//const initialValue = {
  //  token: null,
    //userId: null,
    //error: null,
    //loading: false
  //};

export const UserContext = createContext(null);
//check out again docs about useContext


/*AQUI VAMOS A TENER QUE VOLVER A CREAR THE CONTEXT AND USE THE CONTEXT API
ALSO WE WILL HAVE TO CREATE THE SWITCH CASES AND THEN WE WILLL HAVE TO DISPATCH
THE ACTIONS: WE WILL HAVE TO USER THAT CONTEXT IN THE <APP/> COMPONENT
AND THEN DISTRIBUTE THAT STATE , SORT TO SPEAK, AROUND THE APP WITH THE
ONAUTHSTATECHANGE METHOD , GIVEN TO US THANKS TO FIREBASE */


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
