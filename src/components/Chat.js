import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Send as SendIcon, CloudUpload as CloudUploadIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "#337ab7",
    color: "#fff",
    padding: "10px",
  },
  chatBody: {
    flex: "1",
    overflowY: "auto",
    padding: "10px",
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "10px",
    "& div": {
      padding: "7px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#fff",
      maxWidth: "500px",
      wordWrap: "break-word",
    },
  },
  youMessage: {
    alignItems: "flex-end",
    "& div": {
      backgroundColor: "#dcf8c6",
    },
  },
  messageMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    fontSize: "12px",
    color: "#999",
  },
  chatFooter: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #ddd",
  },
  fileInput: {
    display: "none",
  },
}));

function Chat({ socket, username, room }) {
  const classes = useStyles();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [privateMessageUser, setPrivateMessageUser] = useState("");


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
  
      if (privateMessageUser !== "") {
        messageData.privateMessageUser = privateMessageUser;
        await socket.emit("private_message", messageData);
      } else {
        await socket.emit("send_message", messageData);
      }
  
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setPrivateMessageUser("");
    }
  };
  

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // handle file upload logic
  };

  return (
    <div className={classes.chatWindow}>
      <div className={classes.chatHeader}>
        <p>Live Chat</p>
      </div>
      <div className={classes.chatBody}>
  {messageList.map((messageContent, index) => {
    return (
      <div
        className={`${classes.message} ${
          username === messageContent.author ? "" : classes.youMessage
        }`}
        key={index}
      >
        <div className={classes.messageContent}>
          <p>{messageContent.message}</p>
        </div>
        <div className={classes.messageMeta}>
          <p id="time">{messageContent.time}</p>
          <p
            id="author"
            onClick={() =>
              messageContent.author !== username &&
              setPrivateMessageUser(messageContent.author)
            }
            style={{ cursor: "pointer" }}
          >
            {messageContent.author}
          </p>
        </div>
      </div>
    );
  })}
</div>

<div className={classes.chatFooter}>
  {privateMessageUser !== "" && (
    <p style={{ marginRight: "10px" }}>
      Currently messaging: {privateMessageUser}
    </p>
  )}
  <input
    type="file"
    id="file-upload"
    className={classes.fileInput}
    onChange={handleFileUpload}
  />
  <label htmlFor="file-upload">
    <IconButton color="primary" component="span">
      <CloudUploadIcon />
    </IconButton>
  </label>
  <TextField
    variant="outlined"
    label="Type your message here"
    value={currentMessage}
    fullWidth
    onChange={(event) => {
      setCurrentMessage(event.target.value);
    }}
    onKeyPress={(event) => {
      event.key === "Enter" && sendMessage();
    }}
  />
  <Button
    variant="contained"
    color="primary"
    endIcon={<SendIcon />}
    onClick={sendMessage}
  >
    Send
  </Button>
</div>

    </div>
  );
}

export default Chat;