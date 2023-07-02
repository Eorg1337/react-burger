export const DOMAIN_NAME = "https://norma.nomoreparties.space/api";
export const url = `${DOMAIN_NAME}/ingredients`;

export const fetchData = (url) => {
return fetch(url)
    .then(res => res.ok ? res.json(): res.json().then((err) => Promise.reject(err)))
    .then(data => {
      if(data.success){
        return data;
      } else{
        console.error('Ошибка получения данных');
      }})
    .catch(err => {console.error('Error:',err)})};