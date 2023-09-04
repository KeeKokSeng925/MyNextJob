<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getUserID, getTokenFromLocalStorage } from './../../../utils/auth.js';
	import SpinnerButton from './../../../utils/Spinner.svelte';
    let formErrors = {};
    let spinnerButton;

    function postCreateJob() {
        goto('/')
    }

    async function createJob(event) {
        event.preventDefault()

        spinnerButton.showSpinner()

        const jobData = {
            user: getUserID(),
            title: event.target['title'].value,
            minAnnualCompensation: event.target['minAnnualCompensation'].value,
            maxAnnualCompensation: event.target['maxAnnualCompensation'].value,
            description: event.target['description'].value,
            requirements: event.target['requirements'].value,
            applicationInstructions: event.target['applicationInstructions'].value,
            location: event.target['location'].value,
            employer: event.target['employer'].value
        }

        const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
            method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
            },
            body: JSON.stringify(jobData)
        })

        if (response.status == 200) {
            postCreateJob()
        } else {
            const res = await response.json()
            formErrors = res.data
        }

        spinnerButton.hideSpinner()
    }
</script>

<h1 class="text-center text-xl mt-5">Your Job Details</h1>

<div class="flex justify-center items-center mt-5">
    <form class="w-7/12" on:submit={createJob}>
        <div class="grid grid-cols-2 gap-7 w-full">
            <div class="form-control">
                <label class="input-group">
                    <span>Position Title</span>
                    <input 
                        type="text"
                        name="title"
                        placeholder="Data Analyst" 
                        class="input input-bordered w-full"
                        required
                    />
                </label>
            </div>
            
            <div class="form-control">
                <label class="input-group">
                    <span>Employer</span>
                    <input 
                        type="text"
                        name="employer"
                        placeholder="Alibaba" 
                        class="input input-bordered w-full"
                        required
                    />
                </label>
            </div>
        </div>

        
        <div class="form-control w-full mt-5">
            <label class="input-group input-group-vertical">
                <span class="p-3">Job Description</span>
                <textarea
                    type="text" 
                    name="description"
                    placeholder="" 
                    class="input input-bordered h-28 pt-1"
                    required 
                />
            </label>
        </div>


        <div class="form-control w-full mt-5">
            <label class="input-group input-group-vertical">
                <span class="p-3">Job Requirements</span>
                <textarea
                    type="text" 
                    name="requirements"
                    placeholder="" 
                    class="input input-bordered h-28 pt-1"
                    required 
                />
            </label>
        </div>

        <div class="form-control w-full mt-5">
            <label class="input-group input-group-vertical">
                <span class="p-3">Application Instructions</span>
                <textarea
                    type="text" 
                    name="applicationInstructions"
                    placeholder="" 
                    class="input input-bordered pt-1"
                    required 
                />
            </label>
        </div>


        <div class="grid grid-cols-6 gap-7 w-full mt-5">
            <div class="form-control col-span-2">
                <label class="input-group">
                    <span>Job Location</span>
                    <input 
                        type="text"
                        name="location"
                        placeholder="e.g. China" 
                        class="input input-bordered w-full"
                        required
                    />
                </label>
            </div>

            <div class="form-control col-span-4">
                <label class="input-group">
                    <span class="w-44">Salary Range | RMB</span>
                    <input 
                        type="number"
                        name="minAnnualCompensation"
                        placeholder="8888" 
                        class="input input-bordered w-28"
                        required
                    />
                    <span class="w-24">to RMB</span>
                    <input 
                        type="number"
                        name="maxAnnualCompensation"
                        placeholder="38888" 
                        class="input input-bordered w-28"
                        required
                    />
                </label>
            </div>
        </div>

        <div class="form-control w-full mt-4">
            <SpinnerButton buttonText="Submit Your Job" bind:this={spinnerButton} />
        </div>
    </form>
</div>