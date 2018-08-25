$(document).ready(function () {
    $('#loginSubmit').on('click', () => {
        $.get('/users/login', () => {
            console.log('login route ran');
        });
    });

    $('#regSubmit').on('click', () => {
        const username = $('#usernameReg').val().trim();
        const email = $('#emailReg').val().trim();
        const password = $('#passwordReg').val().trim();
        const password2 = $('#password2Reg').val().trim();
        const newUser = {
            username,
            email,
            password,
            password2
        };

        const validate = registerValidator(username, email, password, password2);
        
        if (validate) {
            $.post('/users/register', newUser, (data, status) => {
                // console.log("Data: ", data, "\nStatus: ", status);
                // console.log(data.msg);
                const msg = $('#regMsg').text(data.msg).append('<br/><br/>');
                if (data.error) {
                    msg.removeClass().addClass('text-danger text-center');
                    setTimeout(() => {
                        $('#regMsg').empty();
                    }, 3000);
                }
                else {
                    msg.removeClass().addClass('text-success text-center');
                    $('#usernameReg').val('');
                    $('#emailReg').val('');
                    $('#passwordReg').val('');
                    $('#password2Reg').val('');
                    setTimeout(() => {
                        $('#regMsg').empty();
                    }, 3000);
                }

            });
        } 
    });
});

function registerValidator(username, email, password, password2) {
    let flag = true;
    if (username === '') {
        emptyValidator('#usernameRegErr', 'Username');
        flag = false;
    }
    if (email === '') {
        emptyValidator('#emailRegErr', 'Email');
        flag = false;
    }
    if (password === '') {
        emptyValidator('#passwordRegErr', 'Password');
        flag = false;
    }
    if (password2 === '') {
        emptyValidator('#password2RegErr', 'Re-enter Password');
        flag = false;
    }
     return flag;
}

function emptyValidator(id, field) {
    $(id).text(` ${field} is required!`).removeClass().addClass('text-danger text-center');
            setTimeout(() => {
                $(id).empty();
            }, 3000);
}
// let patt = new RegExp(/\w+/i);
//         let result = patt.test(username);
//         console.log(result);


        // $('#regMsg').text('Passwords do not match!').removeClass().addClass('text-danger text-center').append('<br/><br/>');
        // setTimeout(() => {
        //     $('#regMsg').empty();
        // }, 3000);
    