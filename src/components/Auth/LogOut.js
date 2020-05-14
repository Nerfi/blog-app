import React,{useContext} from 'react';
import {Redirect} from 'react-router-dom';
//import {doLogOut} from '../Context/AuthContext';

const LogOut = props => {

  const {newData, setNewData} = useContext("");

  return (
      <div>
        <Redirect to="/posts" />
      </div>
    )

};

export default LogOut;
