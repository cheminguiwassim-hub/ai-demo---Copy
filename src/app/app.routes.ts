/*import { Routes } from '@angular/router';

export const routes: Routes = [];
*/



import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Chat } from './pages/chat/chat';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Userprofile } from './pages/userprofile/userprofile';
import { Userrides } from './pages/userrides/userrides';
import { Userstats } from './pages/userstats/userstats';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { Usernewride } from './pages/usernewride/usernewride';

export const routes: Routes = [
  { path: '', component: Home },      // default page
  { path: 'pages/chat', component: Chat },  // your chat bubble page          // fallback
  {path:'pages/login', component:Login},
   { path:'pages/register' , component:Register},
   {path:'pages/userprofile', component:Userprofile},
  {path:'pages/userrides',component:Userrides}, 
{path:'pages/userstats',component:Userstats},
{path:'pages/userdashboard',component:UserDashboard},
{path:'pages/usernewride',component:Usernewride}

    ,{ path: '**', redirectTo: '' } 
  
/*,
{
  path: 'pages/rides',
  component: 
},
{
  path: 'auth/login',
  component: Login
},
{
  path: 'auth/register',
  component: Register
}*/
];
