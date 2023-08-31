import React from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';


function App() {
  return (
    <div className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-500 to-blue-500 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />


      <TimeAndLocation />
    </div>  
  );
}

export default App;
