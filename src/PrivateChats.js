import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import io from 'socket.io-client';
import UserSidebar from './components/UserSidebar';
import { Box } from '@chakra-ui/react';

const useStyles = makeStyles((theme) => ({
root: {
flexGrow: 1,
marginTop: theme.spacing(4),
marginBottom: theme.spacing(4),
},
paper: {
height: 500,
overflow: 'hidden',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
border: '1px solid #ddd',
},
chatHeader: {
backgroundColor: theme.palette.primary.main,
color: '#fff',
padding: theme.spacing(2),
},
chatFooter: {
display: 'flex',
alignItems: 'center',
padding: theme.spacing(1),
borderTop: '1px solid #ddd',
},
input: {
flexGrow: 1,
marginRight: theme.spacing(2),
},
sendButton: {
height: 40,
},
uploadButton: {
height: 40,
marginLeft: theme.spacing(2),
},
chatList: {
flexGrow: 1,
overflow: 'auto',
padding: 0,
},
chatItem: {
padding: theme.spacing(2),
},
}));

function PrivateChats() {
const token = localStorage.getItem('token');
if (!token) {
window.location.href = '/login';
}

const [socket, setSocket] = useState(null);
const [messages, setMessages] = useState([]);

useEffect(() => {
const newSocket = io('http://localhost:8900'); 
setSocket(newSocket);


// handle incoming messages
newSocket.on('message', (message) => {
setMessages((messages) => [...messages, message]);
});

return () => {
newSocket.disconnect();
};
}, []);

const sendMessage = (event) => {
event.preventDefault();
const message = event.target.message.value;


if (message.trim() === '') return;

socket.emit('message', {
message,
timestamp: new Date(),
});

setMessages((messages) => [
...messages,
{
message,
timestamp: new Date(),
fromMe: true,
},
]);

event.target.reset();
};

const classes = useStyles();

return (

<>
<Box className={classes.root}>
<Grid container>
        <Grid item xs={19} sm={4}>
          <UserSidebar />
        </Grid>

<Paper elevation={3} className={classes.paper}>
<div className={classes.chatHeader}>
<h2>Chat Room</h2>
</div>
<List className={classes.chatList}>
{messages.map((message, index) => (
<React.Fragment key={index}>
<ListItem className={classes.chatItem}>
<ListItemAvatar>
<Avatar>{message.fromMe ? 'Me' : 'A'}</Avatar>
</ListItemAvatar>
<ListItemText primary={message.message} secondary={message.timestamp.toLocaleString()} />
</ListItem>
<Divider />
</React.Fragment>
))}
</List>
<form onSubmit={sendMessage}>
<div className={classes.chatFooter}>
<TextField name="message" placeholder="Type your message here..." className={classes.input} variant="outlined" />
<Button
type="submit"
variant="contained"
color="primary"
className={classes.sendButton}
endIcon={<SendIcon />}
>
Send
</Button>
<label htmlFor="file-upload">
<input
id="file-upload"
type="file"
style={{ display: 'none' }}
/>
<Button
component="span"
variant="contained"
className={classes.uploadButton}
endIcon={<CloudUploadIcon />}
>
Upload
</Button>
</label>
</div>
</form>
</Paper>
</Grid>
</Box>


</>
);
}

export default PrivateChats;