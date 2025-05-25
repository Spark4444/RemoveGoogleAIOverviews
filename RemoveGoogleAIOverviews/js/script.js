let aiOveriew = document.querySelector("#eKIzJc");

if (aiOveriew) {
    aiOveriew.remove();

    setTimeout(() => {
        let aiOveriew = document.querySelector("#eKIzJc");
        if (aiOveriew) {
            aiOveriew.remove();
        }
    }, 1000);
}