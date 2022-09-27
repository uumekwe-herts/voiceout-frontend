// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    //sessionStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    //sessionStorage.setItem('user', JSON.stringify(user));
  }

  export const getUserType = () => {
    return localStorage.getItem('userType');
  }