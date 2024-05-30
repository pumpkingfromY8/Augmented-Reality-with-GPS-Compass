const reloadSound = document.getElementById("reloadSound");

// Function to clear all data from local storage and update the list
function clearAll() {
    // Play the sound effect
   
    reloadSound.play();
 
     localStorage.removeItem("killsData");
     updateKillsList();
     kill = 0;
     document.querySelector("#kill_dis").innerHTML = `Kills: ${kill}`;
 }


   document.addEventListener("DOMContentLoaded", () => {
        const backgroundMusic = document.getElementById("backgroundMusic");
        backgroundMusic.volume = 0.1; // Set volume to 20%
    });