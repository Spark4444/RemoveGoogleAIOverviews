// Function to save data to Chrome storage
function saveToChromeStorage(key, value) {
    chrome.storage.sync.set({[key]: value});
}

// Function to get data from Chrome storage
function getFromChromeStorage(key, callback) {
    chrome.storage.sync.get([key], function(result) {
        callback(result[key]);
    });
}

// Checks if a chrome storage value is set
function checkIfAValueIsSet(value, defaultValue){
    if(value == undefined){
        return defaultValue;
    }
    else{
        return value;
    }
}

// Function to remove the AI overview element
function removeAIOverview(remove = true) {
    if (remove){
        aiOveriew.remove();

        setTimeout(() => {
            let aiOveriew = document.querySelector("#eKIzJc");
            if (aiOveriew) {
                aiOveriew.remove();
            }
        }, 1000);
    }
}

// Variables
let aiOveriew = document.querySelector("#eKIzJc");
let removeGoogleAIOverviews = true;

// Get the value from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    removeGoogleAIOverviews = checkIfAValueIsSet(value, true);

    // Remove the AI overview if the setting is enabled
    // The "removeGoogleAIOverviews" varaible is reversed to match the checkbox state
    if (aiOveriew && !removeGoogleAIOverviews) {
        removeAIOverview();
    }
});

// Update the page if the setting changes when the tab is focused (e.g. when the user returns to the tab)
window.addEventListener("focus", () => {
    getFromChromeStorage("removeGoogleAIOverviews", (value) => {
        let currentRemoveAIOverviews = checkIfAValueIsSet(value, true);
        
        if (currentRemoveAIOverviews !== removeGoogleAIOverviews) {
            window.location.reload();
        }
    });
});

// Listen for messages from the popup to update the page if the setting changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleChange") {
        window.location.reload();
    }
});