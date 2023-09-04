<script>
	import humanize from 'humanize-plus'
	import { getUserID } from '../utils/auth.js'
	import { themes } from '../utils/theme.js'
	export let data
</script>

<style>
	.white {
		filter: brightness(0) invert(1);
	}
</style>

<h1 class="text-center text-xl font-bold mt-3">Find Your Next Job</h1>

<div class="overflow-x-auto w-full pl-9 pr-9">
	{#each data.jobs as job}
		<div class="flex flex-col mt-10">
			<div>
				
				<a class="indicator" href="/jobs/{job.id}">
					{#if job.user == getUserID()}
						{#if $themes[0] == 'darkMode'}
							<img src="src/icon/edit.svg" alt="edit" style="width:25px"
							class="
								indicator-item 
								indicator-top 
								indicator-end 
								pl-3 
								pt-3 
								white
								" />
						{:else}
							<img src="src/icon/edit.svg" alt="edit" style="width:25px"
							class="
								indicator-item 
								indicator-top 
								indicator-end 
								pl-3 
								pt-3
								" />
						{/if}
					{/if}
					<span class="font-bold text-2xl">{job.title}</span>
				</a>
				<div class="text-sm mt-1">
					{job.employer} . {job.location} .
					<span class="text-sm"
						>RMB {humanize.formatNumber(job.minAnnualCompensation)} - RMB {humanize.formatNumber(
							job.maxAnnualCompensation
						)}</span
					>
				</div>
				<div class="italic text-xs opacity-50 mt-2">
					posted {new Date(job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</div>
			</div>

			<div class="mt-4 ">
				{job.description.slice(0, 240)}...
			</div>
		</div>
	{/each}
</div>
