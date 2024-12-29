document.addEventListener('DOMContentLoaded', ()=>{
    function getFormData(form){
        const formData = new FormData(form)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    const addPatientForm = document.getElementById('add-patient-form');
    addPatientForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const data = getFormData(addPatientForm);
        try{
            const response = await fetch('/add_patient',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(response.ok){
                const result = await response.json();
                if(result.success){
                    // alert('Thêm bệnh nhân thành công !');
                    // addPatientForm.reset();
                    // window.location.href = '/patients_list';

                    addPatientForm.reset();
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Thêm bệnh nhân thành công !",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href='/patients_list';
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
    });
});