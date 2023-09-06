<script>
    // Import necessary modules
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
  
    // Initialize variables for tracking link clicks and transition status
    let linkClicked = false;
    let transitionEnded = false;
  
    // Function to handle link clicks
    function handleLinkClick(event) {
      event.preventDefault();
  
      // Set linkClicked to true and update the window location after a timeout
      linkClicked = true;
      setTimeout(() => {
        window.location.href = event.target.href;
      }, 300); // Adjust the timeout value to match the transition duration in CSS
    }
  
    // Perform actions on component mount
    onMount(() => {
      // Set transitionEnded to true after a timeout
      setTimeout(() => {
        transitionEnded = true;
      }, 300); // Adjust the timeout value to match the transition duration in CSS
  
      // Listen to the window load event to trigger the transition after navigation
      window.addEventListener('load', () => {
        transitionEnded = true;
      });
    });
  </script>
  
  <header>
    {#if $page.route.id === '/guides'}
      <h1>This is the Guides Header</h1>
    {/if}
  </header>
  
  <main transition:fade="{{ duration: 300 }}" class:page-transition="{ linkClicked && transitionEnded }">
    <slot />
  </main>
  
  <footer></footer>
  
  <style>
    /* CSS styles for the header, main, and footer */
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-content: flex-start;
      width: 80vw;
      height: auto;
      text-align: center;
      margin: 20px auto;
    }
  
    main {
      max-width: 960px;
      margin: 20px auto;
    }
  
    footer {
      text-align: center;
    }
  
  
    /* CSS styles for the transition effect */
    .page-transition {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  </style>
  