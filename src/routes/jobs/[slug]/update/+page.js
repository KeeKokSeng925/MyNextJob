import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import { checkLoggedIn, getUserID } from '../../../../utils/auth';

export async function load({ fetch, params }) {
    const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);
    const res = await response.json()

    if (!await checkLoggedIn() || getUserID() != res.user) {
        throw redirect(302, ('/jobs/' + res.id))
    }

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