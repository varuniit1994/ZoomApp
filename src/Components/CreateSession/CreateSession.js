import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import  PaymentMethod from './PaymentMethod' 
import ZoomCheckbox from './Zoomcheckbox'
var cardStyle = {
    // display: 'block',
    // width: '30vw',
    // transitionDuration: '0.3s',
    // height: '35vw',
    // flex:1
}
const useStyles = makeStyles({
  root: {
    minWidth: 151,
    // width:'50%',
//    textAlign:'center'
    // height:'200vw',
    // maringLeft:250
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Login() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <div style={{justifySelf:'center',alignContent:'center',elevation:15}}>
    <Card className={classes.root}  style={cardStyle}>
      <CardContent style={{flex:1}}>
      {/* <img src='/Sidebar/badge.svg' height={20}  />  */}
      <Typography variant="h5" color="textSecondary" gutterBottom>
      Create Session
        </Typography>
        <div style={{display:'flex',flexDirection:'column',margin:20}}>
      <div style={{}}>
          <Typography style={{textAlign:'left'}}>Event Name</Typography>
      <TextField
        className={classes.margin}
        variant="outlined"
        id="input-with-icon-textfield"
        placeholder="Superhero Training"
        size="small"
        style={{marginBottom:10}}
        fullWidth
        // label="TextField"
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <AccountCircle />
        //     </InputAdornment>
        //   ),
        // }}
      />
          </div>
          <div>
          <Typography style={{textAlign:'left'}}>Description</Typography>
       <TextField
        className={classes.margin}
        variant="outlined"
        id="input-with-icon-textfield"
        placeholder="Description"
        size="large"
        style={{marginBottom:40}}
        fullWidth
        />
        </div>

        <div style={{textAlign:'left',marginTop:20,marginBottom:20}}>
          <Typography style={{textAlign:'left'}}>Zoom Information</Typography>
          <ZoomCheckbox/>
        </div>


        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      
            <div>
        <Button variant="outlined" fullWidth size="small" style={{backgroundColor:'#10ac84',borderColor:"black",borderWidth:1,height:50,width:250,marginLeft:41}}>Integrate Zoom</Button>
            </div>
       </div>

        <div style={{textAlign:'left',marginTop:20,marginBottom:20}}>
          <Typography style={{textAlign:'left'}}>Participation & Payment</Typography>
      <PaymentMethod />
        </div>
       
        
       <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
       <div>
        <Button  size="small" style={{backgroundColor:'#00d2d3',height:50,width:150}}>Save</Button>
            </div>
            <div>
        <Button variant="outlined" fullWidth size="small" style={{color:'black',borderColor:"black",borderWidth:1,height:50,width:150,marginLeft:41}}>Cancel</Button>
            </div>
       </div>
    </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small" style={{backgroundColor:'orange'}}>Login</Button>
      </CardActions> */}
    </Card>
    </div>
  );
}
