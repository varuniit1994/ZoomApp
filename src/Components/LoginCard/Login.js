import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

var cardStyle = {
    // display: 'block',
    // width: '30vw',
    // transitionDuration: '0.3s',
    height: '35vw',
    flex:1
}
const useStyles = makeStyles({
  root: {
    minWidth: 151,
    width:'50%',
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
      <div style={{marginLeft:250,justifySelf:'center',alignContent:'center'}}>
    <Card className={classes.root}  style={cardStyle}>
      <CardContent style={{flex:1,maringLeft:250}}>
      {/* <img src='/Sidebar/badge.svg' height={20}  />  */}
      <Typography variant="h5" color="textSecondary" gutterBottom>
         Login
        </Typography>
        <div style={{display:'flex',flexDirection:'column',margin:20}}>
      <div style={{}}>
      <TextField
        className={classes.margin}
        variant="outlined"
        id="input-with-icon-textfield"
        placeholder="Yours@example.com"
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
       <TextField
        className={classes.margin}
        variant="outlined"
        id="input-with-icon-textfield"
        placeholder="Your Password"
        size="small"
        style={{marginBottom:40}}
        fullWidth
        />
        </div>
       
        
        <div>
        <Button fullWidth size="small" style={{backgroundColor:'#e74c3c',height:60}}>Login</Button>
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
