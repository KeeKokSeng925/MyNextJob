<script>
  import '../app.css';
  import Nav from '../utils/Head.svelte';
  import Alert from '../utils/Alerts.svelte';
  import { themes } from '../utils/theme.js';
</script>

<Nav />

<div data-theme="{$themes[2]}" class="
container 
mt-0 
pt-2 
pb-28"
style="min-width:100%; min-height:93.4vh">
  <Alert />
  <slot />
</div>

<div data-theme="{$themes[2]}" class="h-0" />