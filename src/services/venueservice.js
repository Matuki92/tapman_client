import { API_URL } from '../appdata/url';

const hostname = window.location.hostname,
  venueDNS = hostname === 'localhost' ? 'dev' : hostname.substr(0, hostname.indexOf('.'));

export const getVenueSettings = async () => {
  try {
    const response = await fetch(`${API_URL}/venues/${venueDNS}`, {
      credentials: 'include',
      method: 'GET'
    });
    const venue = await response.json();

    const data = {
      venue,
      status: response.status
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}