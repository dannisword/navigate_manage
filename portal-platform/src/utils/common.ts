import dayjs from 'dayjs';

export const IsEmptyOrNull = (val: any) => {
  if (val == undefined) {
    return true;
  }
  // 集合
  if (val.constructor === Array) {
    return val.length <= 0;
  }
  // 物件
  if (typeof val == "object") {
    return Object.keys(val).length === 0;
  }
  // 數值
  if (typeof val == "number") {
    return false;
  }
  // 其他
  return val == undefined || val == null || val == "" ? true : false;
};


export function FormatDate(inp: any, format = "YYYY-MM-DD") {
  if (inp) {
    return dayjs(inp).format(format);
  }
  return "";
}