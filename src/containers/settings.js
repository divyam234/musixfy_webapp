import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import colors from '../constants/color'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changebackg ,changeCacheState} from '../actions/index'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  modal: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
  },
  paper: {
    position: 'fixed',
    width: "50%",
    margin:'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    top: '10%',
    maxHeight:'70%',
    height: '50%!important',
    left: 0,
    right: 0,
    [theme.breakpoints.down('sm')]: {
        width: '70%',
        top:'15%'
      },
  },
  formControl: {
    margin: theme.spacing(1),
    width:"50%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const  Settings = (props) =>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState('');
  
 const ITEM_HEIGHT = 48;
 const ITEM_PADDING_TOP = 8;
 
 const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  React.useEffect(() => {
    props.modalcontrol({
     handleOpen: () => {handleOpen() }
    })
  });

  const handleChange = (event) => {
    setTheme(event.target.value);
    props.changebackg({ color: colors[theme]})
  };
  
  const toggleChange = () => {
   props.changeCacheState({cachefiles:!props.cacheFiles})
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <Fade in={open}>
    <div  className={classes.paper}>
      <i className="material-icons" onClick={(e) => {handleClose() }} 
      style={{ 'position': 'absolute', 'right': '2px', 'top': '2px', 'cursor': 'pointer' }}>close</i>
      <h2 id="modal-title">Settings</h2>
      <h3>Change Theme</h3>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Theme</InputLabel>
        <Select
          labelId="theme-label"
          id="theme-label"
          value={theme}
          onChange={handleChange}
          label="Theme"
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {colors.map((item, index) => {
           return <MenuItem key={index} value={index} >{`Theme -${index+1} `}</MenuItem>
         })}
        </Select>
      </FormControl>
            <br></br>
            <br></br>
      
      <FormControlLabel
        control={
          <Checkbox
            checked={props.cacheFiles}
            onChange={toggleChange}
            name="cacheFiles"
            color="primary"
          />
        }
        label="Cache Files"
      />
    </div>
    </Fade>
  );

  return (
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
      {body}
      </Modal>
  );
}

const mapStateToProps = (state) => {
    return {
      cacheFiles: state.cacheFiles.cachefiles,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      changebackg,
      changeCacheState
    }, dispatch);
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Settings);