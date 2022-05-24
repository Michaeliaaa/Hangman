import randomWords from 'random-words';

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('TIMEOUT'))
    }, ms)

    promise
      .then(value => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch(reason => {
        clearTimeout(timer)
        reject(reason)
      })
  })
}

export async function getRandomWord() {
  return await timeout(1200, fetch(
    // 'https://random-word-form.herokuapp.com/random/adjective',
    // 'https://random-word-form.herokuapp.com/random/animal',
    'https://random-word-api.herokuapp.com/word',
    {
      method: "GET",
    })).then(async response => {
      let data = await response.json().then(data => data[0]);
      return data;
    }).catch(() => { return randomWords() });
};