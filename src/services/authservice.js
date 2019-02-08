import { API_URL } from '../appdata/url';

const hostname = window.location.hostname,
  venueDNS = hostname === 'localhost' ? 'tapmantest' : hostname.substr(0, hostname.indexOf('.'));

export const login = async adminpwd => {
  try {
    const response = await fetch(`${API_URL}/venues/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dns: venueDNS,
        adminpwd
      })
    });

    if (response.status !== 204) {
      const result = await response.json();
      return result;
    }
    return null;

  } catch (err) {
    console.error(err);
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/venues/logout`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dns: venueDNS
      })
    });

    return response.status === 204;

  } catch (err) {
    console.error(err);
  }
}

