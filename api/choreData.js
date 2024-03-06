import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getChores = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE chore
const createChore = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE chore
const getSingleChore = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE chore
const deleteSingleChore = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

//  UPDATE chore
const updateChore = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET A SINGLE chore'S CHORES
const getChoreChores = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore.json?orderBy="chore_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteChores = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/chore.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getChores,
  createChore,
  getSingleChore,
  deleteSingleChore,
  updateChore,
  favoriteChores,
  getChoreChores,
};
