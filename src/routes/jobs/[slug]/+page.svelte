<script>
    import humanize from 'humanize-plus';
    import SvelteMarkdown from 'svelte-markdown';
	import { getUserID } from '../../../utils/auth.js';
    import { goto } from '$app/navigation';
    export let data;

    function edit() {
        goto( '/jobs/' + data.job.id + '/update')
    }
</script>

<div class="mt-10 pl-9 pr-9">
    <div class="flex">
        <div class="flex-1">
          <h1 class="text-3xl font-extrabold grid grid-cols-6 justify-evenly w-full">
              <span class="w-80">{data.job.title}</span>
              {#if data.job.user == getUserID()}
                  <button on:click={edit} class="btn btn-outline col-start-7">EDIT Job</button>
              {/if}
          </h1>
          <p class="text-xl">{data.job.employer}</p>
          
        </div>
    </div>
    
      <div class="flex flex-row w-full mt-8">
        
          <div class="basis-2/3 prose max-w-none w-full">
              <h2 class="text-xl font-bold underline underline-offset-2">Job Description</h2>
              <div>
                  <SvelteMarkdown source = {data.job.description} />
              </div>
          <div class="mt-6" />

          

              <h2 class="text-xl font-bold underline underline-offset-2">Job Requirements</h2>
                  <div>
                      <SvelteMarkdown source = {data.job.requirements} />
                  <div />
              <div class="mt-6" />

              <h2 class="text-xl font-bold underline underline-offset-2">Application Instructions</h2>
                  <p>{data.job.applicationInstructions}</p>
          </div>
          
          
          <div class="basis-1/3 ml-4">

                  
              <h2 class="text-xl font-bold underline underline-offset-2">Job Location</h2>
                  <p>{data.job.location}</p>
              <div class="mt-6" />
            
              <h2 class="text-xl font-bold underline underline-offset-2">Salary Range</h2>
                  <p>
                    RMB {humanize.formatNumber(data.job.minAnnualCompensation)} - RMB
                    {humanize.formatNumber( data.job.maxAnnualCompensation )}
                  </p>
          </div>
      </div>
    </div>
</div>