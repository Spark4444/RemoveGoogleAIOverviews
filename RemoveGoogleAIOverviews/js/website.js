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
let hideInterval;

// Function to hide or show the AI overview element
function hideShowAIOverview(hide = true) {
    const aiOverviewElement = selectAiOverviewElement();
    if (aiOverviewElement) {
        if (hide) {
            aiOverviewElement.style.display = "none";
        } 
        else {
            aiOverviewElement.style.display = "";
        }
    }
    else {
        // If element is not found, wait for it to appear and then hide or show it
        // Clear any existing interval to avoid multiple intervals running
        if (hideInterval) {
            clearInterval(hideInterval);
        }
        hideInterval = setInterval(() => {
            const aiOverviewElement = selectAiOverviewElement();
            if (aiOverviewElement) {
                if (hide) {
                    aiOverviewElement.style.display = "none";
                } 
                else {
                    aiOverviewElement.style.display = "";
                }
                clearInterval(interval);
            }
        }, 100);
    }
}

// Initial call to hide the AI overview element before checking the storage value
// Storage value takes time to load, so we hide it initially
hideShowAIOverview(true);

// Get the value from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    removeGoogleAIOverviews = checkIfAValueIsSet(value, false);

    // Save the value if it is not set
    saveToChromeStorage("removeGoogleAIOverviews", removeGoogleAIOverviews);

    // Remove the AI overview if the setting is enabled
    // The "removeGoogleAIOverviews" varaible is reversed to match the checkbox state
    hideShowAIOverview(!removeGoogleAIOverviews);
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
            removeGoogleAIOverviews = newValue;
            // Hide or show the AI overview element based on the new value
            hideShowAIOverview(!removeGoogleAIOverviews);
        }
    }
});