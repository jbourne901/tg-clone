import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import './sidebar.css';
import Search from "@material-ui/icons/Search";
import BorderColorOutlined from "@material-ui/icons/BorderColorOutlined";
import PhoneOutlined from "@material-ui/icons/PhoneOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import Settings from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import SidebarThread from './sidebar-thread';
import {auth, loadCollection, addCollectionItem, ILoadCollectionOptions} from "../../firebase";
import {IThread, constructThread} from "../../types/thread";
import {selectUser} from "../../redux/user";



const Sidebar = () => {
  const [threads, setThreads] = useState<IThread[]>([]);
  
  const refreshThreads = (threads: IThread[] ) => {
    console.log(`refreshtreads threads=`)
    console.dir(threads)
    setThreads(threads);
  };

  useEffect(() => {
    const options: ILoadCollectionOptions<IThread> = {
      collection: "threads",
      constructFun: constructThread,
      callbackFun: refreshThreads
    };
    loadCollection(options);
  }, []);

  const user = useSelector(selectUser);
  const addThread = () => {
    if(user) {
      const threadName = prompt("Enter a thread name");    
      if(threadName) {
        addCollectionItem("threads", {name: threadName, owner: user.id});
      }
    }    
  }

  let sidebarThreads: JSX.Element[]=[];
  for(let th of threads) {
    console.log(`th.id=${th.id}`)
    sidebarThreads.push(<SidebarThread key={th.id} thread={th} />);
  }

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-search">
          <Search />        
          <input 
            type="text"
            placeholder="Search"
            className="sidebar-search-input"
          />          
        </div>
        <IconButton
          className="sidebar-button" 
          onClick = {() => addThread()}
        >
            <BorderColorOutlined />
        </IconButton>        
      </div>
      <div className="sidebar-threads">
        {sidebarThreads}
      </div>      
      <div className="sidebar-footer">
        <Avatar 
          src = {user?.photo}
          className="sidebar-footer-avatar"
          onClick = { () => handleLogout() }
        />
        <IconButton className="sidebar-button">
          <PhoneOutlined />
        </IconButton>
        <IconButton className="sidebar-button">
          <QuestionAnswer />
        </IconButton>
        <IconButton className="sidebar-button">
          <Settings />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
