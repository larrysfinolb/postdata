const REGEX = {
  id: /^[0-9]*$/,
  name: /^[A-Za-zÀ-ÿ\s\.\-]+$/,
  title: /^[A-Za-zÀ-ÿ0-9\s\-_,\.;:()'"]+$/,
  synopsis: /^[A-Za-zÀ-ÿ0-9\s\-_,\.;:()]{0,}/,
  language: /^[a-z]{2,2}$/,
  price: /^[0-9]+\.{0,1}[0-9]{0,2}$/,
  copies: /^[0-9]+$/,
  active: /^true|false$/,
  account_number: /^[0-9]{20,20}$/,
  email: /^\S+@\S+$/,
  balance: /^([0-9]+\.[0-9]{3,3}){0,1}$/,
};

export default REGEX;
