function dateOptions() {
    let result = {};
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    result.currentDate = formatDateToString(today); // Using formatString as a method
    result.tomorrowDate = formatDateToString(tomorrow); // Using formatString as a method
    if (today.getMonth() == 11) {
        var firstNextMonth = new Date(today.getFullYear() + 1, 0, 1);
    } else {
        var firstNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }
    result.firstNextMonth = formatDateToString(firstNextMonth); // Using formatString as a method
    return result;
}

function formatDateToString(dateParam) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let date = dateParam.getDate();
    let month = monthNames[dateParam.getMonth()];
    let year = dateParam.getFullYear();
    return `${date}-${month}-${year}`;
}

module.exports = dateOptions;