// Varaibles
let checkbox = document.querySelector("#iosToggle");

// Retrieve the current setting from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    checkbox.checked = !checkIfAValueIsSet(value, false);
});

// Add event listener to the checkbox to save the setting
checkbox.addEventListener("input", () => {
    let isChecked = !checkbox.checked;

    // Check if the value in Chrome storage is different from the checkbox state and save it
    getFromChromeStorage("removeGoogleAIOverviews", (value) => {
        value = checkIfAValueIsSet(value, false);
        if (value !== isChecked) {
            // Reverse the value to match the checkbox state
            saveToChromeStorage("removeGoogleAIOverviews", isChecked);
        }
    });
});