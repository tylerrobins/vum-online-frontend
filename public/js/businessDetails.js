document.addEventListener('DOMContentLoaded', ()=> {
    console.log("DOM LOADED")

    const bisActDropdown = document.getElementById('bisAct');
    const otherBisAct = document.getElementById('business-activity-other-div')
    bisActDropdown.addEventListener('change', function() {
        this.value == 'Other' ? otherBisAct.classList.remove('hidden') : otherBisAct.classList.add('hidden')
    });
});