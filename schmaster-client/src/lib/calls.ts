import axios from "axios";

export const getCurrentUser = async ()=>{
    return axios.get(`${import.meta.env.VITE_REACT_URL}/auth/getCurrentUser`, {
      withCredentials: true,
    })  
    .then(function (response) {
  
      return response.data.message;
    })
    .catch(function (error) {
      return error;
  });
  }


  export const SignIn = async (email: string, password: string)=>{
    
    return axios.post(`${import.meta.env.VITE_REACT_URL}/auth/SignIn`,{
        email,
        password,    
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      return response.data.isSign;
    })
    .catch(function (error) {
      return error.data;
  });
  }


  export const SignUp = async (name:string,email: string, password: string)=>{
    return axios.post(`${import.meta.env.VITE_REACT_URL}/auth/SignUp`,{
        name,
        email,
        password
    }
    , {
      withCredentials: true,
    })  
    .then(function (response) {
      return response.data.isSign;
    })
    .catch(function (error) {
      return error.data;
  });
  }

  export const logout = async ()=>{

    return axios.get(`${import.meta.env.VITE_REACT_URL}/auth/logout`,{withCredentials:true})
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      return error;
  });
  }
  


  export const getAllUsers = async ()=>{

    return axios.get(`${import.meta.env.VITE_REACT_URL}/auth/getAllUsers`,{withCredentials:true})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
  });
  }



  export const getUserById = async (user_id: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_URL}/auth/getUserById`,
        { user_id },
        { withCredentials: true }
      );
      
      return response.data.message;
    } catch (error) {
      console.error('Error Getting user by ID:', error);
      throw error; 
    }
  };


  




  /// ========================= STREAKS +++++++++++++++++++


  export const addStreak = async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_URL}/streaks/addStreak`, { 
        
       }, { withCredentials: true });
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error('Error updating streaks:', error);
      return error;
    }
  };

 


export const breakStreak = async ()=>{

    return axios.post(`${import.meta.env.VITE_REACT_URL}/streaks/breakStreak`,{
      
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


export const getUserStreaks = async (user_id:string)=>{
  
  return axios.post(`${import.meta.env.VITE_REACT_URL}/streaks/getUserStreaks`,{
    user_id
  }
  , {
    withCredentials: true,
  })  
  .then(function (response) {
    return response.data.message;
  })
  .catch(function (error) {
    return error;
});
}

  

 