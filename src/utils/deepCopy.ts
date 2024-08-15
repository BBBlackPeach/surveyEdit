export const deepCopy = (obj: any): any => {
    // 检查输入是否为对象或数组
    if (typeof obj !== 'object' || obj === null) {
        return obj; // 如果不是对象,直接返回值
    }

    // 如果是函数，直接返回原函数
    if (typeof obj === 'function') {
        return obj;
    }

    // 根据输入的类型(对象或数组)初始化结果
    const result = Array.isArray(obj) ? [] : {};

    // 递归地拷贝每个属性或元素
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key]);
        }
    }

    return result;
}