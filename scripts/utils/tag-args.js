'use strict';

/**
 * 解析 Hexo 自定义标签的参数列表
 * @param args 原始参数列表
 * @param defaults 默认参数值，不进行类型转换
 * @param positionKeys 位置参数的键名列表。
 *          若未解析到对应的关键字参数，且有相应的位置参数值时，则使用该值
 *          若未传入，则忽略所有位置参数
 * @returns Object
 */
function parseTagArgs(
    args,
    defaults = null,
    positionKeys = null,
) {
    if (!defaults || typeof defaults !== 'object') {
        defaults = {};
    }

    const positional = [];
    const named = {};

    // 解析位置参数和关键字参数
    if (args && Array.isArray(args)) {
        args.forEach(arg => {
            const equalIndex = arg.indexOf('=');
            // 若等号在参数中间，才视为有效的关键字参数
            if (equalIndex > 0 && equalIndex < arg.length - 1) {
                const key = arg.substring(0, equalIndex);
                const value = arg.substring(equalIndex + 1);
                named[key] = value;
            } else {
                positional.push(arg);
            }
        });
    }

    // 将位置参数按顺序映射到 named 中 (关键字参数优先)
    if (positionKeys && Array.isArray(positionKeys)) {
        positional.forEach((value, index) => {
            const key = positionKeys[index];
            if (key && !(key in named)) {
                named[key] = value;
            }
        });
    }

    return {...defaults, ...named}
}

module.exports = {
    parseTagArgs,
};