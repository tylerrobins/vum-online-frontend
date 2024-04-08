document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.single-select-checkbox input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', idPassportLabelHandler);
    });
    
    function idPassportLabelHandler() {
        const label = document.getElementById('id_number_label');
        label.textContent = this.id === 'sa_citizen' ? 'What is your ID number?' : 'What is your Passport Number?';
        const idNumber = document.getElementById('id_number');
        idNumber.placeholder = this.id === 'sa_citizen' ? 'ID Number' : 'Passport Number';
    }
});

