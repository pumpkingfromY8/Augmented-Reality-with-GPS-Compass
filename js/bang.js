let kill = 0;

function bang() {
    var kill_dis = document.querySelector("#kill_dis");

    // Play the sound effect
    var bangSound = document.getElementById("bangSound");
    bangSound.play();

    kill++;
    kill_dis.innerHTML = `Kills: ${kill}`;

    // Check if the Geolocation API is available
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Retrieve existing kills data from localStorage
                let killsData = JSON.parse(localStorage.getItem("killsData")) || [];

                // Add new kill data
                killsData.push({
                    killNumber: kill,
                    latitude: latitude,
                    longitude: longitude,
                    timestamp: new Date().toISOString()
                });

                // Store updated kills data in localStorage
                localStorage.setItem("killsData", JSON.stringify(killsData));

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                // Update the kills list in the HTML
                updateKillsList();
            },
            (error) => {
                console.error("Error obtaining location", error);
            }
        );
    } else {
        console.error("Geolocation is not available in this browser");
    }
}

// Function to update the kills list in the HTML
function updateKillsList() {
    let killsData = JSON.parse(localStorage.getItem("killsData")) || [];
    let killsList = document.getElementById("killsList");

    // Clear existing list
    killsList.innerHTML = "";

    // Create and append list items
    killsData.forEach((kill) => {
        let listItem = document.createElement("div");
        listItem.textContent = `Kill ${kill.killNumber}: Latitude ${kill.latitude}, Longitude ${kill.longitude}`;
        killsList.appendChild(listItem);
    });
}



// Initial call to populate the list on page load
document.addEventListener("DOMContentLoaded", updateKillsList);