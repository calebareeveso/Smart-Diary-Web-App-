import React, { Component } from 'react'

// nav bar 
import Nav from './nav'



// css 
import './assets/css/auth.css'
import './assets/css/text.css'
import './assets/css/button.css'
import './assets/css/bg.css'
import './assets/css/progressbar.css'
import './assets/css/scrollBar.css'

// materia UI 
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// link 
import {Link} from 'react-router-dom'


import './assets/css/loader.css'

export default class home extends Component {
    componentDidMount(){
        document.title = 'Smart diary';

    }
    render() {

        return (
            <>
            <Nav/>

            <div className='herobg'>
                 <div className='container pt-5'>


                    
                         <div className='pr-sm-3 mt-sm-3 mt-3 pt-5 pt-sm-1'>
                         <p className='h1 dblue  mt-sm-5 mb-4 pt-sm-5'>Your secret is <br className='d-none d-sm-block'></br> safe in the web

</p>
                          <div className='pt-3'>
                          {/* <Link to='/signup' className='noUnderline'> <Button type="submit" variant="contained" color="primary" className='pribtn py2 mr-3 text-white br hover-filled-slide-right' disableElevation endIcon={<ArrowForwardIosIcon/>}>Get Started</Button></Link> */}
                          {/* <Button href='#about' className="btn btn-outline-light white-btn br py" variant="outlined" style={{border:'3px solid #FFFFFF',color:'#fff'}}>Learn More </Button> */}
                         <Link to='/signup' className='noUnderline'><button className="btnc btn1">
                         <button className="btn1 btn-2 hover-slide-right d-flex px-2">
                            <span>Create a Diary<ArrowForwardIosIcon className='hshift'/></span>
                            
                        </button>
                         </button></Link>
                           
                           </div>
                         </div>
                     

                </div>
                </div>
            </>
        )
    }
}
