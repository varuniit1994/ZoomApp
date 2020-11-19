import { fade,makeStyles,withStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      // flex:1
      // justifyContent:'center'
    },
    TextFieldroot: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor:'#FFFFFF',
      minWidth:414,
            
    },
    Searchbar:{
        width:'200%'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      // width: drawerWidth, 
      borderRight:0
    },
    drawerContainer: {
      flex:1,
      overflow: 'auto',
    //  alignItems:'center',
    flexDirection:'column',
    alignItems:'space-between',
    },
    PrivacyPolicy:{
    position:'absolute',
    bottom:0,
        // justifyContent:'flex-end',
        // paddingTop:370,
        // alignItems:'flex-end'  
        // marginBottom:10
    },
    bottomImage:{   //not used
      position:'absolute',
      // width: getWp(440),
      // height: getHp(245),
      // alignSelf:'center',
      // marginTop:getHp(500),
    },
    content: {
      flex:1,
      // position:'relative',
      // flexGrow: 1,
      // flexWrap:'nowrap',
      // justifyContent:'center',
      backgroundColor:'#FFFFFF',
      padding: theme.spacing(2),
      // padding:5,
      // flexDirection:'row',
  
    },
    /// App bar
    root2: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // flexGrow: 1,
      paddingLeft:10,
      textAlign:'center',
      color:'black',
      // marginRight:350,
      // display: 'none',
      // marginLeft:10,
      // [theme.breakpoints.up('sm')]: {
      //   display: 'block',
      // },
    },
    search: {
      // position: 'relative',
      
      // alignItems:'center',
      // justifySelf:'center',
      // borderRadius: theme.shape.borderRadius,
      backgroundColor: "#dfe6e9",
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
      // },
      // marginLeft: 500,
      // width: '30%',
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(1),
      //   width: 'auto',
      // alignItems: 'center',
      display:'flex',
      flexDirection:'row'
      // },
    },
    searchIcon: {
      // marginLeft:50,
      // padding: theme.spacing(0, 2),
      // height: '100%',
      // marginRight:50,
      // position: 'absolute',
      // pointerEvents: 'none',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      color:'#636e72'
    },
    inputRoot: {
      color: '#636e72',
      // fontWeight:'bold'
      marginRight:200
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    loginButton: {
      // margin: theme.spacing(1),
      marginRight:20,
      backgroundColor:"#FFFFFF",
       },
       signinButton: {
        // margin: theme.spacing(1),
        // maringLeft:5,
        backgroundColor:"black",
        color:'#FFFFFF'
         },
      ActivateTabColor:{
          fill: "#218c74" 
         },
         ImageStyle:{
          display:'inline-block',
          // justifySelf:'left'
         },
         CategoryImage: {
          //    position:'relative',
          width: 245,
          height: 160,
          borderRadius: 20,
          // overflow: "hidden",
          borderWidth: 3,
          borderColor: "red",
          padding:10
        },
        HomeCategoryImage: {
          //    position:'relative',
          width: 330,
          height: 190,
          borderRadius: 20,
          // overflow: "hidden",
          borderWidth: 3,
          borderColor: "red",
          padding:10  
        },
        MainViewHeading:{
          //   position:'absolute',
            fontSize:26,
            fontStyle:'Lato',
          color:'black',
          fontWeight:'700',
          textAlign:'left',
            },
          ViewAll:{
            fontFamily:'Lato',
            fontStyle:'normal',
            fontWeight:'700',
            fontSize:16,
           textAlign:'right', 
          color:'#2F855A',
             },
             CategoryTab:{
              fontSize:26,
              fontStyle:'Lato',
            color:'black',
            paddingLeft:20,
            fontWeight:'700',
            textAlign:'left',
             },
             Buttons:{
                // justifyContent:'space-between'
             } 
  }));