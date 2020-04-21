// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  console.log("Will service worker register?");
  navigator.serviceWorker.register('service-worker.js').then(function(reg){
    console.log("Yes it did.");
  }).catch(function(err) {
    console.log("No it didn't. This happened: ", err)
  });
}


// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log("111");
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    console.log("222");
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
  console.log("333");
});
