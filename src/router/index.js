import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true }
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: _import('dashboard/index'),
  //     name: 'dashboard',
  //     meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // 首页
  {
    path: '',
    component: Layout,
    redirect: 'teacherHomepage',
    meta: { roles: ['teacher'] },
    children: [{
      path: 'teacherHomepage',
      component: _import('teacherHomepage/index'),
      name: 'teacherHomepage',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'studentHomepage',
    meta: { roles: ['student'] },
    children: [{
      path: 'studentHomepage',
      component: _import('homepage/index'),
      name: 'studentHomepage',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/Exams',
    component: Layout,
    meta: { roles: ['teacher'] },
    children: [{
      path: 'index',
      component: _import('Exams/Exam'),
      name: 'Exam',
      meta: { title: '考试管理', icon: 'icon' }
    }] },
  {
    path: '/Exams',
    component: Layout,
    hidden: true,
    meta: { roles: ['teacher'] },
    children: [{
      path: 'ExamAdd',
      component: _import('Exams/ExamAdd'),
      name: 'ExamAdd',
      meta: { title: 'ExamAdd', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/Exams/Exam/',
    component: Layout,
    hidden: true,
    meta: { roles: ['student'] },
    children: [{
      path: ':id',
      component: _import('Exams/ExamDetail'),
      name: 'ExamDetail',
      meta: { title: 'ExamDetail', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/Exams/Exam/',
    component: Layout,
    hidden: true,
    meta: { roles: ['teacher'] },
    children: [{
      path: ':id/edit',
      component: _import('Exams/ExamAdd'),
      name: 'ExamAdd',
      meta: { title: 'ExamAdd', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/Admissiontest',
    component: Layout,
    hidden: true,
    children: [{
      path: 'submit',
      component: _import('studentTest/Admissiontest/submit'),
      name: 'submit',
      meta: { title: 'submit', icon: 'icon', noCache: true }
    }]
  },

  // {
  //   path: '/studentTeam',
  //   component: Layout,
  //   name: 'studentTeam',
  //   hidden: true,
  //   meta: {
  //     title: '测评小组投票',
  //     icon: 'icon',
  //     roles: ['student']
  //   },
  //   children: [
  //     { path: 'none', component: _import('studentTeam/none'), name: 'student-none', meta: { title: '测评小组投票', icon: 'icon' }}
  //   ]
  // },

  // {
  //   path: '/information',
  //   component: Layout,
  //   name: 'information',
  //   meta: {
  //     title: '学生信息',
  //     icon: 'icon'
  //   },
  //   children: [
  //     { path: 'alter', component: _import('information/alter'), name: 'alter-information', meta: { title: '个人信息', icon: 'icon' }},
  //     { path: 'index', component: _import('information/index'), name: 'Personal-information', meta: { title: '测评报告', icon: 'icon' }}
  //   ]
  // },

  // {
  //   path: '/studentManager',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'studentManager',
  //   meta: {
  //     title: '教学管理',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'basicInfo', component: _import('studentManager/basicInfo/basicInfo'), name: 'basicInfo', meta: { title: '学生基本信息管理' }},
  //     { path: 'participation', component: _import('studentManager/participation/participation'), name: 'participation', meta: { title: '出勤管理' }},
  //     { path: 'breakTheRule', component: _import('studentManager/breakTheRule/breakTheRule'), name: 'breakTheRule', meta: { title: '违纪管理' }},
  //     { path: 'leave', component: _import('studentManager/leave/leave'), name: 'leave', meta: { title: '请假登记' }},
  //     {
  //       path: 'workManager',
  //       component: _import('studentManager/workManager/index'),
  //       name: 'workManager',
  //       meta: {
  //         title: '作业管理'
  //       }
  //     },
  //     { path: 'otherImportant', component: _import('studentManager/otherImportant/otherImportant'), name: 'otherImportant', meta: { title: '重大事项管理' }}
  //   ]
  // },

  // {
  //   path: '/homework',
  //   component: Layout,
  //   redirect: '/homework/daliyTask',
  //   alwaysShow: true,
  //   name: 'homework',
  //   meta: { title: 'homework', icon: 'form' },
  //   children: [
  //     { path: 'daliyTask', component: _import('homework/daliyTask'), name: 'daliyTask', meta: { title: 'daliytask' }}
  //   ]
  // },
  // {
  //   path: '/reveiewSystem',
  //   component: Layout,
  //   redirect: '/reveiewSystem/teacherReview',
  //   alwaysShow: true,
  //   name: 'reveiewSystem',
  //   meta: { title: 'reveiewsystem', icon: 'example' },
  //   children: [
  //     { path: 'teacherReview', component: _import('reviewSystem/teacherReview'), name: 'teacherReview', meta: { title: 'teacherreview' }},
  //     { path: 'selfReview', component: _import('reviewSystem/selfReview'), name: 'selfReview', meta: { title: 'selfreview' }},
  //     { path: 'technologyReview', component: _import('reviewSystem/technologyReview'), name: 'technologyReview', meta: { title: 'technologyreview' }}
  //   ]
  // },

  // {
  //   path: '/technologyManager',
  //   component: Layout,
  //   children: [{
  //     path: 'technologyManager',
  //     component: _import('technologyManager/index'),
  //     name: 'teacherHomepage',
  //     meta: { title: 'technologyManager', icon: 'dashboard', noCache: true }
  //   }]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   name: 'system',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'clipboard'
  //   },
  //   children: [
  //     { path: 'teacherManager', component: _import('system/teacherManager/index'), name: 'teacherManager', meta: { title: '教师管理' }},
  //     { path: 'navigationManager', component: _import('system/navigationManager/index'), name: 'navigationManager', meta: { title: '导航管理' }},
  //     { path: 'roleManager', component: _import('system/roleManager/index'), name: 'roleManager', meta: { title: '权限管理' }},
  //     { path: 'announcementManager', component: _import('system/announcementManager/index'), name: 'announcementManager', meta: { title: '公告管理' }},
  //     { path: 'parameterManager', component: _import('system/parameterManager/index'), name: 'parameterManager', meta: { title: '系统参数管理' }}
  //   ]
  // },
  // 学生端
  {
    path: '/Admissiontest',
    component: Layout,
    name: 'Admissiontest',
    meta: {
      icon: 'component',
      title: '入学测试',
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('studentTest/Admissiontest/index'), name: 'Admissiontest-index', meta: { title: '入学测试', icon: 'icon' }}
    ]
  },
  {
    path: '/Admissiontest',
    component: Layout,
    name: 'Admissiontest',
    hidden: true,
    meta: {
      icon: 'component',
      title: '入学测试'
    },
    children: [
      { path: 'character', component: _import('studentTest/Admissiontest/Character'), name: 'Admissiontest-character', meta: { title: '性格测试', icon: 'icon' }},
      { path: 'professional', component: _import('studentTest/Admissiontest/Professional'), name: 'Admissiontest-professional', meta: { title: '专业测试', icon: 'icon' }},
      { path: 'thinking', component: _import('studentTest/Admissiontest/Thinking'), name: 'Admissiontest-thinking', meta: { title: '思维测试', icon: 'icon' }}
    ]
  },

  {
    path: '/midTest',
    component: Layout,
    name: 'midTest',
    meta: {
      title: 'midTest',
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('studentTest/midTest/index'), name: 'midTest-index', meta: { title: '专业知识测试', icon: 'icon' }}
    ]
  },
  {
    path: '/projectDefense',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{
      path: 'index',
      component: _import('projectDefense/index'),
      name: 'projectDefense',
      meta: { title: '项目答辩', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/firstEvaluationReport',
    component: Layout,
    name: 'firstEvaluationReport',
    meta: {
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('report/firstEvaluationReport'), name: 'firstEvaluationReport', meta: { title: '入学测评报告', icon: 'icon' }}
    ]
  },

  {
    path: '/secondEvaluationReport',
    component: Layout,
    name: 'secondEvaluationReport',
    meta: {
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('review/secondEvaluationReport'), name: 'secondEvaluationReport', meta: { title: '学中测评报告', icon: 'icon' }}
    ]
  },
  {
    path: '/thirdlyEvaluationReport',
    component: Layout,
    name: 'thirdlyEvaluationReport',
    meta: {
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('review/thirdlyEvaluationReport'), name: 'thirdlyEvaluationReport', meta: { title: '结业测评报告', icon: 'icon' }}
    ]
  },

  {
    path: '/daliyTask',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{
      path: 'index',
      component: _import('homework/daliyTask'),
      name: 'daliyTask',
      meta: { title: '每日任务', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/studentTeam',
    component: Layout,
    name: 'studentTeam',
    meta: {
      title: '测评小组投票',
      icon: 'icon',
      roles: ['student']
    },
    children: [
      { path: 'index', component: _import('studentTeam/index'), name: 'student-team', meta: { title: '测评小组投票', icon: 'icon' }}
    ]
  },
  {
    path: '/groupReview',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{
      path: 'index',
      component: _import('review/teacherReview'),
      name: 'groupReview',
      meta: { title: '学生小组点评', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/selfReview',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{ path: 'index', component: _import('review/selfReview'), name: 'selfReview', meta: { title: '学生自评', icon: 'dashboard' }}]
  },
  {
    path: '/imformationn',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{
      path: 'index',
      component: _import('information/dailysummary'),
      name: 'imformation',
      meta: { title: '日常信息汇总', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/teacherManager',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [{ path: 'alter', component: _import('information/alter'), name: 'alter-information', meta: { title: '个人信息', icon: 'icon' }}]
  },

  // 老师端

  {
    path: '/workManager',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'index',
      component: _import('studentManager/workManager/index'),
      name: 'workManager',
      meta: {
        title: '作业管理',
        icon: 'work'
      }
    }]
  },
  {
    path: '/teacherReview',
    component: Layout,
    hidden: true,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('review/teacherReview'), name: 'teacherReview', meta: { title: '点评管理', icon: '2' }}]
  },
  {
    path: '/reviewIndex',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'index',
      component: _import('review/reviewIndex'),
      name: 'reviewIndex',
      meta: {
        title: '点评首页',
        icon: 'work'
      }
    }]
  },
  {
    path: '/participation',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('studentManager/participation/participation'), name: 'participation', meta: { title: '出勤管理', icon: '1' }}]
  },
  {
    path: '/announcementBrowsing',
    component: Layout,
    hidden: true,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('system/announcementBrowsing/index'), name: 'announcementBrowsing', meta: { title: '公告管理', icon: '1' }}]
  },
  {
    path: '/leave',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('studentManager/leave/leave'), name: 'leave', meta: { title: '请假登记', icon: 'leave' }}]
  },
  {
    path: '/technologyReview',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('review/technologyReview'), name: 'technologyReview', meta: { title: '技术经理面试', icon: 'Interview' }}]
  },

  {
    path: '/breakTheRule',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('studentManager/breakTheRule/breakTheRule'), name: 'breakTheRule', meta: { title: '违纪管理', icon: 'breakheart' }}]
  },
  {
    path: '/otherImportant',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('studentManager/otherImportant/otherImportant'), name: 'otherImportant', meta: { title: '重大事项管理', icon: 'daily19' }}]
  },
  {
    path: '/teacherinformation',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('teacherinformation/teacherinformation'), name: 'teacherinformation', meta: { title: '教师个人信息', icon: 'daily19' }}]
  },
  // 学校管理员的权限
  {
    path: '',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('system/teacherManager/index'),
      name: 'teacherManager',
      meta: { title: '教师管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/basicInfo',
    component: Layout,
    meta: {
      roles: ['schoolManager', 'teacher']
    },
    children: [{
      path: 'index',
      component: _import('studentManager/basicInfo/basicInfo'),
      name: 'basicInfo',
      meta: { title: '学生管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/classManager',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('studentManager/classManager/classManager'),
      name: 'classManager',
      meta: { title: '班级管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/announcementManager',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('system/announcementManager/index'),
      name: 'announcementManager',
      meta: { title: '公告管理', icon: 'dashboard', noCache: true }
    }]
  },
  // 管理员的权限
  // {
  //   path: '',
  //   component: Layout,
  //   name: 'userManager',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'userManager',
  //     component: _import('system/userManager/index'),
  //     name: 'userManager',
  //     meta: { title: '用户管理', icon: 'dashboard', noCache: true }
  //   }]
  // },
  {
    path: '',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/userManager/index'),
      name: 'userManager',
      meta: { title: '用户管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/navigationManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/navigationManager/index'),
      name: 'navigationManager',
      meta: { title: '导航管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/roleManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/roleManager/index'),
      name: 'roleManager',
      meta: { title: '权限管理（待定）', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/parameterManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/parameterManager/index'),
      name: 'parameterManager',
      meta: { title: '参数管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/logManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/logManager/index'),
      name: 'logManager',
      meta: { title: '日志管理（待定）', icon: 'dashboard', noCache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
