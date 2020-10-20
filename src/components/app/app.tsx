import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './app.css';
import {auth} from "../../firebase";
import {login, logout, selectUser} from "../../redux/user";
import {IUser, constructUser} from "../../types/user";
import {selectThread} from "../../redux/selected-thread";
import Sidebar from '../sidebar';
import Thread from '../thread';
import Login from '../login';
import Landing from '../landing';

const App = () => {  
  const user = useSelector(selectUser);
  const selectedThread = useSelector(selectThread);
  const dispatch = useDispatch();
  
  useEffect(() => {
    auth.onAuthStateChanged( (authUser) => {
      if(authUser) {
        const us: IUser = constructUser(authUser);
        dispatch( login(us) );
      } else {
        dispatch( logout(undefined) );
      }
    });
  }, [dispatch]);

  console.log(`app user=`)
  console.dir(user)
  let ctl: JSX.Element;
  if(user) {
    if(selectedThread) {
      ctl = (
        <>
          <Sidebar />
          <Thread />
        </>
      );
    } else {
      ctl = (<>
              <Sidebar />
              <Landing />
            </>
      );
    }    
  } else {
    ctl = <Login />
  }

  return (
    <div className="app">
      {ctl}
    </div>
  );
}

export default App;
