// import logo from './logo.svg';
import './App.css';
import { Dashboard } from './component/Dashboard';
import  {NavigationBar}  from './component/NavigationBar.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { TaskForm } from './component/TaskForm';
import { TaskList } from './component/TaskList';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar/>
        {/* <Dashboard/> */}
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/create-task" element={<TaskForm/>} />
          <Route path="/tasks" element={<TaskList/>} />
         
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
