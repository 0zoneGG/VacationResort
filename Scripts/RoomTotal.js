function getRoomRate(checkInDate, roomType) {
    
    const date = new Date(checkInDate);
    const month = date.getMonth() + 1;

    let inSeasonRate, outOfSeasonRate;

    switch (roomType) {
        case "Queen":
            inSeasonRate = 250;
            outOfSeasonRate = 150;
            break;
        case "King":
            inSeasonRate = 250;
            outOfSeasonRate = 150;
            break;
        case "2-Bedroom Suite":
            inSeasonRate = 350;
            outOfSeasonRate = 210;
            break;
        default:
            inSeasonRate = 0;
            outOfSeasonRate = 0;
    }

    const currentRate = (month >= 6 && month <= 8) ? inSeasonRate : outOfSeasonRate;
    return currentRate;
}

window.onload = function() {
    const calculateTotalButton = document.getElementById("calculateTotal");
    calculateTotalButton.addEventListener("click", calculateRoomTotal);
};

function calculateRoomTotal() {
    const form = document.getElementById("reservationForm");

    const checkInDate = form.checkInDate.value;
    const roomType = form.roomType.value;
    const numberOfNights = parseInt(form.numberOfNights.value);
    const fullName = form.fullName.value;
    const email = form.email.value;
    let discount = getAppliedDiscount(form);
    
  
    const roomRate = getRoomRate(checkInDate, roomType);
    let roomTotal = roomRate * numberOfNights;

    if (discount === "AAA/Senior") {
        roomTotal *= 0.9; // 10% discount for AAA/Senior
    } else if (discount === "Military") {
        roomTotal *= 0.8; // 20% discount for Military
    }

    document.getElementById("itinerary").style.display = "block";
    document.getElementById("checkInDateDisplay").textContent = `Check-in Date: ${checkInDate}`;
    document.getElementById("guestNameDisplay").textContent = `Full Name: ${fullName}`;
    document.getElementById("guestEmailDisplay").textContent = `Email: ${email}`;
    document.getElementById("roomTypeDisplay").textContent = `Room Type: ${roomType}`;
    document.getElementById("numberOfNightsDisplay").textContent = `Number of Nights: ${numberOfNights}`;
    document.getElementById("discountAppliedDisplay").textContent = `Discount Applied: ${discount}`;
    document.getElementById("roomTotalDisplay").textContent = `Room Total: $${roomTotal.toFixed(2)}`;
}

function getAppliedDiscount(form) {
    let discountType = "None";
    if (form.discount.value === "AAA/Senior") {
        discountType = "AAA/Senior";
    } else if (form.discount.value === "Military") {
        discountType = "Military";
    }
    return discountType;
}