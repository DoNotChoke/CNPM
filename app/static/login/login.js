document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.querySelector('.form__control');
    const usernameInput = document.querySelector('.form__username');
    const passwordInput = document.querySelector('.form__password');

    loginForm.addEventListener('submit', async function(e){
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if(!username || !password){
            // alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
            // return;

            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu",
                icon: "error",
                confirmButtonText: 'Thử lại'
            }).then((result) => {
                if (result.isConfirmed) {
                    return;
                }
            });
        }
        const loginData = {username, password};
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();
            if(result.success){
                window.location.replace('/homepage');
            }
            else{
                // alert('Tên tài khoản hoặc mật khẩu không đúng');
                Swal.fire({
                    title: 'Có lỗi xảy ra !',
                    text: "Tên tài khoản hoặc mật khẩu không đúng",
                    icon: "error",
                    confirmButtonText: 'Thử lại'
                });
            }
        } catch(error){
            console.error("Đã xảy ra lỗi khi đăng nhập:", error);
            // alert("Có lỗi xảy ra, vui lòng thử lại sau.");
            Swal.fire({
                title: 'Có lỗi xảy ra !',
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                icon: "error",
                confirmButtonText: 'Thử lại'
            });
        }
    });
});