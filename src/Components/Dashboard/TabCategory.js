import {React,useEffect,useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {HomeCategoriesData,TabCategoriesData,CategoriesButton,MenuData} from './DummyData'
import {postDataAndImage,getdata,getData,BaseUrl,postData} from '../../FetchServices'
import RenderCategory from './RenderCategory'
const useStyles = makeStyles({
  item: {
       '& span, & svg': {
      fontSize: '0.9rem'
    }
  },
  selected: {
    MuiMenuItem: { // For ListItem, change this to MuiListItem
      root: {
        "&$selected": {       // this is to refer to the prop provided by M-UI
          backgroundColor: "black", // updated backgroundColor
        },
      },
    },
  },
});;

const StyledMenu = withStyles({
  // paper: {
  //   border: '1px solid #d3d4d5',
  // },
 })((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function TabCategory() {
  const classes = useStyles();
  const [getList,setCategoryList]=useState([])
  const [currentTab,setCurrentTab]=useState(null)
   const [anchorEl, setAnchorEl] = useState({categoryOpen:false,open:null});
   const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    console.log("event.currentTarget",event)
    setAnchorEl({categoryOpen:!anchorEl.categoryOpen,open:event.currentTarget})
  };

  const handleClose = () => {
    setAnchorEl({open:null});
  };
const handleTab=(event)=>{
  console.log("text",event.categoryName);
  // var temp = event.categoryName

  // setCurrentTab(event.categoryName)
 
}


const getCategoryData =async()=>{
  var categorylist=await getData('category')
  console.log("categorylist",categorylist);
 setCategoryList(categorylist)
 }
useEffect(() => {
    getCategoryData()

}, [])

  return (
    <div style={{}}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        // variant="contained"
        // color="primary"
         onClick={handleClick}
        // autoCapitalize
        style={{padding:0,paddingTop:5,paddingBottom:5,textTransform:'none',fontSize:16,
        color:"#4A5568"
        }}
      >
        <img src='/Sidebar/Category.svg' height={20} style={{paddingRight:35}} />
       Categories
       {anchorEl.categoryOpen ?
        <ExpandLessIcon style={{paddingLeft:50,color:'#4A5568'}}/>
        :
        <ExpandMoreIcon style={{paddingLeft:50,color:'#4A5568'}}/>}
       
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl.open}
        keepMounted
        
        open={Boolean(anchorEl.open)}
        onClose={handleClose}
         PaperProps={{
          style: {
            marginTop: "10px",
            backgroundColor:'transparent',
          //  paddingBottom: "-10px",
          borderWidth:0,
          // overflow: 'hidden',
          textAlign:'center',
          display:'inline-block',
          // padding:0,
          lineHeight: 0,
          position:'absolute',
          fontSize:10,
          // marginTo:0,
          // backgroundColor:'red'
          }
         }}
      >
      
        {TabCategoriesData.map((data,index)=>(
      // <RenderCategoryData data={data} />
            <StyledMenuItem classes={{ selected: "red" }} key={data.categoryName}
            //  onClick={(event)=>handleTab(event.target.value)}
             >
                <ListItemText 
                key={data.categoryName}
                primary={data.categoryName} 
                style={{margin:0}} 
                onClick={<RenderCategory Data={data} />}
                selected={data.categoryName=="See all" ?true:false} 
                className={classes.item}/>
              </StyledMenuItem>
           ))}
          
      
      </StyledMenu>
    </div>
  );
}
