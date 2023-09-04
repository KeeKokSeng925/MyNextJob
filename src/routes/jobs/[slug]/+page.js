import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'

export async function load({ fetch, params }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`)
  const res = await response.json()
  
  if (response.status == 200) {
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}