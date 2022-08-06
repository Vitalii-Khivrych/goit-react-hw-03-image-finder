const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27865517-33e13e683f49d77078a3fb000';

export default async function fetchImg(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await fetch(url);
  const data = response.json();
  return data;
}
