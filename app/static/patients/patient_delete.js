document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/');
    const patientId = pathParts[pathParts.length - 1];
    const deleteButton = document.getElementById('delete-button');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger swal2-styled swal2-delete"
        },
        buttonsStyling: true
    });

    async function deletePat() {
        try {
            const response = await fetch(`/patient_info/${patientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    swalWithBootstrapButtons.fire({
                        title: "Đã xóa!",
                        text: "Dữ liệu đã được xóa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/patients_list';
                        }
                    });
                } else {
                    // alert('Có lỗi xảy ra: ' + result.message);
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: result.message,
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                }
            } else {
                // alert('Không thể kết nối đến server. Vui lòng thử lại sau.');
                Swal.fire({
                    title: 'Có lỗi xảy ra !',
                    text: "Không thể kết nối đến server. Vui lòng thử lại sau.",
                    icon: "error",
                    confirmButtonText: 'Đóng'
                });
            }
        } catch (error) {
            console.log(error);
            // alert('Đã xảy ra lỗi khi gửi dữ liệu.');
            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Đã xảy ra lỗi khi gửi dữ liệu.",
                icon: "error",
                confirmButtonText: 'Đóng'
            });
        }
    }

    deleteButton.addEventListener('click', function () {
            swalWithBootstrapButtons.fire({
                title: "Bạn thực sự muốn xóa?",
                text: "Sẽ không thể khôi phục lại được nữa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Có, tôi muốn xóa!",
                cancelButtonText: "Không, hãy hủy thao tác này!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    deletePat();
                } else {
                    swalWithBootstrapButtons.fire({
                        title: "Đã hủy thao tác",
                        text: "Bạn đã không thực hiện thao tác xóa !",
                        icon: "error"
                    });
                }
            });
        })
    })

    // deleteButton.addEventListener('click', async function(event){
    //     if(confirm('Bạn có chắc chắn muốn xóa bệnh nhân này?')){
    //         try{
    //             const response = await fetch(`/patient_info/${patientId}`,{
    //                 method:'DELETE',
    //                 headers:{
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             if(response.ok){
    //                 const result = await response.json();
    //                 if(result.success){
    //                     alert('Xóa bệnh nhân thành công');
    //                     window.location.href = '/patients_list';
    //                 }
    //                 else{
    //                     alert('Có lỗi xảy ra: '+ result.message);
    //                 }
    //             }
    //             else{
    //                 alert('Không thể kết nối đến server. Vui lòng thử lại sau.');
    //             }
    //         }
    //         catch(error){
    //             console.log(error);
    //             alert('Đã xảy ra lỗi khi gửi dữ liệu');
    //         }
    //     }
    // })

    // function attachDeleteButton(button) {
    //     button.addEventListener('click', function () {
    //         swalWithBootstrapButtons.fire({
    //             title: "Bạn thực sự muốn xóa?",
    //             text: "Sẽ không thể khôi phục lại được nữa!",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonText: "Có, tôi muốn xóa!",
    //             cancelButtonText: "Không, hãy hủy thao tác này!",
    //             reverseButtons: true
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                deleteEmp();                  
    //             } else {
    //                 swalWithBootstrapButtons.fire({
    //                     title: "Đã hủy thao tác",
    //                     text: "Bạn đã không thực hiện thao tác xóa !",
    //                     icon: "error"
    //                 });
    //             }
    //         });
    //     })
    // }