/* RGB转换为16进制 */
export const colorRgbToHex = (rgbStr: string) => {
  // 十六进制颜色值的正则表达式
  const reg =
    /^(rgba|rgb|RGBA|RGB)\([\s]*[0-9]+[\s]*,[\s]*[0-9]+[\s]*,[\s]*[0-9]+[\s]*(,[\s]*[0-9.]+[\s]*)*\)$/;
  if (!reg.test(rgbStr)) {
    return rgbStr;
  }
  const rgbArray = rgbStr
    .replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, "")
    .split(",");
  let strHex = "#";
  for (let i = 0; i < rgbArray.length; i += 1) {
    if (i !== 3) {
      if (rgbArray[i] === "0") {
        strHex += "00";
      } else {
        let newItem = Number(rgbArray[i]).toString(16);
        if (newItem.length < 2) {
          newItem = `0${newItem}`;
        }
        strHex += newItem;
      }
    } else {
      strHex += rgbArray[i] === "0" ? "" : Number(rgbArray[i]) * 100;
    }
  }
  return strHex.slice(0, 9);
};

/* 16进制转换为RGB */
export const colorHexToRgb = (hexStr: string, opacity?: boolean) => {
  // rgb颜色值的正则表达式
  const reg =
    /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
  if (!reg.test(hexStr)) {
    return hexStr;
  }
  hexStr = hexStr.toLowerCase();
  if (hexStr.length === 4) {
    let colorNew = "#";
    for (let i = 1; i < 4; i += 1) {
      const str = hexStr.slice(i, i + 1);
      colorNew += str + str;
    }
    hexStr = colorNew;
  }
  const rgbArray = [];
  for (let i = 1; i < hexStr.length; i += 2) {
    if (i < 7) {
      rgbArray.push(parseInt(`0x${hexStr.slice(i, i + 2)}`, 16));
    }
    if (i >= 7 && opacity) {
      const str = hexStr.slice(i, i + 2);
      rgbArray.push(
        /^[a-f0-9]{2}$/.test(str)
          ? parseInt(`0x${str}`, 16) / 255
          : (Number(str) / 100).toString()
      );
    }
  }
  return `${(opacity ? "rgba(" : "rgb(") + rgbArray.join(",")})`;
};

/**
 * 判断是否是空对象
 * @param obj
 * @returns
 */
export const isEmptyObj = (obj: { [key: string]: any }): boolean =>
  JSON.stringify(obj) === "{}";
/**
 * 判断是否是空数组
 * @param obj
 *
 * @returns
 */
export const isEmptyArray = (arr: any[]): boolean =>
  JSON.stringify(arr) === "[]";
