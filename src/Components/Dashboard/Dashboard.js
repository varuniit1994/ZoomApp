import {React,useState} from 'react';
import { fade,makeStyles,withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import VideocamIcon from '@material-ui/icons/Videocam';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuDropdown from '../ReusableComponents/MenuDropdown'
import './Dashboard.css'
import Divider from '@material-ui/core/Divider';
import CategoryButton from '../ReusableComponents/CategoryButton'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {useStyles} from './style'
import {HomeCategoriesData,CategoriesData,CategoriesButton,MenuData} from './DummyData'
import DashBody from './DashBody'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TabCategory from './TabCategory'
const innerWidth = window.innerHeight;

export default function ClippedDrawer() 
{
  const classes = useStyles();
  const [state,setState]=useState({autofocus:'Home',activetab:'Home'})

    const onPressTab=(text)=>{
      setState({activetab:text,autofocus:false})
      console.log(text);
    } 

  return (
    <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
       <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',padding:10,alignItems:'center'}}>
            <div style={{flexDirection:'row',display:'flex'}}>
             <div>
               <img src='/Header/Onlive.svg' height={30} className="ImageStyle" />
             </div>
              <div>
                <Typography className={classes.title} variant="h6" noWrap>
                   Onlive
                </Typography>
              </div>
            </div>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}> */}
              {/* <SearchIcon className={classes.searchIcon} /> */}
            {/* </div> */}
            <TextField
                id="outlined-name"
                // label="Name"
                // value={name}
                // onChange={handleChange}
                variant="outlined"
                size="small"
                className={classes.Searchbar}
              />
          </div>
          <div styles={classes.Buttons}>
                    <Button variant="contained" className={classes.loginButton}>
                        Log in
                    </Button>
                    <Button variant="contained" className={classes.signinButton}>
                       Sign up
                    </Button>
         </div>
      </div>
      </AppBar>



      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div>
                <List>
                        {['Home', 'Categories', 'Become a host'].map((text, index) => (
                          <ListItem 
                          //  autoFocus ={text == state.autofocus ? true : false }
                          //  selected={text==="Categories" ? true : false}
                          button={true}
                          onClick={() => onPressTab (text) }
                          key={text} 
                          style={text == state.activetab ? {backgroundColor:'#F0FFF4',borderTopRightRadius:20,borderBottomRightRadius:20} : null} 
                          
                          >
                            <ListItemIcon>{index == 0 ? 
                            <VideocamIcon className={text == state.activetab ?classes.ActivateTabColor:null}  /> : index == 1 ?  
                            //  <img src='/Sidebar/Category.svg' height={20}  style={text == state.activetab ?classes.ActivateTabColor:null} /> 
                            <TabCategory  />
                          //  null
                            : false ? <NotificationsIcon />  : true ?  <AddCircleOutlineIcon  className={text == state.activetab ?classes.ActivateTabColor:null}/> : null }
                            </ListItemIcon>
                            {text=="Categories" ?
                              //  <TabCategory />
                              null
                              :
                              <ListItemText primary={text} style={text == state.activetab ? {color:"#218c74" } : {color:'#4A5568'}} />}
                          </ListItem>
                        
                        ))}
                  </List>
            </div> 
             <div  className={classes.PrivacyPolicy}>
                  {/* <div  className={classes.bottomImage}> */}
                <Button style={{fontSize:8,fontWeight:'bold'}}>Privacy</Button>
                <Button style={{fontSize:8,fontWeight:'bold'}}>Help</Button>
                <Button style={{fontSize:8,fontWeight:'bold'}}>Theme</Button>
                    {/* </div> */}
           
            </div>
        </div>
      </Drawer>

      <DashBody activetab={state.activetab} />
    </div>
  );
}


