document.addEventListener('DOMContentLoaded', () => {
    initializeBarFields();
});
function initializeBarFields() {
    const barItemsSelected = document.getElementById('barItemsSelected');
    
    // Function to be called on 'change' event and initial load
    const updateBarFields = () => {
        Object.values(document.getElementsByClassName('barItemCategoryClass')).forEach((element) => {
            element.classList.add('hidden');
        });
        Object.values(document.getElementsByClassName('barItemInputClass')).forEach((element) => {
            element.required = false;
        });
        for (let i = 1; i <= barItemsSelected.value; i++) {
            document.getElementById(`bar-item-category-div${i}`).classList.remove('hidden');
            document.getElementById(`barItem${i}Category`).required = true;
        }
    };

    // Call updateBarFields initially and on 'change' event
    updateBarFields(); // Call it here to apply logic after the DOM is fully loaded
    barItemsSelected.addEventListener('change', updateBarFields);
}