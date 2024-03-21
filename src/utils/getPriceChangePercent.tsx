const getPriceChangePercent = (base: number, price: number) => {
  var string = ((price - base) / base * 100).toFixed(1);
  string = string === "-0.0" ? "0.0" : string;
  return string.startsWith("-") ? string : "+".concat(string);
};

export default getPriceChangePercent;