// declare var TOOLS: any;
// declare var on: any;
// declare var off: any;


// Type definitions for tools.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// getIntersection.!ret
// type Ret = Array<any>;
// getUnion.!ret

/**
//  * 
//  * @param arr 
//  * @param fn 
//  */
// declare function forEach(arr : any, fn : any): void;

// /**
//  * 
//  * @param arr1 
//  * @param arr2 
//  * @return  
//  */
// declare function getIntersection(arr1 : any, arr2 : any): any;

// /**
//  * 
//  * @param arr1 
//  * @param arr2 
//  * @return  
//  */
// declare function getUnion(arr1 : any, arr2 : any): any;

// /**
//  * 
//  * @param targetarr 
//  * @param arr 
//  */
// declare function hasOneOf(targetarr : any, arr : any): void;

// /**
//  * @param {String|Number} value 要验证的字符串或数值
//  * @param {*} validList 用来验证的列表
//  * @param value 
//  * @param validList 
//  * @return  
//  */
// declare function oneOf(value : string | number, validList : any): boolean;

// /**
//  * @param {Number} timeStamp 判断时间戳格式是否是毫秒
//  * @returns {Boolean}
//  * @param timeStamp 
//  * @return  
//  */
// declare function isMillisecond(timeStamp : number): boolean;

// /**
//  * @param {Number} timeStamp 传入的时间戳
//  * @param {Number} currentTime 当前时间时间戳
//  * @returns {Boolean} 传入的时间戳是否早于当前时间戳
//  * @param timeStamp 
//  * @param currentTime 
//  * @return  
//  */
// declare function isEarly(timeStamp : number, currentTime : number): boolean;

// /**
//  * @param {Number} num 数值
//  * @returns {String} 处理后的字符串
//  * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
//  * @param num 
//  * @return  
//  */
// declare function getHandledValue(num : number): string;
// /**
//  * @param {Number} num 数值
//  * @returns {String} 处理后的字符串
//  * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
//  */
// declare function getHandledValue();

// /**
//  * @param {Number} timeStamp 传入的时间戳
//  * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
//  * @param timeStamp 
//  * @param startType 
//  * @return  
//  */
// declare function getDate(timeStamp : number, startType : string | number): string;

// /**
//  * 
//  * @param timeStamp 
//  * @return  
//  */
// declare function getRelativeTime(timeStamp : number): string;

// /**
//  * 
//  * @return  
//  */
// declare function getExplorer(): string;

// /**
//  * 
//  * @param element 
//  * @param event 
//  * @param handler 

declare function on(element : any, event : any, handler : any): void;

/**
 * 
 * @param element 
 * @param event 
 * @param handler 
 */
declare function off(element : any, event : any, handler : any): void;

// /**
//  * 
//  * @param obj 
//  * @param key 
//  * @return  
//  */
// declare function hasKey(obj : any, key : any): boolean;
// /**
//  * 
//  */
// declare function hasKey();

// /**
//  * 
//  * @param obj1 
//  * @param obj2 
//  * @return  
//  */
// declare function objEqual(obj1 : any, obj2 : any): boolean;
