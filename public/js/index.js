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
    let emailPatt = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/g);
    let emailResult = emailPatt.test(email);
    let passwordPatt = new RegExp(/.{8,}/g);
    let passwordResult = passwordPatt.test(password);
    let passwordPatt2 = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/);
    // let passwordPatt2 = new RegExp(/\d+[!]+[A-Z]/g);
    let passwordResult2 = passwordPatt2.test(password);

    if (username === '') {
        validator('#usernameRegErr', 'Username is required!');
        flag = false;
    } 
    if (email === '') {
        validator('#emailRegErr', 'Email is required!');
        flag = false;
    } else if (!emailResult) {
        validator('#emailRegErr', 'Email must be valid!');
        flag = false;
    }
    if (password === '') {
        validator('#passwordRegErr', 'Password is required!');
        flag = false;
    } else if (!passwordResult) {
        validator('#passwordRegErr', 'Password must contain at least 8 characters!');
        flag = false;
    } else if (!passwordResult2) {
        validator('#passwordRegErr', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!');
        flag = false;
    }  
    if (password !== password2) {
        validator('#password2RegErr', 'Passwords must match!');
        flag = false;
    }
    if (password2 === '') {
        validator('#password2RegErr', 'Re-enter Password is required!');
        flag = false;
    }
        
     return flag;
}

function validator(id, field) {
    $(id).text(field);
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
    