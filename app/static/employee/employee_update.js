
document.addEventListener('DOMContentLoaded', ()=>{
    function getFormData(form){
        const formData = new FormData(form);
        return formData;
    }
    const updateEmployeeForm = document.getElementById('update-employee-form');
    updateEmployeeForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const data = getFormData(updateEmployeeForm);
        const pathParts = window.location.pathname.split('/');
        const employeeId = pathParts[pathParts.length-1];

        try{
            const response = await fetch(`/employee_update/${employeeId}`, {
                method:'PUT',
                body: data
            });
            if(response.ok){
                const result = await response.json();
                if(result.success){
                    // alert('Cập nhật thông tin nhân viên thành công !');
                    // updateEmployeeForm.reset();
                    // window.location.href = `/employee_info/${employeeId}`;
                    updateEmployeeForm.reset();
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Cập nhật thông tin nhân viên thành công",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                                window.history.back
                        }
                    });
                }
                else{
                    // alert('Có lỗi xảy ra: ' + result.message);
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: result.message,
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                }
            }
            else{
                // alert('Không thể kết nối đến server. Vui lòng thử lại sau.');
                Swal.fire({
                    title: 'Có lỗi xảy ra !',
                    text: "Không thể kết nối đến server. Vui lòng thử lại sau.",
                    icon: "error",
                    confirmButtonText: 'Đóng'
                });
            }
        }
        catch(error){
            console.error('Error:', error);
            // alert('Đã xảy ra lỗi khi gửi dữ liệu.');
            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Đã xảy ra lỗi khi gửi dữ liệu.",
                icon: "error",
                confirmButtonText: 'Đóng'
            });
        }
    })

})