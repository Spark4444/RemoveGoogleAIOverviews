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

// Variables
let aiOveriew = document.querySelector("#eKIzJc");
let removeGoogleAIOverviews = true;

// Get the value from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    removeGoogleAIOverviews = checkIfAValueIsSet(value, true);

    // Remove the AI overview if the setting is enabled
    if (aiOveriew && !removeGoogleAIOverviews) {
        aiOveriew.remove();

        setTimeout(() => {
            let aiOveriew = document.querySelector("#eKIzJc");
            if (aiOveriew) {
                aiOveriew.remove();
            }
        }, 1000);
    }
});

// Listen for messages from the popup to update the page if the setting changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleChange") {
        window.location.reload();
    }
});