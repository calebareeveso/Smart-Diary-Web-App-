import React, { Component } from 'react'

import fire from '../../config/fire'


// link 
import {Link} from 'react-router-dom'



// materia UI 
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

// styles 

import './css/nav.css'
import './css/res.css'
import './css/modal.css'
import './css/pages.css'


//special nav icons 

import menu from '../assets/img/b.svg'
import search from '../assets/img/s.svg'
import grid from '../assets/img/g.svg'
import sgrid from '../assets/img/sgrid.svg'
import times from '../assets/img/times.svg'

import n1 from '../assets/img/n1.svg'
import n2 from '../assets/img/n2.svg'
import n3 from '../assets/img/n3.svg'
import n4 from '../assets/img/n4.svg'
import lg from '../assets/img/logout.svg'

// Images 
import EmptyImg from '../assets/img/empty.png'


// modal 

import Modal from 'react-bootstrap/Modal'
import './css/b1.css'



export default class smartDiary extends Component {
    constructor(){
        super();
         this.state = ({
             dname: '',
             reload:true,
             m1:true,
             m2:false,
             m3:false,
             m4:false,
             newd:false,
             userData: [],
             activityLogData: [],
             updated: false,
             time:'',
             Mydname : '',
             stuff: [],
             themeColor:'primary',
             nbcolor: "rgba(50, 174, 227, 0.404)",
             emptyImg: false,
         });
         this.handleShow1 = this.handleShow1.bind(this);
         this.handleClose1 = this.handleClose1.bind(this);

         this.handleShow2 = this.handleShow2.bind(this);
         this.handleClose2 = this.handleClose2.bind(this);

         this.handleShow3 = this.handleShow3.bind(this);
         this.handleClose3 = this.handleClose3.bind(this);

         this.handleShow4 = this.handleShow4.bind(this);
         this.handleClose4 = this.handleClose4.bind(this);

         this.addD = this.addD.bind(this);
         this.closeD = this.closeD.bind(this);

         this.addPages = this.addPages.bind(this);
         this.getData = this.getData.bind(this)

         this.getInfo =this.getInfo.bind(this)
         this.closeUpdate = this.closeUpdate.bind(this)

         this.UpdatePages = this.UpdatePages.bind(this)
         this.deletePages = this.deletePages.bind(this)

         this.getDname = this.getDname.bind(this)

          this.getActivityLog = this.getActivityLog.bind(this)

         this.setActivityLog = this.setActivityLog.bind(this)
         this.changeThemeColor = this.changeThemeColor.bind(this)
         this.cusomizebg = this.cusomizebg.bind(this)

         this.checkemptyImgfunc__1 = this.checkemptyImgfunc__1.bind(this)
         this.emptyImgfunc = this.emptyImgfunc.bind(this)

        //  this.rangev1 = this.rangev1.bind(this)
    
    }

  
   componentDidMount(){
       // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen").click();

       this.getData()

       this.getDname();
       if ( localStorage.getItem('DiaryName')){
        //  window.location.reload(false)
        document.title=`${localStorage.getItem('Name') } Diary - ${localStorage.getItem('DiaryName')}`;
       }

      this.getindication();
     
       this.getsearch();


       this.getime()
       this.getActivityLog()


       if(localStorage.getItem(`alert${localStorage.getItem('user')}`) === 'red'){
            this.OnAlert()
       }



       if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){
        const newcolor =  document.querySelectorAll('.newcolor')

        document.body.style.backgroundColor= localStorage.getItem(`customizecolor${localStorage.getItem('user')}`);

        for(let i = 0; i <  newcolor.length; i++){
              newcolor[i].style.color = localStorage.getItem(`colorUpdate${localStorage.getItem('user')}`);
        }

       }

      

        setTimeout(() => {
            
            //   document.getElementById("emptyimg").classList.add('show1')
            // document.getElementById("preloader").classList.add('none1')
            
            if(this.state.userData.length === 0){
                  document.getElementById("emptyimg").classList.add('show1')
                  document.getElementById("preloader").classList.add('none1')
         }


        }, 5000);
        
   }


//    rangev1(e,span){
//       const rtext= document.getElementById(span);
//       let rangev = document.getElementById(e);

     
//        rtext.innerHTML = rangev.value 
//     //   console.log(rangev)
//       this.setState({
//         rangeh5:rangev.value+10,
//         rangep:rangev.value,
//       })

//       console.log(this.state.rangep)
//     //   console.log(rangev.value)
//    }
    
   OnAlert(){
    

     localStorage.setItem(`alert${localStorage.getItem('user')}`,'red')
     const redAlert = document.querySelectorAll('.logAlert')
     for(let i = 0;i < redAlert.length; i++){

     redAlert[i].style.backgroundColor= localStorage.getItem(`alert${localStorage.getItem('user')}`)
     }
   }



    // close update 

    closeUpdate(){
        this.setState({
            updated: false,
          })
    }
//    update data 

    UpdatePages(){
 
       const  title =  document.getElementById('updatetitle').value;
       const text = document.getElementById('updatetext').value;

        
             console.log(this.state.time)
             const db = fire.firestore()

     
             let uid = localStorage.getItem('user')

             document.getElementById(`title${this.state.time}`).innerHTML = title; 
             document.getElementById(`text${this.state.time}}`).innerHTML = text;
     
             db.collection(uid).doc(this.state.time).set({
            title: title,
            text: text,
            time: this.state.time
            })
            .then(function() {
                console.log("diary updated");

            })
            .catch(function(error) {
                console.error("Error updating diary: ", error);
            });

            this.setState({
                updated: false,
              })

              this.updatelog(title)
              this.OnAlert()
    }
    // delete data 
    deletePages(){
 
       const  title =  document.getElementById('updatetitle').value;
       const text = document.getElementById('updatetext').value;

        
             console.log(this.state.time)
             const db = fire.firestore()

     
             let uid = localStorage.getItem('user')

             document.getElementById(`title${this.state.time}`).innerHTML = title; 
             document.getElementById(`text${this.state.time}}`).innerHTML = text;
     

             db.collection(uid).doc(this.state.time).delete()
            .then(function() {
                console.log("diary delated");

            })
            .catch(function(error) {
                console.error("Error delating diary: ", error);
            });

            this.setState({
                updated: false,
              })

              this.Delatelog(title)
              this.OnAlert()

              setTimeout(() => {
                document.getElementById(`con${this.state.time}`).style.display = 'none';
                
                this.checkemptyImgfunc__1()
              }, 1000);
  
    }


    getActivityLog(){
        const db = fire.firestore()
        let uid = localStorage.getItem('user')

        db.collection(`ActivityLog${uid}`).get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data);
            this.setState({ activityLogData: data });
          });
    }

    setActivityLog(info){
        const db = fire.firestore()

        const timey = document.getElementById('clock').innerHTML;
        let uid = localStorage.getItem('user')





        db.collection(`ActivityLog${uid}`).doc(timey).set({
          details: info,
          })
          .then(function() {
              console.log("Activity Lo added");
          })
          .catch(function(error) {
              console.error("Error writing Activity Log: ", error);
          });


          this.setState(prevState => ({
            stuff: [...prevState.stuff, info]
          }))

          console.log(this.state.stuff)

    }


    createLog(e){
        const time = document.getElementById('clock').innerHTML
        const viewinfo = `${time} you created-${e}`;
        console.log(viewinfo)

       this.setActivityLog(viewinfo)
    }

    updatelog(e){
        const time = document.getElementById('clock').innerHTML
        const viewinfo = `${time} you edited-${e} `;
       console.log(viewinfo)

       this.setActivityLog(viewinfo)
    }
    Delatelog(e){
        const time = document.getElementById('clock').innerHTML
        const viewinfo = `${time} you delated-${e} `;
       console.log(viewinfo)

       this.setActivityLog(viewinfo)
    }
    Logoutlog(){
        const time = document.getElementById('clock').innerHTML
        const viewinfo = `${time} you LogedOut`;
       console.log(viewinfo)

       this.setActivityLog(viewinfo)
    }

    ViewinAL(e){
       const time = document.getElementById('clock').innerHTML
        const viewinfo = `${time} you opened -${e}`;
       console.log(viewinfo)

       this.setActivityLog(viewinfo)
    }
  


   

     getInfo(time){
         this.OnAlert()

        this.setState({
            updated: true,
            time: time
          })

     
     setTimeout(() => {

        let  newTitle = document.getElementById(`title${time}`).innerHTML;
        let newText = document.getElementById(`text${time}}`).innerHTML;
  
        
        document.getElementById('updatetitle').value = newTitle;
        document.getElementById('updatetext').value = newText; 
        document.getElementById('updatetitle').focus();
         
  
        console.log(newTitle)
        console.log(newText)
        console.log(time)
        console.log( document.getElementById('updatetitle').value)
        console.log( document.getElementById('updatetext').value)

        this.ViewinAL(newTitle)
     }, 50);

     
   }

//    geting data 
       getData(){
        const db = fire.firestore();

        let uid = localStorage.getItem('user')
 
        if(localStorage.getItem('user')){

            db.collection(uid).get().then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ userData: data });
              });

        }
       
            
           

        

       
      
        }


    //   search input 
    getsearch(){
     const searchid =  document.getElementById('searchid')
     searchid.addEventListener('focus', ()=>{
        searchid.style.width ='18em'
     })
     searchid.addEventListener('blur', ()=>{
        searchid.style.width ='15em'
     })

    }



    // search functions 

    searchhide(){
        const searchbtn =  document.getElementById('searchbtn')
        const searchy =  document.querySelectorAll('.searchy')
 
        for(let i = 0; i <  searchy.length; i++){
      //    searchy[i].style.display ='none';
      searchy[i].classList.remove('scale')



          searchy[i].classList.remove('none1')
        }
     

          searchbtn.classList.remove('show1')
    }


    desktopNav(){
        const gap = document.querySelector('.gap')
        gap.classList.toggle("nomargin")

        const nav = document.getElementById('dnav')
        nav.classList.toggle('none1')
    }

    // mobile nav 

    mobileNav(){
      const nav = document.getElementById('mnav')
      nav.classList.toggle('nomnav')

    }






    // rename dairy 
    renamed(r1,r2){
        let rename1 = document.getElementById(r1)
        let rename2 = document.getElementById(r2)

        if(rename1.value === rename2.value){
            const db = fire.firestore()

            let uid = localStorage.getItem('user')
            
            db.collection("users").doc(uid).set({
              name: localStorage.getItem('Name'),
              diaryname: rename2.value,
              })
             
              localStorage.setItem(`renameTrue${localStorage.getItem('user')}`, true)
              this.OnAlert()


              localStorage.setItem('DiaryName', rename2.value)
              window.location.reload(true)
              console.log('change')
        }else{
            document.getElementById('renameInfo').innerHTML = 'The two name field must be equal'
        }
    }
    // customize 
    changeThemeColor(){
        this.setState({
            themeColor:'secondary'
        })
        console.log('changeThemeColor')
    }
    addcustomeColor(id){
        const hexcolor = document.getElementById(id)
       
        // let hash = /#/;

        if(hexcolor.value !== '' && hexcolor.value.length === 6 && hexcolor.value !== 'ffffff' && hexcolor.value !== '000000'  && hexcolor.value >= '333333'){
        this.cusomizebg( `#${hexcolor.value}`,'#fff')
        document.getElementById('customeError').innerHTML = '';
        hexcolor.value = '';
        this.changeThemeColor()

        }else if(hexcolor.value === 'ffffff' || hexcolor.value === '000000'){
            localStorage.removeItem(`colorUpdate${localStorage.getItem('user')}`)
            localStorage.removeItem(`customizecolor${localStorage.getItem('user')}`)
            window.location.reload(true)
        }
        else if(hexcolor.value <= '333333'){
            document.body.style.color='#ffffff'
            document.getElementById('customeError').innerHTML = 'Sorry too dark';
        }
        else if(hexcolor.value.match(/#/g)){
            document.getElementById('customeError').innerHTML = 'Please remove "#"';
        }
        else{
        document.getElementById('customeError').innerHTML = 'Hexcode must be equal to 6 letters';
        }
    }
    restoreColor(){
        localStorage.removeItem(`colorUpdate${localStorage.getItem('user')}`)
        localStorage.removeItem(`customizecolor${localStorage.getItem('user')}`)
        window.location.reload(true)
    }
    cusomizebg(customecolor,tcolor){
        const newcolor =  document.querySelectorAll('.newcolor')
       


        localStorage.setItem(`colorUpdate${localStorage.getItem('user')}`,tcolor)
        localStorage.setItem(`customizecolor${localStorage.getItem('user')}`,customecolor)

        document.body.style.backgroundColor = localStorage.getItem(`customizecolor${localStorage.getItem('user')}`);

        for(let i = 0; i <  newcolor.length; i++){
              newcolor[0].style.color = tcolor;
        }
    
        this.changeThemeColor()

        this.setState({
            nbcolor:"#f1f1f1"
        })
        let m1 = document.querySelectorAll('.m1')
        let m2 = document.querySelectorAll('.m2')
        let m3 = document.querySelectorAll('.m3')
        let m4 = document.querySelectorAll('.m4')
 
 
        for(let i = 0; i <  m1.length; i++){
 
        
 
           m3[i].style.backgroundColor="#f1f1f1";

           m2[i].style.backgroundColor="";
           m1[i].style.backgroundColor="";
           m4[i].style.backgroundColor="";
 
 
     }
 
      }
   











    // mobile nav ends 


    searchshow(){
        const searchbtn =  document.getElementById('searchbtn')
          const searchy =  document.querySelectorAll('.searchy')
   
          for(let i = 0; i <  searchy.length; i++){
        //    searchy[i].style.display ='none';
        searchy[3].classList.add('scale')

        setTimeout(() => {
            searchy[2].classList.add('scale')
        }, 200);

      setTimeout(() => {
        searchy[1].classList.add('scale')
      }, 400);
      
      setTimeout(() => {
          
        searchy[0].classList.add('scale')
      }, 400);

     

        setTimeout(() => {
            searchy[i].classList.add('none1')
        }, 900);
          }
       

        setTimeout(() => {
            searchbtn.classList.add('show1')
            document.querySelector('.searchinputsm').focus();
        }, 900);

    }

//    side nav indicator 🤦‍♂️ 

   getindication(){
       let m1 = document.querySelectorAll('.m1')
       let m2 = document.querySelectorAll('.m2')
       let m3 = document.querySelectorAll('.m3')
       let m4 = document.querySelectorAll('.m4')


       for(let i = 0; i <  m1.length; i++){

        if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){
            m1[i].classList.add('nblue')



            m1[i].addEventListener('click',()=>{
                m1[i].classList.add('nblue')
                m2[i].classList.remove('nblue')
                m3[i].classList.remove('nblue')
                m4[i].classList.remove('nblue')
                m2[i].style.backgroundColor="";
                m3[i].style.backgroundColor="";
                m4[i].style.backgroundColor="";
            })
        }else {

            m1[i].style.backgroundColor=this.state.nbcolor;



        m1[i].addEventListener('click',()=>{
          m1[i].style.backgroundColor=this.state.nbcolor;
          m2[i].style.backgroundColor="";
          m3[i].style.backgroundColor="";
          m4[i].style.backgroundColor="";
          m2[i].classList.remove('nblue')
          m3[i].classList.remove('nblue')
          m4[i].classList.remove('nblue')
        })

    }

    }



    for(let i = 0; i <  m2.length; i++){

        if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){
            m2[i].addEventListener('click',()=>{
                m2[i].classList.add('nblue')
                m1[i].classList.remove('nblue')
                m3[i].classList.remove('nblue')
                m4[i].classList.remove('nblue')
                m2[i].style.backgroundColor="";
                m1[i].style.backgroundColor="";
                m3[i].style.backgroundColor="";
                m4[i].style.backgroundColor="";
            })
        }else {

        m2[i].addEventListener('click',()=>{
            m2[i].style.backgroundColor=this.state.nbcolor;
            m1[i].style.backgroundColor="";
            m3[i].style.backgroundColor="";
            m4[i].style.backgroundColor="";
            m2[i].classList.remove('nblue')
            m3[i].classList.remove('nblue')
            m4[i].classList.remove('nblue')
            m1[i].classList.remove('nblue')
        })
      }
    }



    for(let i = 0; i <  m3.length; i++){


        if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){
    
        m3[i].addEventListener('click',()=>{
            m3[i].classList.add('nblue')
            m2[i].classList.remove('nblue')
            m1[i].classList.remove('nblue')
            m4[i].classList.remove('nblue')
            m2[i].style.backgroundColor="";
            m3[i].style.backgroundColor="";
            m4[i].style.backgroundColor="";
            m1[i].style.backgroundColor="";
        })
    }else{
        m3[i].addEventListener('click',()=>{
            m3[i].style.backgroundColor=this.state.nbcolor;
            m1[i].style.backgroundColor="";
            m2[i].style.backgroundColor="";
            m4[i].style.backgroundColor="";
            m2[i].classList.remove('nblue')
            m3[i].classList.remove('nblue')
            m4[i].classList.remove('nblue')
            m1[i].classList.remove('nblue')
        })
    }

    }



    for(let i = 0; i <  m3.length; i++){
        if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){


        m4[i].addEventListener('click',()=>{
            m4[i].classList.add('nblue')
            m2[i].classList.remove('nblue')
            m1[i].classList.remove('nblue')
            m3[i].classList.remove('nblue')
            m2[i].style.backgroundColor="";
            m3[i].style.backgroundColor="";
            m4[i].style.backgroundColor="";
            m1[i].style.backgroundColor="";
        })
      }else {
        m4[i].addEventListener('click',()=>{
            m4[i].style.backgroundColor=this.state.nbcolor;
            m1[i].style.backgroundColor="";
            m2[i].style.backgroundColor="";
            m3[i].style.backgroundColor="";
            m2[i].classList.remove('nblue')
            m3[i].classList.remove('nblue')
            m4[i].classList.remove('nblue')
            m1[i].classList.remove('nblue')
        })
    }
    }


   }

    getDname(){
        if(localStorage.getItem('DiaryName')){
            // document.getElementById('myd').innerHTML = localStorage.getItem('DiaryName');
            this.setState({
                Mydname: localStorage.getItem('DiaryName'),
            })
        }else{
            // document.getElementById('myd').innerHTML = null;
            this.setState({
                Mydname: '',
            })
        }
    }

   addD(){
       this.handleShow1()
       this.setState({
        newd:true,
       })
       

       let m1 = document.querySelectorAll('.m1')
       let m2 = document.querySelectorAll('.m2')
       let m3 = document.querySelectorAll('.m3')
       let m4 = document.querySelectorAll('.m4')
 
    // document.getElementById("moveto1").click();

        setTimeout(() => {
            document.getElementById('dtitle').focus()
        }, 500);
        
       for(let i = 0; i <  m1.length; i++){

        if(localStorage.getItem(`customizecolor${localStorage.getItem('user')}`)){
                m1[i].classList.add('nblue')
                m2[i].classList.remove('nblue')
                m3[i].classList.remove('nblue')
                m4[i].classList.remove('nblue')
                m2[i].style.backgroundColor="";
                m3[i].style.backgroundColor="";
                m4[i].style.backgroundColor="";

        }else {

            m1[i].style.backgroundColor=this.state.nbcolor;
            m2[i].style.backgroundColor="";
            m3[i].style.backgroundColor="";
            m4[i].style.backgroundColor="";

    }

    }


   }

   closeD(){
       this.setState({
        newd:false,
       })
   }


    logout(){
        // this.Logoutlog()
        // this.OnAlert()
        fire.auth().signOut();

        setTimeout(() => {
            window.location.reload(true)
        }, 50);
    }

   
   
  


    addPages() {

        document.getElementById("emptyimg").classList.remove('show1')
        this.setState({
            newd:false,
           })

        const db = fire.firestore()

        const title = document.getElementById('dtitle').value;
        const text = document.getElementById('dtext').value;

        const timey = document.getElementById('clock').innerHTML;
        let uid = localStorage.getItem('user')

       if(title !== '' || text !==''){
        this.createLog(title)

        db.collection(uid).doc(timey).set({
          title: title,
          text: text,
          time: timey
          })
          .then(function() {
              console.log("diary added");


          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });


       const titleTimey = `title${timey}`;
       const textTimey = `text${timey}`;
       const con = `con${timey}`;
       
       const output =  `
       <div class="col-lg-4 col-md-6 col-sm-12 my-2" id=${con}>
      
        <div class="card">
        <div class="card-body onclicky" id=${timey}>
          <h5 class='rangeh5'  id=${titleTimey}>${title}</h5>
          <p class='customize rangep'  id=${textTimey}}>${text}</p>
          <small class='grayme'>${timey}</small>
        </div>
      </div>
    </div>
        `;
          
        
       document.getElementById('data').innerHTML  +=output;



     setTimeout(() => {
        const getclass = document.querySelectorAll(".onclicky");
        for(let i = 0; i <  getclass.length; i++){
            getclass[i].addEventListener('click', ()=>{
                this.getInfo( getclass[i].id)
            })
        }
        
     }, 1000);
        
     this.OnAlert()

       }else{
           console.log('🙄🙄')
       }

       this.emptyImgfunc()
    }


    // getting time 
    getime(){
  
      function getDateTime() {
            var now     = new Date(); 
            var year    = now.getFullYear();
            var month   = now.getMonth()+1; 
            var day     = now.getDate();
            var hour    = now.getHours();
            var minute  = now.getMinutes();
            var second  = now.getSeconds(); 
            if(month.toString().length === 1) {
                 month = '0'+month;
            }
            if(day.toString().length === 1) {
                 day = '0'+day;
            }   
            if(hour.toString().length === 1) {
                 hour = '0'+hour;
            }
            if(minute.toString().length === 1) {
                 minute = '0'+minute;
            }
            if(second.toString().length === 1) {
                 second = '0'+second;
            }   
            var dateTime = day+'-'+month+'-'+year+'-'+hour+':'+minute+':'+second;   
             return dateTime;
        }
    
        // example usage: realtime clock
        setInterval(function(){
            document.getElementById("clock").innerHTML =  getDateTime();
        }, 1000);

    }



    // Saving diary 


    //show modal 

     handleShow1() { this.setState({m1:true,
                                    m2:false,
                                    m3:false,
                                    m4:false});
       const missed = document.querySelectorAll('.card');

        for(let i = 0; i <  missed.length; i++){
    
            missed[i].classList.remove('none1')
    
        }
                     
    }
     handleShow2() { 
        this.OffAlert() 
        
        this.setState({m1:false,
        m2:true,
        m3:false,
        m4:false});


        const missed = document.querySelectorAll('.card');

        for(let i = 0; i <  missed.length; i++){
    
            missed[i].classList.add('none1')
    
        }
     }
     handleShow3() { this.setState({m1:false,
        m2:false,
        m3:true,
        m4:false});

        const missed = document.querySelectorAll('.card');

        for(let i = 0; i <  missed.length; i++){
    
            missed[i].classList.add('none1')
    
        }
     }
     handleShow4() { this.setState({m1:false,
        m2:false,
        m3:false,
        m4:true});


        const missed = document.querySelectorAll('.card');

        for(let i = 0; i <  missed.length; i++){
    
            missed[i].classList.add('none1')
    
        }
     }

    //  close modal 
    handleClose1() { this.setState({m1:false});}
    handleClose2() { this.setState({m2:false});}
    handleClose3() { this.setState({m3:false});}
    handleClose4() { this.setState({m4:false});}





    //  search data
    searchData1(){
        var input, filter, li, a, i,txtValue;
    
    
        input = document.querySelector('.myInput1')
        filter = input.value.toUpperCase();
        
     
        li = document.querySelectorAll('.card-body')
        
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h5")[0];
            
            txtValue = a.textContent || a.innerText;
            
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
                li[i].parentNode.parentNode.style.display = "";
            } else {
                li[i].parentNode.parentNode.style.display = "none";
         }
        }

        console.log('yes')
    }
    //  search data2
    searchData2(){
        var input, filter, li, a, i,txtValue;
    
    
        input = document.querySelector('.myInput2')
        filter = input.value.toUpperCase();
        
     
        li = document.querySelectorAll('.card-body')
        
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h5")[0];
            
            txtValue = a.textContent || a.innerText;
            
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
                li[i].parentNode.parentNode.style.display = "";
            } else {
                li[i].parentNode.parentNode.style.display = "none";
         }
        }

        console.log('yes')
    }


    emptyImgfunc(){
        //    localStorage.setItem('Clear__emptyImg', true);
        //      document.getElementById("emptyimg").classList.add('none1')
        //   document.getElementById("preloader").classList.add('none1')
    }
    checkemptyImgfunc__1(){
    //      if(this.state.userData.length === 0 ){
    //         document.getElementById("emptyimg").classList.add('show1')
    //       document.getElementById("preloader").classList.add('none1')
    //       localStorage.removeItem('Clear__emptyImg');
    //      }
    }

    opentab(sec) {
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        document.getElementById(sec).style.display = "block";
      }

      OffAlert(){
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        document.getElementById("sec2").style.display = "block";


    
         localStorage.setItem(`alert${localStorage.getItem('user')}`,'inherit')
         const redAlert = document.querySelectorAll('.logAlert')
         for(let i = 0;i < redAlert.length; i++){
    
         redAlert[i].style.backgroundColor= localStorage.getItem(`alert${localStorage.getItem('user')}`)
         }
       
       }
    
    render() {


        return (
            <div>
                {/* nav  */}


                <nav className='snav'>


                <div className='d-none searchbg mb-sm-1'  id='searchbtn' style={{width:"100%"}}>
                 <div className='d-flex'>
                 <input type="text" onInput={this.searchData1}  placeholder='Live Search here...' className='searchinputsm myInput1' />
                 <img src={times} className='micon pr-2' alt='' onClick={this.searchhide}></img>
                 </div>
                </div>                
                

                {/* desktop burger  */}
                <IconButton  color="primary" aria-label="Menu" style={{outline:"none"}} onClick={this.desktopNav} className='desktop mb-1 searchy my-2 ml-3'>

                <img src={menu} className='px-1 micon py-1 ' alt='' ></img>

                </IconButton>
                {/* desktop burger ends */}




                {/* mobile burger  */}
                <IconButton  color="primary" aria-label="Menu" style={{outline:"none"}} onClick={this.mobileNav} className='mobile searchy'>

                <img src={menu} className='px-3 micon' alt='' ></img>

                </IconButton>
                {/* mobile burger ends */}

                
                { this.state.m1 ? 
                <p className='diaryname tx searchy newcolor' id='myd'>{this.state.Mydname}</p> 
                : this.state.m2 ?  <p className='diaryname tx searchy newcolor'>Activity Log</p> 
                : this.state.m3 ?  <p className='diaryname tx searchy newcolor'>Theme</p> 
                : this.state.m4 ?  <p className='diaryname tx searchy newcolor'>Settings </p> :  
                <p className='diaryname tx searchy newcolor' id='myd'>{this.state.Mydname}</p>
                
            }
                 
                 
                <div className='pt-1 ty searchy '>
                    <span className="searchinputbg desktopmd">
                        <img src={search}  alt='' className='searchicon m-1 lnav '></img>
                        <input type="search" onInput={this.searchData2}  placeholder='Live Search here...' id='searchid' className='searchinput desktopmd myInput2'/>
                    </span>


                    <IconButton  color="primary" className='desktopsm' aria-label="Search" style={{outline:"none"}} onClick={this.searchshow}>
                    <img src={search}  alt='' className='searchicon m-1 lnav '></img>
                    </IconButton>
                    

                    <IconButton  color="primary" aria-label="add" style={{outline:"none"}} id='moveto1' className='d-none d-sm-inline mx-1' onClick={this.addD}>
                    <img src={grid}  alt='' className=' py-1 lnav'></img>
                    </IconButton>
                </div>
               </nav>







                {/* mobile nav starts */}
 
               {/* <div id='mnav' className='mobile' >
               <div className='d-flex flex-column navleft ' style={{backgroundColor:'#fff',paddingTop:'5em',height:"100vh"}}>
               <IconButton href={`#${localStorage.getItem('DiaryName')}`} className='m1' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow1}>
                   <img src={n1} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#activity-log' className='m2' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow2}>
                   <span className='logAlert'></span>
                   <img src={n2} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#customize' className='m3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow3}>
                   <img src={n3} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#settings' className='m4' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow4}>
                   <img src={n4} className='micon lnav' alt=''></img> 
              </IconButton>
            <Link to='/'>
            <IconButton href='#' className='mt-3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.logout}>
                   <img src={lg} className='micon lnav' alt=''></img> 
              </IconButton>
            </Link>
               </div>
               </div> */}

               <div id='mnav' className='mobile' >
               <div className='d-flex flex-column navleft ' style={{backgroundColor:'#fff',paddingTop:'5em',height:"100vh"}}>
               <IconButton href={`#${localStorage.getItem('DiaryName')}`} id="defaultOpen" className='m1' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec1')}>
                   <img src={n1} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#activity-log' className='m2' color="primary" aria-label="grid" style={{outline:"none"}}  onClick={this.OffAlert}>
                   <span className='logAlert' ></span>
                   <img src={n2} className='micon lnav' alt='' ></img> 
              </IconButton>
               <IconButton href='#customize' className='m3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec3')}>
                   <img src={n3} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#settings' className='m4' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec4')} >
                   <img src={n4} className='micon lnav' alt=''></img> 
              </IconButton>
            <Link to='/'>
            <IconButton href='#' className='mt-3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.logout}>
                   <img src={lg} className='micon lnav' alt=''></img> 
              </IconButton>
            </Link>
               </div>
               </div>

                {/* mobile nav ends */}





                <div id='dnav'>
               <div  className='desktop'>
               <div className='d-flex flex-column navleft '>
               {/* <IconButton href={`#${localStorage.getItem('DiaryName')}`} className='m1' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow1}>
                   <img src={n1} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#activity-log' className='m2' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow2}>
                   <span className='logAlert'></span>
                   <img src={n2} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#customize' className='m3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow3}>
                   <img src={n3} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#settings' className='m4' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.handleShow4}>
                   <img src={n4} className='micon lnav' alt=''></img> 
              </IconButton>
              <Link to='/'>
               <IconButton href='#settings' className=' mt-5' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.logout}>
                   <img src={lg} className='micon lnav' alt=''></img> 
              </IconButton>
              </Link> */}

              <IconButton href={`#${localStorage.getItem('DiaryName')}`} id="defaultOpen" className='m1' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec1')}>
                   <img src={n1} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#activity-log' className='m2' color="primary" aria-label="grid" style={{outline:"none"}}  onClick={this.OffAlert}>
                   <span className='logAlert'></span>
                   <img src={n2} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#customize' className='m3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec3')}>
                   <img src={n3} className='micon lnav' alt=''></img> 
              </IconButton>
               <IconButton href='#settings' className='m4' color="primary" aria-label="grid" style={{outline:"none"}} onClick={() => this.opentab('sec4')} >
                   <img src={n4} className='micon lnav' alt=''></img> 
              </IconButton>
            <Link to='/'>
            <IconButton href='#' className='mt-3' color="primary" aria-label="grid" style={{outline:"none"}} onClick={this.logout}>
                   <img src={lg} className='micon lnav' alt=''></img> 
              </IconButton>
            </Link>
               </div>
               </div>
               </div>


               
               

                {/* nav ends  */}

             <div className='gap'>
                    {/* diary main  section starts*/}
                      <div id='clock' className='inherit'></div>

                      {/* */}
                 
                         {
                        //    querySnapshot.forEach(function(doc) {

                        //     currentComponent = `
                        //      <p> doc.data().title </p>
                        //     `
            
                        //     console.log( doc.data().title);
                        //     console.log( doc.data().text);
                        //     console.log( doc.data().time);
                        // })   
                         }
                        

                  

                  <div>


                        {/* first section  */}
                        
                        <div className="tabcontent" id='sec1'>
                           
                           {/* <div className="container">
                           <div className="row" id='data'>
  
                           </div>
                           </div> */}
                          
  
  
                           <div className="container">
                           <div className="row" id='data'>
  
                              </div>
                              
                           <div className="row" >
                           { this.state.userData.length !== 0 ?  this.state.userData.reverse().map(user => (
  
  
                           <div className="col-lg-4 col-md-6 col-sm-12 my-2 searchmain" id={`con${user.time}`}>
                                <div key={user.uid} className="card h-100">
                                
                                    <div className="card-body" onClick={() => this.getInfo(user.time)}>
                                      <h5 className='rangeh5' id={`title${user.time}`}>{user.title}</h5>
                                      <p className='customize rangep'  id={`text${user.time}}`}>{user.text}</p>
                                      <small className='grayme'>{user.time}</small>
                                  </div>
                                 </div>
                                </div>
                                )) 
                                
                                : 
  // emptyImg
                            
  
                          <>
                     <div className="text-center nothinghere "  id='emptyimg' style={{width:'100vh',heigth:'20vh',display:'none'}}>
                       <img src={EmptyImg} alt='' style={{width:'20em',heigth:'100%',paddingTop:'3em'}}></img>
                     </div>
  
                           
                                <div  className="d-flex justify-content-center align-items-center myloader" id='preloader' style={{width: "100vh",height:"50vh"}}>
                                 <div class="spinner-border text-primary" role="status">
                                  <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          </>
                      
  
                            }
  
                            </div>
                            </div>
                           
  
                            </div>


                  </div>
                         




{/* // / second section  */}
                        
                         <div className="tabcontent" id='sec2'>

                            <div className="container ">
                                <div className="container px-sm-5 mx-sm-5" >
                                  {/* <h3 className="ALh1 pb-1 pb-sm-4 text-left" style={{fontStyle:"italic",fontWeight:'300'}}>Here is a list of all your actions:</h3> */}

                                    <ul className='nobullet'>

                                    <li className='activitylogText pt-1'>
                                        You created Your Diary <strong> -{localStorage.getItem('creationTime')}</strong>
                                    </li>
                                    { localStorage.getItem(`renameTrue${localStorage.getItem('user')}`) ? <li className='activitylogText'>
                                        You renamed Your Diary <strong>-{localStorage.getItem('DiaryName')}</strong>
                                    </li> :
                                    <li className='activitylogText'>
                                        You named Your Diary <strong>-{localStorage.getItem('DiaryName')}</strong>
                                    </li>
                                    }
                                    </ul>
                                    <ul className='nobullet' id='activitylog'>
                                    {this.state.activityLogData.map(user => (
                                      <li  className='activitylogText'>{user.details}</li>

                                        ))}
                                    {this.state.stuff.map(user => (
                                      <li  className='activitylogText'>{user}</li>

                                        ))}
                                    </ul>


                                </div>

                            </div>
                         </div>



{/* // / third section  */}
                      
                                   <div className="tabcontent" id='sec3'>
                                       
                                   <div className='container'>
                         <div className="container">


                    {/*    {localStorage.getItem(`customizecolor${localStorage.getItem('user')}`) ?
                            //         <div>
                            //               <div className="d-flex">
                            //                     <TextField
                            //     margin="normal"
                            //     required
                            //     fullWidth
                            //     id="hexcode1"
                            //     label="Custome color e.g ffffff"
                            //     name="name"
                            //     autoComplete="off"
                            //     autoFocus 
                            //     color="secondary"
                                
                            // />
                            // <Button variant="contained" color="primary"  onClick={()=>this.addcustomeColor("hexcode1")} style={{color: "#000",backgroundColor:"#fff"}} className='nob mx-2 my-2' >
                            //     ADD
                            // </Button>
                            //           </div>
                            //         </div>

                            :
                         <div>
                                {/* <div className="d-flex">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="hexcode2"
                                label="Custome color e.g ffffff"
                                name="name"
                                autoComplete="off"
                                autoFocus 
                                color={this.state.themeColor}
                                // className={classes.texty}
                            />
                            <Button variant="contained" color={this.state.themeColor}  onClick={()=>this.addcustomeColor('hexcode2')} style={{color: "#32AEE3"}} className='nob mx-2 my-2'>
                                ADD 
                            </Button>
                            </div> */}
                         {/* </div> */}
                       
                    {/* } */} 
                            {/* <p id='customeError'></p> */}
                             <div class='row'>
                            <div class='col-lg-2 col-sm-3 col-4'>  
                            <span className='cusomizebgs' style={{background:"#fff",cursor:"pointer"}} onClick={()=>this.restoreColor("rename1","rename2")}></span>
                             <span className='cusomizebgs' style={{background:"#F49B9B",cursor:"pointer"}} onClick={() => this.cusomizebg("#F49B9B",'#FFF')}></span>
                             </div>
                             <div class='col-lg-2 col-sm-3 col-4'> 
                             <span className='cusomizebgs' style={{background:"#9cfc7d",cursor:"pointer"}} onClick={() => this.cusomizebg("#9cfc7d",'#FFF')}></span>
                             <span className='cusomizebgs' style={{background:"#FFCA64",cursor:"pointer"}} onClick={() => this.cusomizebg("#FFCA64",'#FFF')}></span>
                             </div>
                             <div class='col-lg-2 col-sm-3 col-4'> 
                             <span className='cusomizebgs' style={{background:"#9DB4F1",cursor:"pointer"}} onClick={() => this.cusomizebg("#9DB4F1",'#FFF')}></span>
                             <span className='cusomizebgs' style={{background:"#F5C394",cursor:"pointer"}} onClick={() => this.cusomizebg("#F5C394",'#FFF')}></span>
                             </div>
                             <div class='col-lg-2 col-sm-3 col-4'> 
                             <span className='cusomizebgs' style={{background:"#FFFCAD",cursor:"pointer"}} onClick={() => this.cusomizebg("#FFFCAD",'#FFF')}></span>
                             {/* new  */}
                             <span className='cusomizebgs' style={{background:"#A3E3FF",cursor:"pointer"}} onClick={() => this.cusomizebg("#A3E3FF",'#FFF')}></span>
                             </div>
                             <div class='col-lg-2 col-sm-3 col-4'> 
                             <span className='cusomizebgs' style={{background:"#D0CDE1",cursor:"pointer"}} onClick={() => this.cusomizebg("#D0CDE1",'#FFF')}></span>
                             <span className='cusomizebgs' style={{background:"#9892F8",cursor:"pointer"}} onClick={() => this.cusomizebg("#9892F8",'#FFF')}></span>
                             </div>
                             
                             <div class='col-lg-2 col-sm-3 col-4'> 
                             <span className='cusomizebgs' style={{background:"#FF927E",cursor:"pointer"}} onClick={() => this.cusomizebg("#FF927E",'#FFF')}></span>
                             <span className='cusomizebgs' style={{background:"#FFB9B9",cursor:"pointer"}} onClick={() => this.cusomizebg("#FFB9B9",'#FFF')}></span>
                             </div>
                             <div class='col-lg-2 col-sm-3 col-4 d-lg-inline'> 
                             <span className='cusomizebgs' style={{background:"#FD6E54",cursor:"pointer"}} onClick={() => this.cusomizebg("#FD6E54",'#FFF')}></span>
                             </div>
                           </div>
                         </div>
                         <div className="text-center">
                         {/* {localStorage.getItem(`customizecolor${localStorage.getItem('user')}`) ?
                         <Button variant="contained" color="secondary" onClick={()=>this.restoreColor("rename1","rename2")} style={{color: "#000",backgroundColor:"#fff"}} className='nob mx-2 my-2' >
                               restore to default
                         </Button> 
                                :
                         <Button variant="contained" color={this.state.themeColor} onClick={()=>this.restoreColor("rename1","rename2")} style={{color: "#000"}} className='nob mx-2 my-2' >
                               restore to default
                         </Button> 
                            } */}
    
                        
                        
                         </div>
                       
                         </div>

     
                                       
                                       
                                  </div>     
                         


{/* // / fourth section  */}
                        
                        
                        <div className="tabcontent" id='sec4'>
                        <div className='container'>
   {localStorage.getItem(`customizecolor${localStorage.getItem('user')}`) ?
         <div>
               <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="rename1"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                autoFocus 
                                color='secondary'
                                // className={classes.texty}
                            />    
                            
                             <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="rename2"
                            label="Repeat Name"
                            name="name"
                            autoComplete="off"
                            color='secondary'
                            // className={classes.texty}
                        />
         </div>


                        :


                       <div>
                                  <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="rename1"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                autoFocus 
                                color={this.state.themeColor}
                                // className={classes.texty}
                            />    
                             <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="rename2"
                            label="Repeat Name"
                            name="name"
                            autoComplete="off"
                            color={this.state.themeColor}
                            // className={classes.texty}
                        />
                       </div>
    }
                        <p id='renameInfo'></p>

                         <div className="text-center">
                         {localStorage.getItem(`customizecolor${localStorage.getItem('user')}`) ?
                         <Button variant="contained" color="secondary" onClick={()=>this.renamed("rename1","rename2")} style={{color: "#000",backgroundColor:"#fff"}} className='nob mx-2 my-2' >
                               Rename
                         </Button>:
                         <Button variant="contained" color={this.state.themeColor}  onClick={()=>this.renamed("rename1","rename2")} style={{color: "#000"}} className='nob mx-2 my-2' >
                         Rename
                         </Button>
                            }
                         </div>
                        
                    
                         </div>
                        </div>
                         
                       



                







             

          
           
            </div>


            {/* mobile add button  */}

            <IconButton href='#' color="primary" aria-label="add" style={{outline:"none"}} className='sbtnCover d-block d-sm-none' onClick={this.addD}>
            <img src={sgrid}  alt='' className='  sbtm' ></img>
            </IconButton>
                    
            {/* mobile add button ends */}



            {/* update diary  */}

            <Modal show={this.state.updated} onHide={this.closeUpdate} centered size='lg' style={{border:'0'}} class="xindex">
            <Modal.Header  style={{border:'0'}} closeButton>
            <Modal.Title>
            <input type="text" name="text"  id="updatetitle" className='nob' style={{width:"40vw",ouline:'none',border:'0',fontSize:'16px'}}  autofocus/>
            </Modal.Title >
            </Modal.Header>
            <Modal.Body>
            <textarea className='nob' style={{width:"100%",ouline:'none',border:'0'}} id="updatetext" cols="30" rows="10"></textarea>
             </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center' style={{border:'0'}}>
            {/* <Button variant="contained" color="secondary" onClick={this.closeD} className='nob'>
                Close
            </Button> */}
            <Button variant="contained" color="primary" onClick={this.UpdatePages} style={{color: "#FFF"}} className='nob'>
                Save Changes
            </Button>
            
            <DeleteOutlinedIcon onClick={this.deletePages} style={{color: "#FF0000", cursor: "pointer", transform: "translateX(280%)"}} />

            </Modal.Footer>
            </Modal>


            
           






            {/* add diary  */}
                <Modal  show={this.state.newd} onHide={this.closeD} centered size='lg' style={{border:'0'}} class="xindex">
            <Modal.Header  style={{border:'0'}} closeButton>
            <Modal.Title>
               <input  type="text" name="text" id="dtitle" className='nob' style={{width:"40vw",ouline:'none',border:'0',fontSize:'16px'}} placeholder='Title' autofocus/>
            </Modal.Title >
            </Modal.Header>
            <Modal.Body>
            <textarea  placeholder="What's new" className='nob' style={{width:"100%",ouline:'none',border:'0'}} id="dtext" cols="30" rows="10"></textarea>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center' style={{border:'0'}}>
            {/* <Button variant="contained" color="secondary" onClick={this.closeD} className='nob'>
                Close
            </Button> */}
            <Button variant="contained" color="primary" onClick={this.addPages} style={{color: "#FFF"}} className='nob'>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
            </div>

        )
    }
}
