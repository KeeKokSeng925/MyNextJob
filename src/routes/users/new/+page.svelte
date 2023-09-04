<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser } from './../../../utils/auth.js';
	import { alerts } from '../../../utils/alert.js';
    import SpinnerButton from '../../../utils/Spinner.svelte';
    let formErrors = {};
    let spinnerButton;

    function postSignUp() {
        goto('/')
    }

    async function createUser(event) {
        event.preventDefault()
        
        if (event.target['password'].value != event.target['passwordConfirm'].value) {
            formErrors['passwordConfirm'] = { message: 'Password confirmation does not match' }
            return
        }

        const userData = {
            username: event.target['username'].value,
            email: event.target['email'].value,
            password: event.target['password'].value,
            passwordConfirm: event.target['passwordConfirm'].value
        }

        const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        if(response.status == 200) {
            const res = await authenticateUser(userData.username, userData.password)
            if(res.success) {
                postSignUp()
            } else {
                throw 'Sign up succeeded, please proceed Sign In'
            }
        } else {
            alerts.set('This username/email is already registered', 'warning')
            setTimeout(() => alerts.clear(), 1000)
            throw formErrors.message
        }
    }
</script>

<h1 class="text-center text-xl mt-5">Create Your Account to Post a Job</h1>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/users/login">
        Already have an account? Please click here to sign in instead.
    </a>
</div>

<div class="flex justify-center items-center mt-3 max-h-full">
    <form on:submit={createUser} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input 
                type="text"
                name="username"
                placeholder="Alexander Wong"
                class="input input-bordered w-full"
                required
            />

            {#if 'username' in formErrors}
                <label class="label" for="username">
                    <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
                </label>
            {/if}
        </div>
        
        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input 
                type="email"
                name="email"
                placeholder="alexanderwong@example.com"
                class="input input-bordered w-full"
                required
            />

            {#if 'email' in formErrors}
                <label class="label" for="email">
                    <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
                </label>
            {/if}
        </div>
        
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input 
                type="password"
                name="password"
                placeholder=""
                class="input input-bordered w-full"
                required
            />

            {#if 'password' in formErrors}
                <label class="label" for="password">
                    <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                </label>
            {/if}
        </div>
        
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password Confirmation</span>
            </label>
            <input 
                type="password"
                name="passwordConfirm"
                placeholder=""
                class="input input-bordered w-full"
                required
            />

            {#if 'passwordConfirm' in formErrors}
                <label class="label" for="password">
                    <span class="label-text-alt text-red-500">{formErrors['passwordConfirm'].message}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full mt-4">
            <SpinnerButton buttonText="Sign Up" bind:this={spinnerButton} />
        </div>
    </form>
</div>