document.addEventListener('DOMContentLoaded', ()=>{
        
    document.getElementById('barItemsNumDropdown').addEventListener('change', function() {
        Object.values(document.getElementsByClassName('barItemCategoryClass')).forEach((values) => {
            values.classList.add('hidden')
        })
        Object.values(document.getElementsByClassName('barItemInputClass')).forEach((values) => {
            values.required = false
        })        
        for (let i=1; i <= this.value; i++){
            document.getElementById(`bar-item-category-div${i}`).classList.remove('hidden')
            document.getElementById(`barItemCategory${i}`).required = true
        }
    });
});