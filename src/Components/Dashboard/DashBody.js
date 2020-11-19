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

export default function DashBody(props) {
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
    //  console.log(props.catName)
    let RenderHomeData=({data})=>{
        return(
            <div key={data.name} className="image-wrapper">
        
             <img src={`/Categories/Yoga.jpg`} className={classes.HomeCategoryImage} />
            <div style={{position:'relative'}}>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'bold',fontSize:16}}>Destination Discovery - Vietnam</Typography>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096"}}>Beautiful Destinations</Typography>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096"}}>{data.updated_at}</Typography>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096",backgroundColor:'#EDF2F7' }}>{data.categoryName}</Typography>
            </div>
           
         </div>
        )}

      const getCategoryData =async()=>{
           var categorylist=await getData('category')
           console.log("categorylist",categorylist);
          setCategoryList(categorylist)
          }
          const getEventsData =async()=>{
            var eventslist=await getData('events')
            console.log("eventslist",eventslist);
           setEventList(eventslist)
           }

      useEffect(() => {
          getEventsData()
          getCategoryData()
        
      }, [])

     const EventList=({events})=>{
      //  console.log("2",events.description);
        return(
            <div key={events.id} className="image-wrapper">
            <a href={events.event_url}>
             <img src={`/Categories/Yoga.jpg`} className={classes.HomeCategoryImage} />
             </a>
            <div style={{position:'relative'}}>
        <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'bold',fontSize:16}}>{events.description}</Typography>
        <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096"}}>{events.eventName}</Typography>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096"}}>{events.start_time}</Typography>
            <Typography style={{textAlign:'left',marginLeft:10,fontWeight:'normal',fontSize:14,color: "#718096",backgroundColor:'#EDF2F7' }}>{events.categoryName}</Typography>
            </div>
            
         </div>
        )}

   const EventsBlock=({eventsdata})=>{
     console.log("Comeplete Event data",getEventList);
    //  console.log("events",eventsdata.event[0]);
    //  console.log("111",eventsdata.categoryName);
            return(
              <div style={{paddingTop:20}}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginRight:50,marginLeft:50}}>
                  <Typography className={classes.MainViewHeading} >
                 {eventsdata.categoryName}
                  </Typography>  
                  <Typography className={classes.ViewAll} >
                  View all
                  </Typography> 
              </div>                     
              {eventsdata.event.map((events,index)=>(
                <EventList events={events} />
                  ))}
                </div>
            )}

    return (
            <div className={classes.content}>
        <Toolbar />
        
       {
       "Home" == activetab 
       ?
         (<>
         <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
         <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
           <div >
               {
                 MenuData.map((data, index) => (
                 <MenuDropdown data={data} />
                 ))
                 }
           </div>
           <div style={{paddingRight:10,paddingLeft:5}}>
             <Divider  orientation="vertical" style={{height:50}} />
           </div>
           <div >
               {
                 CategoriesButton.map((data, index) => (
                 <CategoryButton data ={data} />
                 ))
                 }
           </div>
         </div>  
          <div>
              <img src='/HomeTabIcons/Dropdown.svg' height={35} />
         </div>
         </div>
         <div style={{paddingTop:20}}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginRight:50,marginLeft:50}}>
                  <Typography className={classes.MainViewHeading} >
                  Interactive live videos
                  </Typography>  
                  <Typography className={classes.ViewAll} >
                  View all
                  </Typography> 
              </div>                     
              {HomeCategoriesData.map((data,index)=>(
                <RenderHomeData data={data} />
                  ))}
                </div>
       
       
         {/* {getEventList.map((eventsdata)=>(
                <EventsBlock eventsdata={eventsdata} />
                  ))}
         */}

  </> )
      : null }
      
       
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

      {"Become a host" == activetab ?
      (
        // <Login />
        <CreateSession />
        )
        :
        null}
 </div>
   )
}
