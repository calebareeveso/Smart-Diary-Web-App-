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
        this.redirection()
    }


    redirection(){
        setTimeout(() => {
            this.setState({redirect: true})
            
        }, 50);
    }
    render() {


        return (
            <div >
                {this.state.redirect ? 
                <Redirect to={`diary#${localStorage.getItem('DiaryName')}`} />
                 :
                 null
            }

           <div>
               {/* nothing here  */}
           </div>
           </div>
            
        )
    }
}

export default withRouter(redirect); 
