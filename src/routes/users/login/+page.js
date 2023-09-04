import { redirect } from "@sveltejs/kit";
import { checkLoggedIn } from "../../../utils/auth";

export async function load () {
    if (await checkLoggedIn()) {
        throw redirect(301, '/')
    }
}