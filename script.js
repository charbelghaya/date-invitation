
// ===== SETUP PAGE =====

function generateLink() {

    const yourName = encodeURIComponent(document.getElementById("yourName")?.value || "");
    const partnerName = encodeURIComponent(document.getElementById("partnerName")?.value || "");
    const restaurant = encodeURIComponent(document.getElementById("restaurant")?.value || "");
    const date = encodeURIComponent(document.getElementById("date")?.value || "");
    const time = encodeURIComponent(document.getElementById("time")?.value || "");
    const message = encodeURIComponent(document.getElementById("message")?.value || "");
    const photo = encodeURIComponent(document.getElementById("photo")?.value || "");
    const maps = encodeURIComponent(document.getElementById("maps")?.value || "");

    // Works whether opened locally or from a web server
    const inviteUrl = new URL("invite.html", window.location.href);

    inviteUrl.searchParams.set("yourName", yourName);
    inviteUrl.searchParams.set("partnerName", partnerName);
    inviteUrl.searchParams.set("restaurant", restaurant);
    inviteUrl.searchParams.set("date", date);
    inviteUrl.searchParams.set("time", time);
    inviteUrl.searchParams.set("message", message);
    inviteUrl.searchParams.set("photo", photo);
    inviteUrl.searchParams.set("maps", maps);

    document.getElementById("generatedLink").value = inviteUrl.toString();
    document.getElementById("linkSection").classList.remove("hidden");
}

function copyLink() {
    const field = document.getElementById("generatedLink");
    if (!field) return;

    field.select();
    field.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(field.value)
        .then(() => alert("Link copied!"))
        .catch(() => alert("Copy failed. Copy manually."));
}

// ===== INVITE PAGE =====

document.addEventListener("DOMContentLoaded", () => {

    if (!document.getElementById("partnerText")) return;

    const params = new URLSearchParams(window.location.search);

    const partner = decodeURIComponent(params.get("partnerName") || "");
    const restaurant = decodeURIComponent(params.get("restaurant") || "");
    const date = decodeURIComponent(params.get("date") || "");
    const time = decodeURIComponent(params.get("time") || "");
    const message = decodeURIComponent(params.get("message") || "");
    const photo = decodeURIComponent(params.get("photo") || "");
    const maps = decodeURIComponent(params.get("maps") || "");

    document.getElementById("partnerText").innerText =
        partner ? `${partner}, I have something special ❤️` : "I have something special ❤️";

    if (photo) {
        const img = document.getElementById("photoDisplay");
        img.src = photo;
        img.classList.remove("hidden");
    }

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    let count = 0;
    const msgs = ["Are you sure? 🥺", "Really? 😭", "Think again ❤️", "Please 💕", "Last chance 😘"];

    noBtn.onclick = () => {
        if (count < msgs.length) {
            noBtn.innerText = msgs[count];
            yesBtn.style.transform = `scale(${1 + count * 0.15})`;

            noBtn.style.left = Math.random() * 220 + "px";
            noBtn.style.top = Math.random() * 140 + "px";

            count++;
        } else {
            noBtn.style.display = "none";
        }
    };

    yesBtn.onclick = () => {
        document.getElementById("questionPage").classList.add("hidden");
        document.getElementById("successPage").classList.remove("hidden");

        document.getElementById("restaurantDisplay").innerText = restaurant ? "🍽 " + restaurant : "";
        document.getElementById("dateDisplay").innerText = date ? "📅 " + date : "";
        document.getElementById("timeDisplay").innerText = time ? "🕒 " + time : "";
        document.getElementById("messageDisplay").innerText = message;

        const mapsBtn = document.getElementById("mapsBtn");

        if (maps) {
            mapsBtn.href = maps;
        } else {
            mapsBtn.style.display = "none";
        }
    };
});
