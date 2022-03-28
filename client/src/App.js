import './App.css';
import { Landing } from './views/Landing';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {Dashboard, Register, ErrorPage} from './views'
import { Stats, AddJob, AllJobs, Profile } from './views/dashboard/';
import { ProtectedRoute } from './views/dashboard/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route index element={<Stats/>}/>
          <Route path='/alljobs' element={<AllJobs/>}/>
          <Route path='/addjobs' element={<AddJob/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/landing' element={<Landing />}/>
        <Route path='/*' element={<ErrorPage></ErrorPage>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
