import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './sidebar-thread.css';
import Avatar from "@material-ui/core/Avatar";
import {IThread} from "../../../types/thread";
import {setSelectedThread, selectThread} from "../../../redux/selected-thread";
import {IMessage, constructMessage} from "../../../types/message";
import {ILoadCollectionOptions, loadCollection} from "../../../firebase";
import { formatTimeAgo } from '../../../util';

interface IProps {
  thread: IThread;
}

const SidebarThread = (props: IProps) => {

  const dispatch = useDispatch();
  const currentThread = useSelector(selectThread);

  const handleSelectThread = () => {
    dispatch( setSelectedThread(props.thread) );
  }

  const [lastMessage, setLastMessage] = useState<IMessage|undefined>(undefined);

  const showLastMessage = (arr: IMessage[]) => {
    console.log(`++++lastMsg=`)
    console.dir(arr)

    if(arr.length>0) {
      setLastMessage(arr[0]);
    }
  }
  
  useEffect( () => {
    console.log(`+++ thisthread = ${props.thread}`)
    if(props.thread?.id) {
      const options: ILoadCollectionOptions<IMessage> = {
        collection: "messages",
        constructFun: constructMessage,
        callbackFun: showLastMessage,
        parentCollection: "threads",
        parentId: props.thread.id,
        orderBy: "timestamp",
        orderByDesc: true,
        limit: 1
      };
      loadCollection(options);
    }    
  }, [props.thread]);

  let cls="";
  if(props.thread.id===currentThread?.id) {
    cls="sidebar-thread-active";
  }
  
  return (
    <div 
      className={`sidebar-thread ${cls}`}
      onClick={(e) => handleSelectThread()}
    >
      <Avatar src={lastMessage?.fromPhoto}/>
      <div className="sidebar-thread-info">
        <h3>
          {props.thread.name}
        </h3>
        <p>
          {props.thread.desc}
        </p>
      </div>      
      <small className="sidebar-thread-ts"> 
        {lastMessage && formatTimeAgo(lastMessage?.timestamp)}
      </small>
    </div>
  );
}

export default SidebarThread;
