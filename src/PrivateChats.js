import React from 'react';
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

function ChatBox() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div className={classes.chatHeader}>
              <h3>Chat Contacts</h3>
            </div>
            <Divider />
            <List>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>JD</Avatar>
                </ListItemAvatar>
                <ListItemText primary="John Doe" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>JD</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Jane Doe" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>JD</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Mike Smith" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>JD</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Karen Brown" />
              </ListItem>
              <Divider />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <div className={classes.chatHeader}>
              <h3>John Doe</h3>
            </div>
            <List className={classes.chatList}>
              <ListItem className={classes.chatItem}>
                <ListItemText primary="Hello" secondary="12:30pm" />
              </ListItem>
              <ListItem className={classes.chatItem}>
                <ListItemText primary="How are you?" secondary="12:31pm" />
              </ListItem>
              <ListItem className={classes.chatItem}>
                <ListItemText primary="I am fine" secondary="12:32pm" />
              </ListItem>
              <ListItem className={classes.chatItem}>
                <ListItemText primary="What about you?" secondary="12:33pm" />

              </ListItem>
            </List>
            <Divider />
            <div className={classes.chatFooter}>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                className={classes.input}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.sendButton}
                startIcon={<SendIcon />}
              >
                Send
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.uploadButton}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
}

export default ChatBox;
