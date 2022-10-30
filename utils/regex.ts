const REGEX = {
  id: /^[0-9]*$/,
  fullname: /^[A-Za-zÀ-ÿ\s\.\-]+$/,
  name: /^[A-Za-zÀ-ÿ\s\.\-]+$/,
  title: /^[A-Za-zÀ-ÿ0-9\s\-_,\.;:()]+$/,
  synopsis: /^[A-Za-zÀ-ÿ0-9\s\-_,\.;:()]{0,}/,
  language: /^[a-z]{2,2}$/,
  price: /^[0-9]+\.[0-9]{3,3}$/,
  copies: /^[0-9]+$/,
  status: /^true|false$/,
  active: /^true|false$/,
};

export default REGEX;
