import React, { Component, useState, useEffect } from 'react';
import withRouter from "../components/withRouter";
import Spinner from '../components/Spinner/Spinner';
import { withAlert } from 'react-alert'
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/auth-context'

function MyProfilePage(props) {
  var ProfileImageBase64 = ''
  const Auth = React.useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState();
  const [ProfileImage, setProfileImage] = useState(false);
  const [isLoading, setLoaded] = useState(true);

  const ChoseFileFn = () => {
    document.getElementById('ChoseFile').click()

  }


  const getBase64 = (file) => {

    // Returns a promise which gets resolved or rejected based on the reader events
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Sets up even listeners BEFORE you call reader.readAsDataURL
      reader.onload = function () {
        const result = reader.result
        return resolve(result);
      };

      reader.onerror = function (error) {
        return reject(error);
      };
      // Calls reader function
      reader.readAsDataURL(file);
    })
  }

  const LoadImage = async (e) => {
    console.log('LoadImage')
    console.log(e)
    //  console.log(e.target.files[0])
    console.log(e.target.files[0].size)
    if (e.target.files[0].size > 2000000) {
      const alert = props.alert
      alert.error(`Image is bigger then 2Mb!`, { timeout: 5000 })

      return
    }
    const file = e.target.files[0]

    const base64 = await getBase64(file)
    console.log('base64')
    console.log(base64.substr(0, 255))
    // .then(res => 
    // {
    //   console.log('base64')
    // console.log(res)})

    //console.log(base64.substr(0,255))

    //setSelectedFile(e.target.files[0])
    //const Image = document.getElementById('Image').value;
    //console.log(document.getElementById('Image'))
    ProfileImageBase64 = base64
    ShowImage(base64)
    setProfileImage(true)   
  }


  useEffect(() => {
    //event.preventDefault(); //to be sure no request get send


    let requestBody = {
      query: `
          query{
            getUserData(userId:"${Auth.userId}",token:"${Auth.token}")
            {
              email,
              LastName,
              FirstName,
              MiddleName,
              Sex,
              Birthday,
              Language,
              Image
            }
          }
      `
    };

    console.log(requestBody)

    let { env } = require('../nodemon.json')

    //can be use axios and other API library
    fetch(env.backendGraphQL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        if (res.status !== 200 && res.status !== 201) {
          const alert = props.alert
          alert.error(`Something went wrong...`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
       
        const user = resData.data.getUserData
        console.log(user);

        setLoaded(false)

        if (user.Image!==null){
          setProfileImage(true)   
          ShowImage(user.Image)
        }
        

        document.getElementById('LastName').value = user.LastName;
        document.getElementById('FirstName').value = user.FirstName;
        document.getElementById('MiddleName').value = user.MiddleName;
        document.getElementById('Sex').value = user.Sex;
        document.getElementById('Birthday').value = user.Birthday;
        document.getElementById('Language').value = user.Language;
       

             
        //document.getElementById('Image').value=user.Image;
        //console.log(user.Image)

        //document.getElementById('ProfileImage').src = user.Image;
 
        
      })
      .catch(err => {
        console.log(err);
      });

  })


  const ShowImage = async (ImgBase64) => {
    document.getElementById('ProfileImage').src = ImgBase64;
    await setProfileImage(true)
  }

  const submitHandler = event => {
    event.preventDefault(); //to be sure no request get send
    
    document.getElementById('submit').disabled=true;
    

    console.log('submitHandler')

    const LastName = document.getElementById('LastName').value;
    const FirstName = document.getElementById('FirstName').value;
    const MiddleName = document.getElementById('MiddleName').value;
    const Sex = document.getElementById('Sex').value;
    const Birthday = document.getElementById('Birthday').value;
    const Language = document.getElementById('Language').value;
    //const Image = document.getElementById('Image').value;
    const Image = ProfileImageBase64



    if (Auth.token.trim().length === 0 || Auth.userName.trim().length === 0) {
      return;
    }





    let requestBody = {
      query: `
      mutation
      {
        updateUser(userInput:{
          userId:"${Auth.userId}",
          token:"${Auth.token}",
          LastName:"${LastName}"
          FirstName:"${FirstName}",
          MiddleName:"${MiddleName}",
          Sex:"${Sex}",
          Birthday:"${Birthday}",
          Language:"${Language}",
          Image:"${Image}",
        })
        {
         
            email,
            LastName,
            FirstName,
            MiddleName,
            Sex,
            Birthday,
            Language,
            Image
          
        }
      }
      `
    };

    console.log(requestBody)

    let { env } = require('../nodemon.json')

    //can be use axios and other API library
    fetch(env.backendGraphQL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        if (res.status !== 200 && res.status !== 201) {
          const alert = props.alert
          alert.error(`Something went wrong...`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const alert = props.alert
        alert.success(`Your profile has been saved.`, {
          timeout: 5000, // custom timeout just for this one alert
          onOpen: () => {
            //console.log(resData)

          }, // callback that will be executed after this alert open
          onClose: () => {
            // console.log('closed')



          } // callback that will be executed after this alert is removed
        })
        props.navigate('/')

      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <React.Fragment>
      <center><h1>My Profile</h1></center>
      <ul></ul>
     
      
      {isLoading ? <Spinner />
:
<React.Fragment>



      <Form className="LogIn-form" onSubmit={submitHandler}>
        <center>
          {ProfileImage ?
            <React.Fragment>
              <img onClick={ChoseFileFn} width="150" height="150" id="ProfileImage"  />
            </React.Fragment>
            :
            <Icon.PersonBoundingBox onClick={ChoseFileFn} size={120} />
          }
          <ul>

          </ul>
          <ul>
            <input
              id="ChoseFile"
              type="file"

              value={selectedFile}
              hidden={true}
              onChange={(e) => LoadImage(e)}

            />
          </ul>
        </center>

        <Form.Group className="mb-3" >
          <Form.Label>UserName</Form.Label>
          <Form.Control disabled={true} id="UserName" type="UserName" value={Auth.userName} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>LastName</Form.Label>
          <Form.Control id="LastName" type="LastName" placeholder="Enter your lastname" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>FirstName</Form.Label>
          <Form.Control id="FirstName" type="FirstName" placeholder="Enter your firstname" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>MiddleName</Form.Label>
          <Form.Control id="MiddleName" type="MiddleName" placeholder="Enter your middleName" />
        </Form.Group>


        <Form.Select id="Sex" className="mb-3" aria-label="Default select example">
          <option>Chose your sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>

        </Form.Select>


        <Form.Group className="mb-3" >
          <Form.Label>Birthday</Form.Label>
          <Form.Control id="Birthday" type="date" placeholder="Enter your Birthday" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Language</Form.Label>
          <Form.Control id="Language" type="Language" placeholder="Enter your Language" />
        </Form.Group>




        <center>
          <Button size='lg' id="submit" variant="primary" type="submit">
            Save
          </Button>
        </center>
      </Form>
      </React.Fragment>}
      </React.Fragment>
  );

}
export default withAlert()(withRouter(MyProfilePage));
