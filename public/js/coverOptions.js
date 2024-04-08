document.addEventListener('DOMContentLoaded', () => {
    let selectedCoverOptions = null;

    const coverOptionDivs = document.querySelectorAll('.cover-option-div');
    const coverOpts = document.getElementsByClassName('coverOpt-class');
    const coverDetailsTables = document.querySelectorAll('.cover-details-div');

    Array.from(coverOpts).forEach((radioButton) => {
        radioButton.addEventListener('click', (event) => {
            toggleVisibility(event.target);
        });
    });

    const toggleVisibility = (selectedElement) => {
        console.log(selectedElement)
        if (selectedCoverOptions == selectedElement){
            hideCoverDetails(selectedElement)
        } else {
            showCoverDetails(selectedElement)
            selectedCoverOptions = selectedElement
        }
    };

    function showCoverDetails(elem){
        coverOptionDivs.forEach(div => {
            if (div.contains(elem)) {
                const detailsId = `cover-details-${elem.id}`;
                document.getElementById(detailsId).style.display = 'block';
                document.querySelector(`label[for="${elem.id}"]`).classList.add('selected')
            } else {
                div.classList.add('hidden');
            }
        });
    }

    function hideCoverDetails(elem){
        document.querySelector(`label[for="${elem.id}"]`).classList.remove('selected')
        // Hide tables
        coverDetailsTables.forEach(table => {
                table.style.display = 'none';
        });
        // Show cover options
        coverOptionDivs.forEach(div => {
            div.classList.remove('hidden')
        })
        elem.checked = false
        selectedCoverOptions = null
    }
});