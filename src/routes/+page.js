import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records');
  const res = await response.json();
  
  if (response.status == 200) {
    return {
      jobs: res.items
    }
  } else {
    return {
      jobs: []
    }
  }
}