document.addEventListener('DOMContentLoaded', ()=>{
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', ()=>{
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach((row)=>{
            const patientName = row.querySelector('.patient_name').textContent;
            if(patientName.toLowerCase().includes(searchValue.toLowerCase())){
                row.style.display='';
            }
            else row.style.display='none';
        })
    })
})