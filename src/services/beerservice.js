import { API_URL } from '../appdata/url';

const hostname = window.location.hostname,
  venueDNS = hostname === 'localhost' ? 'dev' : hostname.substr(0, hostname.indexOf('.'));

export const addBeer = async beer => {
  try {
      const response = await fetch(`${API_URL}/beers/new`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dns: venueDNS,
        beer
      })
    });

    if (response.status === 204) {
      return;
    }

  } catch (err) {
    console.log(err);
  }
}

export const editBeer = async beer => {
  try {
      const response = await fetch(`${API_URL}/beers/edit`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dns: venueDNS,
        beer
      })
    });

    if (response.status === 204) {
      return;
    }

  } catch (err) {
    console.log(err);
  }
}

export const deleteBeer = async (beerId, active) => {
  try {
      const response = await fetch(`${API_URL}/beers/delete`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dns: venueDNS,
        beerId,
        active
      })
    });

    if (response.status === 204) {
      return;
    }

  } catch (err) {
    console.log(err);
  }
}

export const searchBeer = async (value) => {
  try {
    const response = await fetch(`${API_URL}/beers/${venueDNS}/${value}`);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}