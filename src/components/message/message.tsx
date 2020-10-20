import React from 'react';
import {useSelector} from "react-redux";
import './message.css';
import Avatar from "@material-ui/core/Avatar";
import {IMessage} from "../../types/message";
import {selectUser} from "../../redux/user";
import {formatTimeAgo} from "../../util";

interface IProps {
  message: IMessage;
}

const Message = (props: IProps) => {    
  const user = useSelector(selectUser);
  let cls="";
  let cls1="";
  if(user?.id===props.message.fromId) {
    cls="message-sender";
    cls1="message-sender-photo";
  }
  const ts = formatTimeAgo(props.message.timestamp);
  return (
    <div className={`message`}>
      <div className={`message-container ${cls}`}>
        <Avatar 
          src={props.message.fromPhoto} 
          className={`message-photo ${cls1}`}
        />
        <div className="message-contents">
          <p className="message-body"> {props.message.body} </p>        
        </div>      
      </div>      
      <small className={`message-ts ${cls}`}>{ts}</small>
    </div>
  );
}

export default Message;
