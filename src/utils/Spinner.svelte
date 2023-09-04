<script>
  export let buttonText;

  let isLoading = false;

  export function showSpinner() {
    isLoading = true;
  }

  export function hideSpinner() {
    isLoading = false;
  }
</script>

<button class="btn { isLoading ? 'btn btn-md loading' : 'btn btn-md' }">
    {buttonText}
</button>