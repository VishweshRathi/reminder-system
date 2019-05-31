import React from 'react';
import classes from './Spinner.css'
function App() {

  return(
      <div style={{background:" rgba(0,0,0,0.8)", position: "fixed", width: "100%", height: "100%", top: "0", zIndex: "5"}}>
        <div style={{top: "30%"}} className = {classes.loader}>Loading...</div>
      </div>
   
  );
}

export default App;