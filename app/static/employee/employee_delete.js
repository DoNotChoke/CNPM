document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/');
    const employeeId = pathParts[pathParts.length - 1];

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger swal2-styled swal2-delete"
        },
        buttonsStyling: true
    });

    async function deleteEmp() {
        try {
            const response = await fetch(`/employee_info/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // alert('Xóa nhân viên thành công');
                    // window.location.href = '/employee_list';
                    swalWithBootstrapButtons.fire({
                        title: "Đã xóa!",
                        text: "Dữ liệu đã được xóa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/employee_list';
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

    function attachDeleteButton(button) {
        button.addEventListener('click', function () {
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
                   deleteEmp();                  
                } else {
                    swalWithBootstrapButtons.fire({
                        title: "Đã hủy thao tác",
                        text: "Bạn đã không thực hiện thao tác xóa !",
                        icon: "error"
                    });
                }
            });
        })
    }

    function attachDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete_employee');
        deleteButtons.forEach((deleteButton) => {
            attachDeleteButton(deleteButton);
        })
    }
    attachDeleteButtons();
})