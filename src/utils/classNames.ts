const cn = (...classNameList: string[]) => classNameList.filter((className) => className).join(' ');

export default cn;
