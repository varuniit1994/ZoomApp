import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
    borderRadius:15,
    borderWidth:1,
    borderColor:'#4A5568',
    color:'#4A5568'
  },
}));

export default function CategoryButton(props) {
  const classes = useStyles();

  return (
    <span style={{paddingRight:5}}>
      <Button
        variant="outlined"
        // style={{textTransform: 'none'}}
        className={classes.button} 
        size="small"      
      >
       
        <img src={'/HomeTabIcons/'+props.data.tag+'.svg'} height={15} />
       &nbsp; &nbsp;
        {props.data.name}
      </Button>
     
  </span>
  );
}
