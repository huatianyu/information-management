declare global {
    interface RouterMeta {
        title: string;
        keepAlive: boolean;
    }
    interface Router {
        path: string;
        name: string;
        redirect?: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import main from '../views/main.vue'
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: '放疗信息管理系统', keepAlive: true
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu', keepAlive: true },
    component: main,
    children: [
        { path: 'home', meta: { title: '首    页', keepAlive: true }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}

// export const timelineRouters: Router = {
//     path: '/timeline',
//     name: 'timeline',
//     permission: '',
//     meta: { title: '时间轴', keepAlive: true },
//     component: timeline,

// }

export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: '管理菜单', keepAlive: true },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'home', meta: { title: '首       页', keepAlive: true }, icon: 'menu-home', name: 'home', component: () => import('../views/home/home.vue') },
        {
            path: 'patient', permission: 'Pages.Patients', meta: { title: '患者登记', keepAlive: true }, icon: 'menu-registration', name: 'patient', redirect: 'patient/registration', component: () => import('../views/setting/patient/patient.vue'),
            children: [

                {
                    path: 'registration', meta: { title: '患者登记', keepAlive: true }, name: 'registration', component: () => import('../views/setting/patient/registration.vue')
                },

            ]
        },
        {
            path: '/patientTreatment', permission: 'Pages.Patients', meta: { title: '接       诊', keepAlive: true }, icon: 'menu-patientTreatment', name: 'patienttreatmentlist', redirect: 'patientTreatment/patientTreatmentList',
            component: () => import('../views/setting/patientTreatment/patientTreatment.vue'),
            children: [
                { path: 'patientTreatmentList', meta: { title: '接诊列表', keepAlive: true }, name: 'patienttreatmentlist', component: () => import('../views/setting/patientTreatment/patientTreatmentList.vue') },
                {
                    path: 'patientResource', meta: { title: '接诊列表', keepAlive: true }, name: 'patientResource', redirect: 'patientResource/diagnosticBlock', component: () => import('../views/setting/patientTreatment/patientResource.vue'),
                    children: [

                        {
                            path: 'diagnosticBlock', meta: { title: '接诊列表', keepAlive: true }, name: 'diagnosticBlock', component: () => import('../views/setting/patientTreatment/diagnosticBlock.vue')
                        },
                        {
                            path: 'consent', meta: { title: '接诊列表', keepAlive: true }, name: 'consent', component: () => import('../views/setting/patientTreatment/consent/consent.vue')
                        },
                        {
                            path: 'program', meta: { title: '接诊列表', keepAlive: true }, name: 'program', component: () => import('../views/setting/patientTreatment/program/program.vue')
                        },
                        {
                            path: 'historyProgram', meta: { title: '接诊列表', keepAlive: true }, name: 'historyProgram', component: () => import('../views/setting/patientTreatment/program/historyProgram.vue')
                        },
                        {
                            path: 'creatTargetingApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'creatTargetingApplication', component: () => import('../views/setting/patientTreatment/target/creatTargetingApplication.vue')
                        },
                        {
                            path: 'historyTargetingApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'historyTargetingApplication', component: () => import('../views/setting/patientTreatment/target/historyTargetingApplication.vue')
                        },
                        {
                            path: 'creatPlanApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'creatPlanApplication', component: () => import('../views/setting/patientTreatment/plan/creatPlanApplication.vue')
                        },
                        {
                            path: 'historyPlanApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'historyPlanApplication', component: () => import('../views/setting/patientTreatment/plan/historyPlanApplication.vue')
                        }


                    ]
                }

            ]
        },

        {
            path: 'review', permission: 'Pages.Patients', meta: { title: '审核批准', keepAlive: true }, icon: 'menu-review', name: 'review', redirect: 'review/reviewList', component: () => import('../views/setting/review/review.vue'),
            children: [

                {
                    path: 'reviewList', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'reviewList', component: () => import('../views/setting/review/reviewList.vue'),
                },
                {
                    path: 'moreTargetApplication', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'moreTargetApplication', component: () => import('../views/setting/review/targetApplication/moreTargetApplication.vue'),

                },
                {
                    path: 'morePlanApplication', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'morePlanApplication', component: () => import('../views/setting/review/planApplication/morePlanApplication.vue'),

                },
                {
                    path: 'moreApprovePlan', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'moreApprovePlan', component: () => import('../views/setting/review/approvePlan/moreApprovePlan.vue'),

                },

                {
                    path: 'moreApprovaltTreatment', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'moreApprovaltTreatment', component: () => import('../views/setting/review/approvaltTreatment/moreApprovaltTreatment.vue'),

                },

                {
                    path: 'moreExamineLocationResult', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'moreExamineLocationResult', component: () => import('../views/setting/review/applicationResult/moreExamineLocationResult.vue'),

                },
                {
                    path: 'targetResource', meta: { title: '接诊列表', keepAlive: true }, name: 'targetResource', component: () => import('../views/setting/review/targetResource.vue'),
                    children: [

                        {
                            path: 'reviewTargetingApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'reviewTargetingApplication', component: () => import('../views/setting/review/targetApplication/reviewTargetingApplication.vue')
                        },
                        {
                            path: 'examineLocationResult', meta: { title: '接诊列表', keepAlive: true }, name: 'examineLocationResult', component: () => import('../views/setting/review/applicationResult/examineLocationResult.vue')
                        },
                        {
                            path: 'planApplication', meta: { title: '接诊列表', keepAlive: true }, name: 'planApplication', component: () => import('../views/setting/review/planApplication/planApplication.vue')
                        },
                        {
                            path: 'approvePlan', meta: { title: '接诊列表', keepAlive: true }, name: 'approvePlan', component: () => import('../views/setting/review/approvePlan/approvePlan.vue')
                        },
                        {
                            path: 'approvaltTreatment', meta: { title: '接诊列表', keepAlive: true }, name: 'approvaltTreatment', component: () => import('../views/setting/review/approvaltTreatment/approvaltTreatment.vue')
                        }

                    ]
                }


            ]
        },
        // {
        //     path: 'reviewList', meta: { title: '审核批准', keepAlive: true }, icon: 'md-done-all', name: 'reviewList', component: () => import('../views/setting/review/reviewList.vue'),
        //     children: [
        //         {
        //             path: 'moreList', meta: { title: '审核列表', keepAlive: true }, name: 'moreList', component: () => import('../views/setting/review/moreList.vue')
        //         }]
        // },
        {
            path: '/arrangement', permission: 'Pages.Patients', meta: { title: '排       程', keepAlive: true }, icon: 'menu-arrangement', name: 'arrangementList', redirect: 'arrangement/arrangementList',
            component: () => import('../views/setting/arrangement/arrangement.vue'),
            children: [
                { path: 'arrangementList', meta: { title: '排程列表', keepAlive: true }, name: 'arrangementList', component: () => import('../views/setting/arrangement/arrangementList.vue') },
                { path: 'arrangementTable', meta: { title: '排程桌面', keepAlive: true }, name: 'arrangementTable', component: () => import('../views/setting/arrangement/arrangementTable.vue') },
            ]
        },

        {
            path: '/schedule', permission: 'Pages.Patients', meta: { title: '预       约', keepAlive: true }, icon: 'menu-schedule', name: 'scheduleList', redirect: 'schedule/scheduleList',
            component: () => import('../views/setting/schedule/schedule.vue'),
            children: [
                { path: 'scheduleList', meta: { title: '预约列表', keepAlive: true }, name: 'scheduleList', component: () => import('../views/setting/schedule/scheduleList.vue') },
                { path: 'scheduleTable', meta: { title: '预约桌面', keepAlive: true }, name: 'scheduleTable', component: () => import('../views/setting/schedule/scheduleTable.vue') },
            ]
        },
        {
            path: 'statistics', permission: 'Pages.Patients', meta: { title: '统计分析', keepAlive: true }, icon: 'menu-statistics', name: 'statistics',
            component: () => import('../views/setting/statistics/statistics.vue')
        }
    ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
