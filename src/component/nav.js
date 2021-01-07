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
              
            </nav>
        )
    }
}
