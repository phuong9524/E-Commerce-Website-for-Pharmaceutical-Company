export function numberToCurrency(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function currencyToNumber(price) {
  let thousandSeparator = Intl.NumberFormat("vi-VN")
    .format(11111)
    .replace(/\p{Number}/gu, "");
  let decimalSeparator = Intl.NumberFormat("vi-VN")
    .format(1.1)
    .replace(/\p{Number}/gu, "");

  return parseFloat(
    price
      .replace(new RegExp("\\" + thousandSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), ".")
  );
}
