document.addEventListener('DOMContentLoaded', () => {
    console.log('inception js loaded')
    document.getElementById('prev_btn').addEventListener('click', function(event) {
        event.preventDefault()
        console.log(this.value)
        window.location.href = this.value
    })
})