import {Routes,Route} from 'react-router-dom';
import Aboutcomp from '../components/pages/about/aboutcomp';
import Contactcomp from '../components/pages/contact/contactcomp';
import Errorpage from '../components/pages/error/errorpage';
import Homecomp from '../components/pages/home/homecomp';
import Logincomp from '../components/pages/auth/Logincomp';
import DashboardComp from '../components/admin-panel/pages/dashboard/DashboardComp';
import RouteMiddleware from '../components/midderware/RouteMiddleware';
import Registercompo from '../components/pages/auth/Registercompo';
import Passwordreset from '../components/pages/auth/passwordReset';
import PasswordResetConfirm from '../components/pages/auth/PasswordResetConfirm';
import Usercomponent from '../components/admin-panel/pages/dashboard/users/userComponent';

function Webroute(){
  return(
    

    <Routes>
      <Route path="/" element={<Homecomp/>}/>
      <Route path="/about" element={<Aboutcomp/>}/>
      <Route path="/contact" element={<Contactcomp/>}/>
      <Route path="/login" element={<Logincomp/>}/>
      <Route path="/register" element={<Registercompo/>}/>
      <Route path="/reset-password" element={<Passwordreset/>}/>
      <Route path="/reset-confirm/:token" element={<PasswordResetConfirm/>}/>


      <Route path="*" element={<Errorpage/>}/>

      <Route element={<RouteMiddleware/>}>
         <Route path="/admin" element={<DashboardComp/>}/>
         <Route path="/users" element={<Usercomponent/>}/>
         <Route path="/dashboard" element={<DashboardComp/>}/>
      </Route>


    </Routes>
  
    
  )
}
export default Webroute