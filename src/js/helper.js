import { TIMEOUT_SECS } from './config.js';

//*Timeout function
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//* Getting JSON data
export const getJSON = async function (url) {
  try {
    //*Load recipe
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

    // console.log(res, data);
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    //*Load recipe
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

    // console.log(res, data);
  } catch (err) {
    throw err;
  }
};

// `${API_URL}/${id}`
