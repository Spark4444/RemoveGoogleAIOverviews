// Functions
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

function selectAiOverviewElement() {
    return document.querySelector("#eKIzJc");
}

// Variables
let removeGoogleAIOverviews = true;

// Function to remove the AI overview element
function removeAIOverview(remove = true) {
    // Check the argument remove and check if the element exists
    let aiOverview = selectAiOverviewElement();
    if (remove && aiOverview) {
        aiOverview.remove();

        const interval = setInterval(() => {
            aiOverview = selectAiOverviewElement();
            if (aiOverview) {
                aiOverview.remove();
            }
        }, 100);

        // Stop the interval after 5 seconds to prevent memory leaks
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }
}

// Get the value from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    removeGoogleAIOverviews = checkIfAValueIsSet(value, false);
    saveToChromeStorage("removeGoogleAIOverviews", removeGoogleAIOverviews);

    // Remove the AI overview if the setting is enabled
    // The "removeGoogleAIOverviews" varaible is reversed to match the checkbox state
    removeAIOverview(!removeGoogleAIOverviews);
});

// Listen for changes in Chrome storage to update the page
// If value changes, reload the page

// Why use this listener over window "focus" event?
// 1. This event will work even if the tab is running in the background.
// 2. This event only triggers when the value changes, not when the tab is focused so more efficient.
// 3. Focus is not reliable when the user is in the current tab, you would have to send a message from the pop up script to the content script to reload the page, which is more complex and less efficient.
// 4. This event listener takes care of both scenarios
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.removeGoogleAIOverviews) {
        const newValue = changes.removeGoogleAIOverviews.newValue;
        if (newValue !== removeGoogleAIOverviews) {
            window.location.reload();
        }
    }
});