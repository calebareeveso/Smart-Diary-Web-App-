import React, { Component } from 'react'

// react router 

import {Redirect,withRouter } from 'react-router-dom';

// css 
import './assets/css/loader.css'


 class instantredirecthome extends Component {


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
            
        }, 2000);
    }
    render() {


        return (
            <div >
                {this.state.redirect ? 
                <Redirect to="/" />
                 :
                 null
            }

           <div>

               {/* empty */}

           </div>
           </div>
            
        )
    }
}

export default withRouter(instantredirecthome); 
