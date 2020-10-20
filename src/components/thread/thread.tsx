import React, {  useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import './thread.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import SendRounded from '@material-ui/icons/SendRounded';
import MicNoneOutlined from '@material-ui/icons/MicNoneOutlined';
import TimerOutlined from '@material-ui/icons/TimerOutlined';

import {addCollectionItem, loadCollection, serverTs, ILoadCollectionOptions} from "../../firebase";
import {selectUser} from "../../redux/user";
import {IMessage, constructMessage} from "../../types/message";
import Message from "../message";
import { selectThread } from '../../redux/selected-thread';
import { formatTimeAgo } from '../../util';


const Thread = () => {
  
  const selectedThread = useSelector(selectThread);

  const [input, setInput] = useState<string>("");
  const user = useSelector(selectUser);

  const sendMessage = (e: React.MouseEvent) => {
    console.log("sendMessage selectedThread=")
    console.dir(selectedThread)
    console.log(`user=`)
    console.dir(user)
    e.preventDefault();
    
    if(input && selectedThread?.id && user && user.id) {
      setInput("");
      const ms: IMessage = constructMessage("", {
        body: input,
        timestamp: serverTs(),
        from: user.displayName,
        fromId: user.id,
        fromPhoto: user.photo
      });
      console.log(`sendMessage ms=`)
      console.dir(ms)
      addCollectionItem("messages", ms, "threads", selectedThread.id);
    }
  }

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect( () => {
    if(selectedThread?.id) {
      const options: ILoadCollectionOptions<IMessage> = {
        collection: "messages",
        constructFun: constructMessage,
        callbackFun: setMessages,
        parentCollection: "threads",
        parentId: selectedThread.id,
        orderBy: "timestamp",
        orderByDesc: true
      };
      loadCollection(options);
    }  
  }, [selectedThread]);
console.log(`thread messages=`)
console.dir(messages)
  let msgs: JSX.Element[] = [];
  let lastTs: string = "";
  let ava: string|undefined;
  for(let m of messages) {
    if(!lastTs) {
      lastTs = formatTimeAgo(m.timestamp);
    }
    if(m.fromPhoto && m.fromPhoto!==user?.photo) {
      ava = m.fromPhoto;
    }    
    msgs.push(<Message key={m.id} message={m} />)
  }


  return (
    <div className="thread">

        <div className="thread-header">
          <div className="thread-info">
            <Avatar src={ava}/>
            <div className="thread-details">
              <h4>{selectedThread?.name}</h4>
              <h5 className="thread-last-seen">Last Seen: {lastTs}</h5>
            </div>
          </div>
          <IconButton           
          >
            <MoreHoriz 
              className="thread-detail-button"             
            />
          </IconButton>
        </div>

        <div className="thread-messages">
          {msgs}
        </div>

        <form className="thread-form">
          <input 
            value={input}
            onChange = {(e) => setInput(e.target.value)}
            className="thread-message-input"
            type="text"
            placeholder="Enter message"
          />
          <IconButton
            className="thread-button"
          >
            <TimerOutlined />
          </IconButton>
          <IconButton
            className="thread-button"
            type="submit"        
            onClick={(e: React.MouseEvent) => sendMessage(e) }>
              <SendRounded />
          </IconButton>
          <IconButton
            className="thread-button"
          >
            <MicNoneOutlined />
          </IconButton>
        </form>      

    </div>
  );
}

export default Thread;
