import React from 'react'

export default React.createContext({
    token:null,
    userId:null,
    userName:null,
    login: (token, userId, userName, tokenExpiration)=>{},
    logout: ()=>{},
    navigateToUrl: (url)=>{}

});