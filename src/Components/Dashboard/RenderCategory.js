import {React,useState,useEffect} from 'react';
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
import {postDataAndImage,getdata,getData,BaseUrl,postData} from '../../FetchServices'
import Login from '../LoginCard/Login'
import CreateSession from '../CreateSession/CreateSession'

export default function RenderCategory(props) {
  const {activetab} = props
    const classes = useStyles();
    const [getList,setCategoryList]=useState([])
    const [getEventList,setEventList]=useState([])
    
    let RenderCategoryData=({data})=>{
      // console.log("catefefef",getList);
      return(
          <div key={data.id} className={classes.ImageStyle}>
             <img  src={data.img} className={classes.CategoryImage} />
              <div s>
              <Typography style={{textAlign:'left',paddingLeft:10}}>{data.name}</Typography>
              </div>
          </div>
     )}
 
  

      const getCategoryData =async()=>{
           var categorylist=await getData('category')
           console.log("categorylist",categorylist);
          setCategoryList(categorylist)
          }
         
    

      useEffect(() => {
         console.log("props",props.Data);
        
      }, [])

     

    return (
            <div className={classes.content}>
     
       
       {"Categories" == activetab  ? 
         (<div>
         <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
             <Typography className={classes.CategoryTab} >
             Categories
             </Typography>  
            
          </div>                     
          {getList.map((data,index)=>(
      <RenderCategoryData data={data} />
           ))}
      </div> )
        : null
      }

  
 </div>
   )
}
