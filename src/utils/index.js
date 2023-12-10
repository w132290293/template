
//检测数据类型
function getDataType(data, type) {
    /**
     * data 要检测的数据
     * type 不传 结果返回该数据类型的字符串; 传 字符串如'Array'结果返回布尔值
     */
    return type ?
        Object.prototype.toString.call(data).slice(8, -1) === type :
        Object.prototype.toString.call(data).slice(8, -1);
}


//扁平 转 树结构  
function convertToTree(data, init = 0, key = 'id', pKey = 'pid') {
    /**
     * data 扁平数组
     * init 树根id
     * key 存id的key名
     * pKey 存父id的key名
     */
    return data.filter(item => item[pKey] === init).map(item => ({
        ...item,
        children: convertToTree(data, item[key], key, pKey)
    }));
}

//扁平 转 多树结构  
function convertToTree2(
    data,
    obj = {
        initLevel: '1',
        levelKey: 'level',
        idKey: 'id',
        parentIdKey: 'parentId'
    }
) {
    /**
     * data 扁平数组
     * initLevel 初始等级
     * levelKey 等级的key
     * idKey 存id的key名
     * parentIdKey 存父id的key名
     */
    function getChild(childData, parentId) {
        return childData.filter(item => item[obj.parentIdKey] === parentId).map(item => ({
            ...item,
            children: getChild(childData, item[obj.idKey])
        }));
    }

    return data?.filter(item => item[obj.levelKey] === obj.initLevel).map(item => ({
        ...item,
        children: getChild(data, item[obj.idKey])
    }));
}


//查找数组内最大值 
function findBigNum(data, init) {
    /**
     * 普通数据类型数组只需传入data  结果返回数值
     * 如需查找数组内对象某一属性最大的 则需传入init = { num: 0 }  num为查找属性  0为初始值或最小值  结果返回对象
     */
    return init ?
        data.reduce((a, b) => (a[Object.keys(init)[0]] > b[Object.keys(init)[0]] ? a : b), init) :
        data.reduce((a, b) => (a > b ? a : b));
}


//深度查找数组内对象内的某一属性 返回该属性所在对象
function deepFind(arr, rule) {
    /**
     * arr 查找的数组
     * rule 查找的规则 例如{name:'daming'} name为查找属性 daming为目标查找条件
     */
    let node;
    return (function fn(arr, rule) {
        for (const item of arr) {
            if (getDataType(item, 'Object')) {
                for (const k in item) {
                    if (item[Object.keys(rule)[0]] === Object.values(rule)[0]) return item;
                    else if (getDataType(item[k], 'Array')) {
                        node = fn(item[k], rule);
                        if (node) return node;
                    }
                }
            }
        }
    })(arr, rule);
}


//模拟查询功能  DB：变量作为数据库不可修改   formData：表单数据       data赋值给ref变量交给表格渲染
function getDemo(DB, formData) {
    let data = JSON.parse(JSON.stringify(DB));
    for (const k in formData) {
        if (formData[k]) {
            for (let index = data.length - 1; index >= 0; index--) {
                !data[index][k]?.includes(formData[k]) && data.splice(index, 1);
            }
        }
    }
    return data;
}


//计算两个数的偏差值
function getDeviation(num1, num2, unit = '', absolute = true) {

    if (num1 && num2) {
        const newNum1 = num1?.toString()?.match(/\d+/g) ? num1?.toString()?.match(/\d+/g)[0] : null;
        const newNum2 = num2?.toString()?.match(/\d+/g) ? num2?.toString()?.match(/\d+/g)[0] : null;
        if (newNum1 && newNum2 && absolute) return (((Math.max(newNum1, newNum2) - Math.min(newNum1, newNum2)) / Math.max(newNum1, newNum2) * 100)?.toFixed(2)) + unit;
        return '-';
    }
    return '-';
}










// 身份证判断性别
const getGender = (idNumber) => {
    let res = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    if (idNumber && res.test(idNumber)) {
        let genderCode = idNumber.charAt(16);
        if (parseInt(genderCode) % 2 === 0) {
            return '女';
        }
        return '男';
    }
};

// 邮箱验证
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * @description 四舍五入并处理小数位
 * 
 * @param {Number} num 传入需要处理的数字
 * @param {Number} decimals 保留小数点后几位
 * @returns {Number} 处理后的数字
 * 
 * @example
 * roundNumber(9.25876, 2); //9.25
 */
function roundNumber(num, decimals) {
    const multiple = 10 ** decimals;
    return Math.round(num * multiple) / multiple;
}


export {
    clearAllInput,
    timeFormat,
    toUpdate,
    foreachList,
    deleteObj,
    getDataType,
    convertToTree,
    findBigNum,
    deepFind,
    dataSize,
    convertToTree2,
    getDemo,
    getDeviation,
    roundNumber,
    getGender,
    validateEmail,

}
