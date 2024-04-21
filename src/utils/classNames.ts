const cn = (...classNameList: (string | undefined | null | boolean)[]) =>
  classNameList.filter((className) => className).join(' ');

export default cn;
