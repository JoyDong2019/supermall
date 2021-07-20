import Vue from 'vue'
import VueRouter from 'vue-router'

const Category = () =>
    import ('../views/category/category')
const Home = () =>
    import ('../views/home/home')
const Cart = () =>
    import ('../views/shopcart/shopcart')
const Profile = () =>
    import ('../views/profile/profile')
const Detail = () =>
    import ('../views/detail/Detail')
Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home',

    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: Cart
    },
    {
        path: '/detail/:iid',
        name: 'detail',
        component: Detail
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router