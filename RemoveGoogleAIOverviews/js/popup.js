// Varaibles
let checkbox = document.querySelector("#iosToggle");

// Retrieve the current setting from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    checkbox.checked = checkIfAValueIsSet(value, false);
});

// Add event listener to the checkbox to save the setting
checkbox.addEventListener("input", () => {
    let isChecked = checkbox.checked;

    getFromChromeStorage("removeGoogleAIOverviews", (value) => {
        value = checkIfAValueIsSet(value, false);
        if (value !== isChecked) {
            saveToChromeStorage("removeGoogleAIOverviews", isChecked);
        }
    });
});