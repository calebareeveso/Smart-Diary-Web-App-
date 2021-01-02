import React, { Component } from 'react'

// nav bar 
import Nav from './nav'

// images 

import Pv from './assets/img/pv.png'

// css 

import './assets/css/space.css'
import './assets/css/text.css'

export default class privacy extends Component {
    componentDidMount(){
        document.title = 'Privacy Policy';

        document.querySelector('.dot1').classList.remove('active')
        document.querySelector('.dot3').classList.add('active')
        document.querySelector('.dot2').classList.remove('active')
    }
    render() {
        return (
            <>
            <Nav/>
             <div className='privcybg mb-0'>
             <div className='pvimg '>
               <img src={Pv} className='pvimage' alt=''></img>
             </div>

                <div className="container pt1">
                <h1 className='ph1'>PRIVACY POLICY</h1>
                 <p className='psub' style={{color:" #A3E3FF"}}>When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control.</p>
                 <p className='psub2'>Our privacy policy helps you undersands wat information we collecct and why we coolect them.</p>
                  
                 {/* first section  */}

                 <h1 className='headings pt-5 mt-5'>What information we have access to?</h1>
                 <p className='ap'>we collect sensitive information such as your name, password, diary and all your personal information including your diary contents. This is done </p>
                 <p className='ap '> We also collect unique identifiers, browser type and settings, device type and settings, operating system, mobile network information including carrier name , and application version number. We also collect information about the interaction of your browsers, </p>
                 
                 {/* second section  */}
                 <h1 className='headings pt-5  mt-5'>Your activities</h1>
                 <p className='ap'>We collect information about your activity in our services, The activity information we collect may include:</p>


                 {/* list  */}

                 <ul className='hiwlists1 pb-5 mb-0'>
                            <li>Login and out activities</li>
                            <li>Your device information</li>
                            <li>Your browser information</li>
                            <li>Your edit details </li>
                            <li>Your create content details </li>
                            </ul>
                </div>

                <div style={{paddingTop:'5em'}}></div>
             </div>
            </>
        )
    }
}
