import React from 'react';

// Matria Ui 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// styles 
import '../assets/css/auth.css'
import '../assets/css/text.css'
import '../assets/css/res.css'

// link 
import {Link} from 'react-router-dom'

//nav 
import Nav from '../nav'


// firebase 

import fire from '../../config/fire'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(8, 0, 2),
    boxShadow:'0',
    background: "rgb(50, 174, 227)", 
    width:'30%',
    padding : theme.spacing(1.5),
    color:'#fff',
    '&:hover, &:focus': {
        outline : 'none'
      },
    
  },
  texty: {
    borderBottom: '0px',
  },
}));


function signmeup(e){


  // signmeup starts 


  e.preventDefault();
  let name = document.getElementById('name').value;
  let dname = document.getElementById('dname').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  if(name!=='' && dname!=='' && email!== '' && password!== ''){


 



  fire.auth().createUserWithEmailAndPassword(email, password).then((u)=>{
   
    setTimeout(() => {
      
      const db = fire.firestore()

  let uid = localStorage.getItem('user')
  
  db.collection("users").doc(uid).set({
    name: name,
    diaryname: dname,
    })
    .then(function() {
        console.log("Added name");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    


    // let uid = localStorage.getItem('user')

    // const db = fire.firestore()
    var docRef = db.collection("users").doc(uid);

    docRef.get().then(function(doc) {
        if (doc.exists) {

            localStorage.setItem('DiaryName', doc.data().diaryname)
            localStorage.setItem('Name', doc.data().name)
        } else {
            console.log("No such document!");
            document.getElementById('helper').innerHTML='Unable to create Diary '
        }

        }).catch(function(error) {
            console.log("Error getting document:", error);
            document.getElementById('helper').innerHTML='Unable to create Diary'

        });

        // localStorage.setItem('redirect', true)
    }, 500);
    console.log(u)})
  .catch((error) => {
      console.log(error);
      document.getElementById('helper').innerHTML='Please check your email and ensure password greater than 8 letters'
    })



  }else {
    document.getElementById('helper').innerHTML='Please fill all the input fields correctly'
  }
    // signmeup ends 
}

  // document.title = 'Sign-Up Smart diary';
 function SignUp() {
  const classes = useStyles();

  return (
    <>
   <main>
   <Nav/>
    <div className='jumbotron authbg rounded-0 mb-0'>

    <Container  component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
         
       {/* huge text starts */}
       <p className='text-center h2 fadeblue'>Create Your Smart Diary</p>
       {/* huge text ends */}


        {/* main form starts  */}
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            autoFocus 
            color="primary"
            className={classes.texty}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dname"
            label="Your Diary Name"
            name="name"
            autoComplete="off"
            color="primary"
            className={classes.texty}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            color="primary"
            className={classes.texty}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="primary" 
            autoComplete="current-password"
            className={classes.texty}
          />
         
          {/* button  */}
          <div className='text-center pt-3'>
             <p id='helper' style={{color:'#CB0808'}}> </p>
             </div>

           <div className='text-center'>
           <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
             disableElevation

             onClick={signmeup}
          >
            SIGNUP
          </Button>
           </div>

            {/* button ends  */}

           {/* Link to signup  */}
           <div className='text-center'>
             <p id='helper' style={{color:'#E33232'}}> </p>
           <Link to='/login' className='fadeblue text-center pt-5'> <small >LOGIN</small></Link>
           </div>

             {/* Link to signup ends */}


        </form>
      </div>
      
    </Container>
    </div>
   </main>
    </>
  );
}

export default SignUp;