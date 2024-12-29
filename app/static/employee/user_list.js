document.addEventListener('DOMContentLoaded', ()=>{
    function filterEmployees(){
        const query = document.getElementById('search-input').value.toLowerCase();
        console.log('Search query :', query);
        const employees = document.querySelectorAll('.member-section');

        employees.forEach(employee => {
            const nameElement = employee.querySelector('.member__name');
            if(nameElement){
                const name = nameElement.textContent.toLowerCase();
                if(name.includes(query)) {
                    employee.style.display = 'block';
                }
                else{
                    employee.style.display='none';
                }
            }
        });
    }
    const searchInput = document.getElementById('search-input');
    if(searchInput)
        searchInput.addEventListener('input', filterEmployees);
})