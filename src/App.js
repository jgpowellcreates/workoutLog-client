import React, { useState,useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {

  const [sessionToken, setSessionToken] = useState(''); //1 - create new state var that changes upon logging in and is emptied logging out

  useEffect(() => { //2 - runs once upon initial component load (2nd arg is MT array, there is no change the effect is tracking to rerun later)
    if (localStorage.getItem('token')){   //Chrome checks if we have a sessionToken saved in localStorage
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => { //3 - fn takes in a token & saves it locally & in our state variable, sessionToken.
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log("Token is updated!");
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();  //clearing token out from localStorage
    setSessionToken('');    //resetting sessionToken state to an empty string
  }

  const protectedViews = () => {
            //empty string        when local storage clears, it returns 'undefined'
      //so, if these don't match w/ token info, they won't strictly equal and user will be returned to Auth
    return (sessionToken === localStorage.getItem('token') ?
      <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} />)
        //because of that logic, we remove the Auth component from our return. This fn will return it if the user isn't logged in
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {/* <Auth updateToken={updateToken}/> */}
      {protectedViews()}
    </div>
  );
}

export default App;