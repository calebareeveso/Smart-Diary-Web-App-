import React, { Component } from 'react'

// link 
import {Link} from 'react-router-dom'

import './assets/css/nav.css'

import Logo from './assets/img/p.svg'


export default class nav extends Component {
     componentDidMount(){
       
        // document.querySelector('.dot1').classList.add('active')
        
     }



     myFunctionNav() {
        const x = document.querySelector(".containerNav")
        x.classList.toggle("change");
        x.classList.toggle("scallly");
        console.log('nice')

        const n1 = document.querySelector(".navt1")
        const n2 = document.querySelector(".navt2")
        const n3 = document.querySelector(".navt3")

        n1.classList.add('up')
        n2.classList.add('up')
        n3.classList.add('up')

      }


     
    render() {
        return (
            <nav className='nav'>
                  <div>
                <Link to='/'>  <img src={Logo} alt=""></img></Link>
                  </div>
                {/* <IconButton   color="primary"  aria-label="Login" style={{outline:"none"}}>
                 <Link to='/login'  className='px-3 py-2 dot1 trans'><img src={Login} alt=''></img></Link>
                </IconButton>

                <IconButton  color="primary" aria-label="Home" style={{outline:"none"}}>
                 <Link to='/'   className='dot2 py-1 trans'><img src={Home} alt=''></img></Link>
                </IconButton>

                <IconButton color="primary" aria-label="Privcy Policy" className='dot3' style={{outline:"none"}}>
                 <Link to='/privacy-policy' className='px-2 trans' style={{padding:"0em 0.4em 0.1em 0.4em"}}><img src={Privacy} alt=''></img></Link>
                </IconButton> */}
                {/* <div className=" ml-auto d-flex align-items-center ">
                  <div className='pr-2'>
                    <span className='dblue navt1'>Login</span>
                    <span className='dblue navt2'>/</span>
                    <span className='dblue navt3'>Signin</span>
                  </div>
                <div className="containerNav "  onClick={() => this.myFunctionNav()}>
                                <div className="bar1"></div>
                                <div className="bar3"></div>

                </div>
                </div> */}
            </nav>
        )
    }
}
