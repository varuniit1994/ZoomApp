import React from 'react'
import './Header.css';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
  import TextField from '@material-ui/core/TextField';
  import Search from './Search.png'
  import Button from '@material-ui/core/Button';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '50ch',
      // height:'1ch'
    },
    searchField: {
      margin: theme.spacing(1),
         alignContent:'center',
        
    },
    MainContainer:{
     
    },
    searchInput:{
      height:2
    },
    loginButton: {
      margin: theme.spacing(1),
      backgroundColor:"#FFFFFF",
       },
       signinButton: {
        margin: theme.spacing(1),
        backgroundColor:"black",
        color:'#FFFFFF'
         },

  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      // color:'black'
    },
  }))(Button);
export default function Header() {
    const classes = useStyles();
   
    return (
          <div className="MainContainer">
              <div className="Heading">
                      <h3>OnLive</h3>
                {/* <div className="Search">
                  kjas
                </div> */}
                <div className="Search">
                  <TextField
                      // label="Dense"
                      id="outlined-margin-dense"
                      placeholder="Search for"
                      className={classes.textField}
                    
                      margin="dense"
                      
                      variant="outlined"
                    />
                  </div>
                  <div className="Buttons">
                  <ColorButton variant="contained" className={classes.loginButton}>
                      Log in
                    </ColorButton>
                    <ColorButton variant="contained" className={classes.signinButton}>
                    Sign up
                    </ColorButton>
                    </div>
       {/* <img src={require('./Search.png')} sizes={300} alt="sd" /> */}
              </div>
              
          </div>
    )
}











