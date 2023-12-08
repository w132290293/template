/**
 * @description 节流函数：在一定时间间隔内只执行一次操作。
 * 
 * @returns {function} 返回一个函数，用于执行节流操作。
 * @example
 * const _jl = useThrottle();
 * await _jl(2000);
 */

export function useThrottle(): any {
    let dsq: any;  // 节流定时器
    let flag = true;  // 是否正在节流中

    /**
     * @description 执行节流。
     * @param {number} time 时间间隔（以毫秒为单位）。
     * @returns {Promise<void>} 返回一个Promise，用于执行节流操作。
     */
    return function (time: number): Promise<void> {
        return new Promise((res) => {
            if (flag) {
                flag = false;
                // 设置定时器，等待指定时间后解除节流状态
                dsq = setTimeout(() => {
                    flag = true;
                    clearTimeout(dsq);
                    dsq = null;
                }, time);

                res();  // 执行操作
            }
        });
    };
}