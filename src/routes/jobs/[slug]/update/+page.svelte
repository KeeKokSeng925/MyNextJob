<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getTokenFromLocalStorage } from '../../../../utils/auth.js';
    import SpinnerButton from '../../../../utils/Spinner.svelte';
    export let data;
    let formErrors = {};
    let spinnerButton;

    const jobData = data.job

    function postUpdateJob() {
        goto('/jobs/' + data.job.id)
    }

    async function updateJob(event) {
        event.preventDefault()

        const newJobData = {
            user: data.job.user,
            title: event.target['title'].value,
            minAnnualCompensation: event.target['minAnnualCompensation'].value,
            maxAnnualCompensation: event.target['maxAnnualCompensation'].value,
            description: event.target['description'].value,
            requirements: event.target['requirements'].value,
            applicationInstructions: event.target['applicationInstructions'].value,
            location: event.target['location'].value,
            employer: event.target['employer'].value
        }

        const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records/' + data.job.id, {
            method: 'PATCH',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
            },
            body: JSON.stringify(newJobData)
        })

        if(response.status == 200) {
            postUpdateJob()
        } else {
            const res = await response.json()
            formErrors = res.data
        }
    }
</script>

<h1 class="text-center text-xl mt-5">Edit Your Job Detail</h1>

<div class="flex justify-center items-center mt-5">
    <form class="w-7/12" on:submit={updateJob}>
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
                        value= {jobData.title}
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
                        value= {jobData.employer}
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
                    value= {jobData.description}
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
                    value= {jobData.requirements}
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
                    value= {jobData.applicationInstructions}
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
                        value= {jobData.location}
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
                        value= {jobData.minAnnualCompensation}
                    />
                    <span class="w-24">to USD</span>
                    <input 
                        type="number"
                        name="maxAnnualCompensation"
                        placeholder="38888" 
                        class="input input-bordered w-28"
                        required
                        value= {jobData.maxAnnualCompensation}
                    />
                </label>
            </div>
        </div>

        <div class="form-control w-full mt-4">
            <SpinnerButton buttonText="Update Your Job" bind:this={spinnerButton} />
        </div>
    </form>
</div>
