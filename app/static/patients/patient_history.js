document.addEventListener('DOMContentLoaded', ()=>{
    function getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    const addHistoryForm = document.getElementById('add-history-form');
    addHistoryForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const data = getFormData(addHistoryForm);
        const pathParts = window.location.pathname.split('/');
        const patientId = pathParts[pathParts.length-1];
        try{
            const response = await fetch(`/add_history/${patientId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            });
            if(response.ok){
                const result = await response.json();
                if(result.success){
                    addHistoryForm.reset();
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Cập nhật thông tin lịch sử khám thành công",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href=`/patient_info/${patientId}`;
                        }
                    });
                }
                else{
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
        catch (error){
            console.error('Error:', error);
            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Đã xảy ra lỗi khi gửi dữ liệu.",
                icon: "error",
                confirmButtonText: 'Đóng'
            });
        }
    })
})