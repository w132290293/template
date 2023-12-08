import { ref } from "vue";


interface Page {
    page: number
    limit: number
    start: number
}

/**
 * @description 查询列表
 * 
 * @param { function } fn <Promise>
 * 
 * @returns {
 *  data: 接口返回数据 <Array>
 *  loading: 列表loading <Boolean>
 *  query: 查询事件 <Function>
 * }
 * 
 * @example
 *  const { loading, tableData, query } = useQuery((page) => {
 *      return get('baidu.com',{ ...page, ...formData });
 *  })
 */
export function useQuery(fn: any): any {

    const data = ref([]);
    const loading = ref(false);

    let page: any;


    /**
     * @description 执行查询
     * 
     * @param { Page } formData 接口参数对象
     */
    async function query(formData: any) {
        try {
            page = formData || page;
            loading.value = true;
            data.value = await fn(page);
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    }

    return {
        data,
        loading,
        query
    };
}