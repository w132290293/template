/**
 * @description 防抖函数：在一定时间间隔内，多次触发只执行最后一次操作。
 * 
 * @returns {function} 返回一个函数，用于执行防抖操作。
 * @example 
 * const _fd = useDebounce();
 * await _fd(1000);
 */

export function useDebounce(): any {
    // 用于存储定时器ID的变量
    let dsq: any;

    /**
     * @description 执行防抖。
     * @param {number} time 时间间隔（以毫秒为单位）。
     * @returns {Promise<void>} 返回一个Promise，用于执行防抖操作。
     */
    return function (time: number): Promise<void> {
        return new Promise((res) => {
            // 清除现有的定时器，重新开始防抖时间间隔。
            clearTimeout(dsq);
            dsq = setTimeout(() => {
                // 解析Promise，表示现在可以执行下一步操作。
                res();
            }, time);
        });
    };
}
