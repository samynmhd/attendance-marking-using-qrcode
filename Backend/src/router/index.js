import Vue from 'vue'
import Router from 'vue-router'
import session from 'vue-session'
//students
// import Dashboard from '@/components/Dashboard'
import Dashboard from '@/components/Dashboard1'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Register1 from '@/components/Register1'
import Login1 from '@/components/Login1'
import AddSub from '@/components/AddSub'
import Forget from '@/components/forget'
import Change from '@/components/change'
import Profile from '@/components/Profile'

//admin
import AdminLogin from '@/components/Admin/AdminLogin'
import AdminDash from '@/components/Admin/AdminDash'
import AddCourse from '@/components/Admin/AddCourse'
import addSubjects from '@/components/Admin/addSubjects'
import ProgramTree from '@/components/Admin/ProgramTree'
import LectRegPage from '@/components/Admin/LectReg'
//lecturer
import LectReg from '@/components/Lecturer/Register'
import LectLogin from '@/components/Lecturer/LectLogin'
import LectDash from '@/components/Lecturer/LectDash'
import QrCode from '@/components/Lecturer/QrCode'
import qrdata from '@/components/Lecturer/qrdata'
import Qresponse from '@/components/Lecturer/Qresponse'
import LectSub from '@/components/Lecturer/LectSub'
// import FindAtt from '@/components/Lecturer/findAttendance'
import FindAtt from '@/components/Lecturer/findAttendance2'


Vue.use(Router)
export default new Router({mode:'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login1
    },
    {
      path:'/profile',
      name:'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'Register',
      component: Register1
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
      path:'/lecturer/addsub',
      name:'LectSub',
      component:LectSub
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
      path:'/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
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
      path:'*',
      redirect:'/'
    }
  ]
})
