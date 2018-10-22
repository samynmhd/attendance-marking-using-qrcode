import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// Admin Routes
import AdminLogin from './views/Admin/Login.vue'
import AdminDash from './views/Admin/AdminDash'
import AddCourse from './views/Admin/AddCourse'
import addSubjects from './views/Admin/AddSubjects'
import ProgramTree from './views/Admin/ProgramTree'
import LectRegPage from './views/Admin/LectReg'
//Leturer
import LectReg from './views/Lecturer/Register'
import LectLogin from './views/Lecturer/LectLogin'
import LectDash from './views/Lecturer/LectDash'
import QrCode from './views/Lecturer/QrCode'
import qrdata from './views/Lecturer/qrdata'
import Qresponse from './views/Lecturer/Qresponse'
import FindAtt from './views/Lecturer/findAttendance'
import FindAtt2 from './views/Lecturer/findAttendance20'
//student
import Dashboard from './views/Student/Dashboard'
import Login from './views/Student/Login'
import Register from './views/Student/Register'
import AddSub from './views/Student/AddSub'
import Forget from './views/Student/Forget'
import Change from './views/Student/change'
import Profile from './views/Student/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/map',
      name:'Home',
      component:Home
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/profile',
      name:'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/forgot',
      name:'Forgot',
      component:Forget
    },
    {
      path:'/forgot/:token',
      name:'Change',
      component:Change
    },
    {
      path:'/stdaddsub',
      name:'AddSub',
      component: AddSub
    },
    {
      path:'/admin/login',
      name:'AdminLogin',
      component:AdminLogin
    },
    {
      path:'/admin',
      name:'AdminDash',
      component:AdminDash
    },
    {
      path:'/admin/addcourse',
      name:'AddCourse',
      component:AddCourse
    },
    {
      path:'/admin/addsubjects',
      name:'AddSubjects',
      component:addSubjects
    },
    {
      path:'/admin/program',
      name:'ProgramTree',
      component:ProgramTree
    },
    {
      path:'/admin/lectreg',
      name:'LectRegPage',
      component: LectRegPage
    },
    {
      path:'/lecturer/register/:token',
      name:'LectReg',
      component:LectReg
    },
    {
      path:'/lecturer/login',
      name:'LectLogin',
      component:LectLogin
    },
    {
      path:'/lecturer',
      name:'LectDash',
      component:LectDash
    },
    {
      path:'/lecturer/find',
      name:'FindAtt',
      component: FindAtt
    },
    {
      path:'/lecturer/finda',
      name:'FindAtt2',
      component:FindAtt2
    },
    {
      path:'/lecturer/qrdata',
      name:'qrdata',
      component:qrdata
    },
    {
      path:'/lecturer/qrcode',
      name:'QrCode',
      component:QrCode
    },
    {
      path:'/lecturer/Qresponse/:token/:sub/:date/:week/:identifier',
      name:'Qresponse',
      component:Qresponse
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
