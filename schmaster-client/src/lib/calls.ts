import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect } from "react";

export const getCurrentUser = async (token:any)=>{
    return axios.post('http://localhost:3000/auth/getCurrentUser',{
      token
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      console.log(response.data.message)
      return response.data.message;
    })
    .catch(function (error) {
      return error;
  });
  }


  export const SignIn = async (email: string, password: string)=>{
    
    return axios.post('http://localhost:3000/auth/SignIn',{
        email,
        password,
        
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      Cookies.set('token',response.data.token);
      return response.data.isSign;
    })
    .catch(function (error) {
      return error;
  });
  }


 const sendToken = async (id:string)=>{
    
    return axios.post('http://localhost:3000/auth/sendToken',{
        id
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
  });
  }
  



  export const SignUp = async (email: string, password: string)=>{
    return axios.post('http://localhost:3000/auth/SignUp',{
        email,
        password
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      Cookies.set('token',response.data.token)
      return response.data.message;
    })
    .catch(function (error) {
      return error;
  });
  }

  export const logout = () => {
    Cookies.remove('token');
  };




  /// ========================= STREAKS +++++++++++++++++++


  const addStreak = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios.post('http://localhost:3000/streaks/addStreak', { token }, { withCredentials: true });
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error('Error updating streaks:', error);
      return error;
    }
  };

  export const StreakUpdater = () => {
    useEffect(() => {
      const interval = setInterval(async () => {
        await addStreak();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  
      // Clear interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    return null; // This component doesn't render anything
  };

  

  export const getAllUsers = async ()=>{

    return axios.get('http://localhost:3000/auth/getAllUsers')  
    .then(function (response) {
      
      return response.data;
    })
    .catch(function (error) {
      return error;
  });
  }