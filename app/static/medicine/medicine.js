document.addEventListener('DOMContentLoaded', function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger swal2-styled swal2-delete"
        },
        buttonsStyling: true
    });

    function getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    function addMedicineToTable(medicine) {
        const tbody = document.querySelector('table tbody');
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="med_code">${medicine.id}</td>
            <td class="med_import-date">${medicine.date_in}</td>
            <td class="med_name">${medicine.name}</td>
            <td class="med_price-buy">${medicine.price_buy}</td>
            <td class="med_price-sell">${medicine.price_sell}</td>
            <td>${medicine.usage_}</td>
            <td>${medicine.effect}</td>
            <td class="med_expire">${medicine.expiry_date}</td>
            <td class="med_unit">${medicine.unit}</td>
            <td class="med_quantity">${medicine.quantity}</td>
            <td>
                <button class="med_edit btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#formNhapHangModalPut"
                        data-id="${medicine.id}" style="width: 40px; height: 40px; margin-right: 10px;">
                    <i class="far fa-edit"></i>
                </button>
                <button class="med_delete btn btn-danger" type="button" data-id="${medicine.id}" style="width: 40px; height: 40px;">
                    <i class="far fa-trash-alt"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
        attachEditButton(tr.querySelector('.med_edit'));
        attachDeleteButton(tr.querySelector('.med_delete'));
    }

    function updateMedicineInTable(medicine) {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const medId = row.querySelector('.med_code').textContent;
            if (parseInt(medId) === medicine.id) {
                row.querySelector('.med_import-date').textContent = medicine.date_in;
                row.querySelector('.med_name').textContent = medicine.name;
                row.querySelector('.med_price-buy').textContent = medicine.price_buy;
                row.querySelector('.med_price-sell').textContent = medicine.price_sell;
                row.cells[5].textContent = medicine.usage_;
                row.cells[6].textContent = medicine.effect;
                row.querySelector('.med_expire').textContent = medicine.expiry_date;
                row.querySelector('.med_unit').textContent = medicine.unit;
                row.querySelector('.med_quantity').textContent = medicine.quantity;
                if (row.cells.length > 9) {
                    row.cells[9].textContent = medicine.ghi_chu || '';
                }
            }
        });
    }

    function attachEditButton(button) {
        button.addEventListener('click', function () {
            const medicineId = this.getAttribute('data-id');
            const row = this.closest('tr');
            const date_in = row.querySelector('.med_import-date').textContent;
            const name = row.querySelector('.med_name').textContent;
            const price_buy = row.querySelector('.med_price-buy').textContent;
            const price_sell = row.querySelector('.med_price-sell').textContent;
            const usage_ = row.cells[5].textContent;
            const effect = row.cells[6].textContent;
            const expiry_date = row.querySelector('.med_expire').textContent;
            console.log(expiry_date);
            const unit = row.querySelector('.med_unit').textContent;
            const quantity = row.querySelector('.med_quantity').textContent;
            const note = row.cells.length > 9 ? row.cells[9].textContent : '';


            document.getElementById('thuoc_id_put').value = medicineId;
            document.getElementById('ngay_nhap_put').value = date_in;
            document.getElementById('ten_thuoc_put').value = name;
            document.getElementById('duong_dung_put').value = usage_;
            document.getElementById('han_su_dung_put').value = expiry_date;
            document.getElementById('cong_dung_put').value = effect;
            document.getElementById('ghi_chu_put').value = note;
            document.getElementById('gia_nhap_put').value = price_buy;
            document.getElementById('gia_ban_put').value = price_sell;
            document.getElementById('don_vi_put').value = unit;
            document.getElementById('so_luong_put').value = quantity;
        });
    }

    // function attachDeleteButton(button) {
    //     button.addEventListener('click', function() {
    //         const medicineId = this.getAttribute('data-id');
    //         if (confirm('Bạn có chắc chắn muốn xóa thuốc này?')) {
    //             fetch(`/medicine/${medicineId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         throw new Error('Xóa thuốc thất bại');
    //                     }
    //                     return response.json();
    //                 })
    //                 .then(data => {
    //                     const row = this.closest('tr');
    //                     row.remove();
    //                     alert(data.message);
    //                 })
    //                 .catch(error => {
    //                     alert(error.message);
    //                 });
    //         }
    //     });
    // }

    async function deleteMed(medicineId) {
        fetch(`/medicine/${medicineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    // throw new Error('Xóa thuốc thất bại');
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: "Xóa thuốc thất bại !",
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                } else {
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Xóa thuốc khỏi cơ sở dữ liệu thành công !",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/medicine';
                        }
                    });
                }
                return response.json();
            }).then(data => {
                const row = this.closest('tr');
                row.remove();
                // alert(data.message);
                Swal.fire({
                    title: 'Có lỗi xảy ra !',
                    text: data.message,
                    icon: "error",
                    confirmButtonText: 'Đóng'
                });
            }).catch(error => {
                // alert(error.message);
                Swal.fire({
                    title: 'Có lỗi xảy ra !',
                    text: data.message,
                    icon: "error",
                    confirmButtonText: 'Đóng'
                });
            });
    }

    function attachDeleteButton(button) {
        button.addEventListener('click', function () {
            const medicineId = this.getAttribute('data-id');
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
                    deleteMed(medicineId);
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

    function attachEditButtons() {
        const editButtons = document.querySelectorAll('.med_edit');
        editButtons.forEach(function (button) {
            attachEditButton(button);
        });
    }

    function attachDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.med_delete');
        deleteButtons.forEach(function (button) {
            attachDeleteButton(button);
        });
    }

    attachEditButtons();
    attachDeleteButtons();

    const addMedicineForm = document.getElementById('nhap-hang-form');
    addMedicineForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = getFormData(addMedicineForm);

        fetch('/medicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: "Thêm thuốc thất bại",
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                } else {
                    const newMedicine = data.medicine;
                    addMedicineToTable(newMedicine);
                    const addModal = bootstrap.Modal.getInstance(document.getElementById('formNhapHangModal'));
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Thêm thuốc mới vào cơ sở dữ liệu thành công !",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            addModal.hide();
                            addMedicineForm.reset();
                            window.location.href = '/medicine';
                        }
                    });
                }
            })
    });

    const updateMedicineForm = document.getElementById('nhap-hang-form-put');
    updateMedicineForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const medicineId = document.getElementById('thuoc_id_put').value;
        const data = getFormData(updateMedicineForm);

        fetch(`/medicine/${medicineId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    Swal.fire({
                        title: 'Có lỗi xảy ra !',
                        text: "Cập nhật thông tin thuốc thất bại",
                        icon: "error",
                        confirmButtonText: 'Đóng'
                    });
                } else {
                    const newMedicine = data.medicine;
                    updateMedicineInTable(newMedicine);
                    const editModal = bootstrap.Modal.getInstance(document.getElementById('formNhapHangModalPut'));
                    Swal.fire({
                        title: 'Thành công !',
                        text: "Cập nhật thông tin thuốc thành công !",
                        icon: "success",
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            editModal.hide();
                            updateMedicineForm.reset();
                            window.location.href = '/medicine';
                        }
                    });
                }
            })
    });
    const inputSearch = document.getElementById('search-input');
    inputSearch.addEventListener('input', function () {
        const searchValue = inputSearch.value.trim().toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const medName = row.querySelector('.med_name').textContent;
            if (medName.toLowerCase().includes(searchValue.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    })


});