import React, { Component } from 'react'

// react router 

import {Redirect,withRouter } from 'react-router-dom';

// css 
import './assets/css/loader.css'


 class redirect extends Component {


    constructor(){
        super()

        this.state=({
            redirect: false,
            progress: 0
        })
        this.redirection = this.redirection.bind(this)
    }


    
     


    componentDidMount(){
        setTimeout(() => {
        //    document.getElementById('btn').style.display= 'block'
        this.redirection()
        }, 7500);
    }


    redirection(){
        setTimeout(() => {
            this.setState({redirect: true})
            
        }, 2000);
    }
    render() {


        return (
            <div >
                {this.state.redirect ? 
                <Redirect to={`diary#${localStorage.getItem('DiaryName')}`} />
                 :
                 null
            }

            {/* <button id='btn' style={{display:'none'}} className='' onClick={this.redirection}>Open {localStorage.getItem('DiaryName')}</button> */}
          
           <div className="container">
           <div className="d-flex justify-content-center align-items-center text-center" style={{height:'100vh'}}>
        
            <div className="container">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div id="caseGrise">
            <div id="progress">
                <div id="charge"></div>
            </div>
            <div id="load">
                {/* <p>loading</p> */}
            </div>
            </div>

           </div>
            </div>
           </div>
            </div>
            
        )
    }
}

export default withRouter(redirect); 
