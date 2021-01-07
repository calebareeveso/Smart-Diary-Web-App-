import React, { Component } from 'react';
import './App.css';
import Home from './component/home'
import LogIn from './component/Auth/login'
import Signup from './component/Auth/sigup'
import Redirect from './component/redirect'
import Redirectmain from './component/redirectmain'
import {BrowserRouter as Router, Switch ,Route } from 'react-router-dom';

import Main from './component/main/smartDiary'

// firebase 
import fire from './config/fire'

class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
      newroute: null
    });
    this.authListener = this.authListener.bind(this);
    this.getDname = this.getDname.bind(this);
  }

  componentDidMount() {
    this.authListener();
    this.getDname();
  }

  componentDidUpdate(prevState, prevProps) {
    return this.state.newroute;
  }

  

  getDname(){
    if(localStorage.getItem('DiaryName')){
        this.setState({
          newroute: localStorage.getItem('DiaryName'),
        })


    }else{
      this.setState({
        newroute: null,
      })
    }
}




  authListener() {
    fire.auth().onAuthStateChanged((user) => {
    

      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        localStorage.setItem('creationTime', user.metadata.creationTime);


   

      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        localStorage.removeItem('DiaryName');
        localStorage.removeItem('Name');
        localStorage.removeItem('creationTime');
      }
    });
  }


 render (){
  return (
    <div className="App">
      <Router>
      {/* <Nav/>  */}
     
       {this.state.user ?
       <Switch>
        <Route path ='/diary' exact={true} component={Main} /> 
        {/* Redirect */}

        <Route path='/' exact={true} component={Redirect} />
       <Route path='/login'  component={Redirect} />
       <Route path='/signup'  component={Redirect} />
       <Route path='/privacy-policy'  component={Redirect} />
       <Route path="*" component={Redirectmain} />
       
        {/* Redirect ends */}
       </Switch>

       : 

       <Switch>
       <Route path='/' exact={true} component={Home} />
       <Route path='/login'  component={LogIn} />
       <Route path='/signup'  component={Signup} />
       </Switch>

       }
   
     
     </Router>
    </div>
  );
}
 }
  

export default App;
