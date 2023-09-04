<script>
    import { alerts } from "./alert.js";
    import { afterNavigate } from '$app/navigation';

    let alertMessage = null
    let alertType = null

    $: if ($alerts.message && $alerts.type) {
        alertMessage = $alerts.message
        alertType = $alerts.type
    }

    function resetAlert() {
        if ($alerts.message && $alerts.type) {
            alerts.clear()
        } else {
            alertMessage = $alerts.message
            alertType = $alerts.type
        }
    }

    afterNavigate(() => resetAlert())
</script>

<div class="alert {alertMessage ? 'alert-error shadow-lg alert-{alertType}' : 'hidden'} w-1/2 justify-center m-auto">
    <div>
    <img src="../src/icon/alert.svg" alt="alert">
      <span>{ alertMessage }</span>
    </div>
</div>