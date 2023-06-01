import Vue from 'vue'
import VueRouter from 'vue-router'

import hello from "~/views/hello";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/hello',
            name: 'hello',
            component: hello
        },
        {
            path: '/world',
            name: 'world',
            component: () => import('~/views/world')
        },
        {
            path: '/',
            name: 'layout',
            redirect: "/overview?theme=0",
            component: () => import('~/views/components/layout'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('~/views/home')
                },
                {
                    path: '/stock',
                    name: 'stock',
                    component: () => import('~/views/stock')
                },
                {
                    path: '/basicKLine',
                    name: 'basicKLine',
                    component: () => import('~/views/basicKLine')
                },
                {
                    path: '/kLine',
                    name: 'kLine',
                    component: () => import('~/views/kLine')
                },
                {
                    path: '/treemap',
                    name: 'treemap',
                    component: () => import('~/views/treemap')
                },
                {
                    path: '/avg',
                    name: 'avg',
                    component: () => import('~/views/industryConceptAvg')
                },
                {
                    path: '/overview',
                    name: 'overview',
                    component: () => import('~/views/marketOverview')
                },
                {
                    path: '/distribution',
                    name: 'distribution',
                    component: () => import('~/views/distribution')
                },
                {
                    path: '/quotation',
                    name: 'quotation',
                    component: () => import('~/views/marketQuotation')
                },
                {
                    path: '/sqlQuery',
                    name: 'sqlQuery',
                    component: () => import('~/views/sqlQuery')
                },
                {
                    path: '/bk',
                    name: 'bk',
                    component: () => import('~/views/bk')
                },
                {
                    path: '/bkKLine',
                    name: 'bkKLine',
                    component: () => import('~/views/bkKLine')
                },
                {
                    path: '/sync',
                    name: 'sync',
                    component: () => import('~/views/sync')
                },
                {
                    path: '/hold',
                    name: 'hold',
                    component: () => import('~/views/hold')
                }
            ]
        }
    ]
})

export default router
