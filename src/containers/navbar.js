import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Settings from './settings'
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    width: "30%",
    fontWeight: 600,
    fontSize: '1.55rem',
    [theme.breakpoints.up('md')]: {
      width: '20%',
      marginLeft: theme.spacing(2)
    }
  },
  search: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '50px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: "10%",
    marginLeft: "10%",
    width: '80%',
    [theme.breakpoints.up('md')]: {
      marginLeft: "10%",
      width: '50%',
      marginRight: "10%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 5
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  section: {
    display: 'flex'
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  let settings = null

  const submit = (event) => {
    event.preventDefault();
    if(value){
     props.history.push('/search?q=' + value, { tracks: 'hello' })
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Musixfy
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={submit}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
              />
            </form>
            <div className={classes.cancelIcon}>
              <IconButton
                edge="end"
                onClick={(e) => { setValue('') }}
                color="inherit"
              >
                <CancelIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.grow} />
          <div className={classes.section}>
            <IconButton
              edge="end"
              aria-label="settings"
              aria-haspopup="true"
              onClick={(e) => { settings.handleOpen() }}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Settings modalcontrol={t => settings = t} />
    </div>
  );
}
