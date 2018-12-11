//一级路由
import IndexPage from '../view/IndexPage';
import Login from '../view/login';
import Play from '../view/play';
//二级路由
import Find from '../view/index/find';
import Video from '../view/index/video';
import My from '../view/index/my';
import People from '../view/index/people';
import Message from '../view/index/message';
import Search from '../view/index/search';
//三级路由
import Like from '../view/index/find/like';
import PeopleVideo from '../view/index/find/peopleVideo';

export default {
  routes: [{
    path: '/index',
    component: IndexPage,
    children: [{
      path: '/index/find',
      component: Find,
      children:[{
        path:'/index/find/like',
        component:Like
      },{
        path:'/index/find/peoplevideo',
        component:PeopleVideo
      },{
        path:'/index/find',
        redirect:'/index/find/like'
      }]
    },{
      path: '/index/video',
      component: Video
    },{
      path: '/index/my',
      component: My
    },{
      path: '/index/people',
      component: People
    },{
        path: '/index/message',
        component: Message
      },{
        path:'/index/search',
        component:Search
      },{
        path: '/index',
        redirect: '/index/find'
      }]
  },{
    path:'/login',
    component:Login
  },{
    path:'/play',
    component:Play
  },{
    path: '/',
    redirect: '/index'
  }]
}