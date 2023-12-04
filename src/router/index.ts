import { createRouter, createWebHistory } from "vue-router";


//获取路由配置
const pageModules = import.meta.glob('@/view/**/page.ts', {
    eager: true,
    import: 'default'
});

//获取路由组件
const compModules = import.meta.glob(['@/view/**/*.vue', '!@/view/*.vue']);


//生成路由
const routes1 = Object.entries(pageModules).map(([pagePath, config]) => {
    const path = pagePath.replace('/src/view/', '').replace('/page.ts', '');
    const compPath = pagePath.replace('page.ts', 'index.vue');

    return {
        path: '/' + path,
        name: path.replace(/\//g, '-'),
        component: compModules[compPath],
        ...config as Object,
    }
});
console.log(routes1);



//扁平转树
function convertToTree(data: any, num = 1) {

    function getChild(oldItem: any) {
        const oldArr = oldItem.name.split('-');

        return data.filter((item: any) => {
            const arr = item.name.split('-');
            return (arr.length === oldArr.length + 1) && (arr[oldArr.length - 1] === oldArr[oldArr.length - 1])
        }).map((item: any) => ({
            ...item,
            children: getChild(item)
        }));
    };

    return data?.filter((item: any) => item.name.split('-').length <= num).map((item: any) => ({
        ...item,
        children: getChild(item)
    }));
};
const routes = convertToTree(routes1);
console.log(routes);
routes.push({
    path: '/'
})


// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
