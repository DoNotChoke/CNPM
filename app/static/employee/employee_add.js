document.addEventListener('DOMContentLoaded', ()=>{
    function getFormData(form){
        const formData = new FormData(form);
        const isAdminCheckBox = form.querySelector('input[name="is_admin"]');
        if (isAdminCheckBox) {
            const isAdminValue = isAdminCheckBox.checked ? 'true' : 'false';
            formData.set('is_admin', isAdminValue);
        } else {
            formData.set('is_admin', 'false');
            console.warn('Checkbox "is_admin" không tồn tại trong biểu mẫu.');
        }
        return formData;
    }
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const formData = getFormData(addUserForm);
        const requiredFields = ['name', 'major', 'position', 'dob', 'gender', 'email', 'address'];
        const missingFields = requiredFields.filter(field => !formData.get(field));

        if (missingFields.length > 0) {
            Swal.fire({
                title: 'Thiếu thông tin!',
                text: 'Vui lòng điền đầy đủ các trường bắt buộc.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        try{
            const response = await fetch('/employee_add',{
                method:'POST',
                body: formData
            });
            if(response.ok){
                const result = await response.json();
                if(result.success){

                    addUserForm.reset();
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Nhân viên mới đã được thêm vào cơ sở dữ liệu",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href='/employee_list';
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: result.message,
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                }
            }
            else{
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
            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Đã xảy ra lỗi khi gửi dữ liệu.",
                icon: "error",
                confirmButtonText: 'Đóng'
            });
        }
    });
});