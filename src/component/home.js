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
    //    const  features = [
    //         {img: F1, heading: 'Authentication', text:'We ensure that only you can access your diary'},
    //         {img : F2, heading: 'Customization', text:'We make sure you are able to customize your diary to your satistfaction'},
    //         {img : F3, heading: 'Storage', text:'We provide a web base storage where all your data will be kept'},
    //         {img : F4, heading: 'Activity Log', text:'We show you all your activities...like what you view , what you edited etc'},
    //     ]
        return (
            <>
            <Nav/>

            <div className='herobg'>
                 <div className='container pt-5'>
                     {/* <div className='text-center'>
                    <img src={mHero} alt='' className='col-lg-6 pt-3 pt-sm-0 d-block d-sm-none' style={{width:'100%',heigth:'5vh'}}></img>

                     </div> */}


                    
                         <div className='pr-sm-3 mt-sm-3 mt-3 pt-5 pt-sm-1'>
                         <p className='h1 dblue  mt-sm-5 mb-4 pt-sm-5'>Your secrete is <br className='d-none d-sm-block'></br> safe in web

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

                         {/* <div className="d-flex justify-content-center"> */}
                         
                         {/* <h2>   Opening {localStorage.getItem('DiaryName') ? localStorage.getItem('DiaryName') : <span>Diary...</span> }</h2> */}
                         {/* <div class="spinner-border text-primary spinner-border-lg" role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                        </div>
                         <div id="caseGrise">
            <div id="progress">
                <div id="charge"></div>
            </div>
            <div id="load"> */}
                {/* <p>loading</p> */}
            {/* </div>
            </div> */}

                     

                </div>
                </div>
            </>
        )
    }
}
