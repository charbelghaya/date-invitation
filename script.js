// ===============================
// CREATE INVITATION PAGE
// ===============================

function generateLink() {
    const yourName = document.getElementById("yourName")?.value || "";
    const partnerName = document.getElementById("partnerName")?.value || "";
    const restaurant = document.getElementById("restaurant")?.value || "";
    const date = document.getElementById("date")?.value || "";
    const time = document.getElementById("time")?.value || "";
    const message = document.getElementById("message")?.value || "";
    const photo = document.getElementById("photo")?.value || "";
    const maps = document.getElementById("maps")?.value || "";

    const inviteUrl = new URL("./invite.html", window.location.href);

    inviteUrl.searchParams.set("yourName", yourName);
    inviteUrl.searchParams.set("partnerName", partnerName);
    inviteUrl.searchParams.set("restaurant", restaurant);
    inviteUrl.searchParams.set("date", date);
    inviteUrl.searchParams.set("time", time);
    inviteUrl.searchParams.set("message", message);
    inviteUrl.searchParams.set("photo", photo);
    inviteUrl.searchParams.set("maps", maps);

    document.getElementById("generatedLink").value = inviteUrl.toString();

    const linkSection = document.getElementById("linkSection");
    if (linkSection) {
        linkSection.classList.remove("hidden");
    }
}

function copyLink() {
    const linkField = document.getElementById("generatedLink");

    if (!linkField || !linkField.value) {
        alert("Generate a link first.");
        return;
    }

    navigator.clipboard.writeText(linkField.value)
        .then(() => {
            alert("Link copied successfully!");
        })
        .catch(() => {
            alert("Failed to copy link.");
        });
}


// ===============================
// INVITATION PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const partnerText = document.getElementById("partnerText");

    // Not on invite page
    if (!partnerText) return;

    const params = new URLSearchParams(window.location.search);

    const yourName = params.get("yourName") || "";
    const partnerName = params.get("partnerName") || "";
    const restaurant = params.get("restaurant") || "";
    const date = params.get("date") || "";
    const time = params.get("time") || "";
    const message = params.get("message") || "";
    const photo = params.get("photo") || "";
    const maps = params.get("maps") || "";

    partnerText.innerText =
        partnerName
            ? `${partnerName}, I have something special ❤️`
            : "I have something special ❤️";

    const photoDisplay = document.getElementById("photoDisplay");

    if (photoDisplay && photo) {
        photoDisplay.src = photo;
        photoDisplay.style.display = "block";
    }

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    let attempts = 0;

    const noMessages = [
        "Are you sure? 🥺",
        "Really? 😢",
        "Think again ❤️",
        "Please 💕",
        "Last chance 😘"
    ];

    if (noBtn && yesBtn) {
        noBtn.addEventListener("click", () => {

            if (attempts < noMessages.length) {

                noBtn.innerText = noMessages[attempts];

                yesBtn.style.transform =
                    `scale(${1 + attempts * 0.15})`;

                noBtn.style.position = "relative";
                noBtn.style.left =
                    Math.floor(Math.random() * 200) + "px";

                noBtn.style.top =
                    Math.floor(Math.random() * 100) + "px";

                attempts++;
            } else {
                noBtn.style.display = "none";
            }
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener("click", () => {

            document
                .getElementById("questionPage")
                ?.classList.add("hidden");

            document
                .getElementById("successPage")
                ?.classList.remove("hidden");

            const restaurantDisplay =
                document.getElementById("restaurantDisplay");

            const dateDisplay =
                document.getElementById("dateDisplay");

            const timeDisplay =
                document.getElementById("timeDisplay");

            const messageDisplay =
                document.getElementById("messageDisplay");

            if (restaurantDisplay)
                restaurantDisplay.innerText =
                    restaurant ? `🍽 ${restaurant}` : "";

            if (dateDisplay)
                dateDisplay.innerText =
                    date ? `📅 ${date}` : "";

            if (timeDisplay)
                timeDisplay.innerText =
                    time ? `🕒 ${time}` : "";

            if (messageDisplay)
                messageDisplay.innerText = message;

            const mapsBtn =
                document.getElementById("mapsBtn");

            if (mapsBtn) {
                if (maps) {
                    mapsBtn.href = maps;
                    mapsBtn.target = "_blank";
                } else {
                    mapsBtn.style.display = "none";
                }
            }
        });
    }
});
