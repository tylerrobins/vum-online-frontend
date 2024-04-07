document.addEventListener('DOMContentLoaded', () => {
    console.log('business details js loaded')
    const bisActDropdown = document.getElementById('bisAct');
    const otherBisAct = document.getElementById('business-activity-other-div');
    bisActDropdown.addEventListener('change', function () {
        this.value == 'Other' ? otherBisAct.classList.remove('hidden') : otherBisAct.classList.add('hidden');
    });

    const nextBtn = document.getElementById('next_btn');
    nextBtn.addEventListener('click', () => {
        console.log("NEXT BUTTONS")
        const formElement = document.getElementById('business-details-form');
        const formData = new FormData(formElement);

        const cellNumber = formData.get('cellNumber');

        const dataObject = {};
    

        formData.forEach((value, key) => dataObject[key] = value);
        const dataJson = JSON.stringify(dataObject);

        // Validate form
        if (!object.business_name || !object.business_address || !object.bisAct) {
            alert('Please fill in all fields');
            return;
        }
    });
});