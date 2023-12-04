import router from "@/router";

// 路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('hook');
    next()
})

// 后置路由守卫 
router.afterEach((to, from) => {

})


export default router