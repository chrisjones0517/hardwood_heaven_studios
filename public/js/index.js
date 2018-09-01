$(document).ready(function () {

    let cartItemCount = 0;

    $('#loginSubmit').on('click', () => {
        const username = $('#usernameLog').val().trim();
        const password = $('#passLog').val().trim();
        const user = {
            username,
            password
        };
        let valid = true;
        if (username === '') {
            valid = false;
            validator('#usernameLogErr', 'Username is required!');
        }
        if (password === '') {
            valid = false;
            validator('#passLogErr', 'Password is required!');
        } else if (password.length < 8) {
            valid = false;
            validator('#passLogErr', 'Password must contain at least 8 characters!');
        }
        if (valid) {
            $.post('/users/login', user, (data, status) => {
                if (data.error) {
                    $('#logMsg').text(data.msg).append('<br/><br/>');
                    setTimeout(() => {
                        $('#logMsg').empty();
                    }, 3000);
                } else if (data.admin) {
                    window.location.pathname = '/users/login';
                    setTimeout(() => {
                        $('#loginClose').trigger('click');
                        $('#loginLink').text('Logout');
                    });
                    console.log('data.admin', data.admin);
                } else {
                    setTimeout(() => {
                        $('#loginClose').trigger('click');
                        $('#loginLink').text('Logout');
                    });
                }
            });
        }
    });

    $('#loginLink').on('click', () => {
        const login = $('#loginLink').text();
        if (login === 'Logout') {
            console.log('log this user out');
            $('#loginLink').text('Login');


            // $.post('/users/logout', logout, (data, status) => {

            // });
        } else {
            $('#loginModal').modal('show');
        }
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
                } else {
                    msg.removeClass().addClass('text-success text-center');
                    $('#usernameReg').val('');
                    $('#emailReg').val('');
                    $('#passwordReg').val('');
                    $('#password2Reg').val('');
                    setTimeout(() => {
                        $('#regMsg').empty();
                        $('#regModal').modal('hide');
                    }, 3000);
                }

            });
        }
    });

    $('#addProduct').on('click', () => {
        const prodName = $('#prodName').val().trim();
        const prodDesc = $('#prodDesc').val().trim();
        const prodImg = $('#prodImg').val().trim();
        const prodPrice = $('#prodPrice').val().trim();
        const newProduct = {
            prodName,
            prodDesc,
            prodImg,
            prodPrice
        };

        $.post('/admin/addProduct', newProduct, (data, status) => {
            if (data.error) {
                $('#error-modal').modal('show');
            } else {
                location.reload();
            }
        });
    });

    $('.update-product').on('click', function () {
        const id = $(this).attr('data-attr-1');
        const name = $(this).attr('data-attr-2');
        const desc = $(this).attr('data-attr-3');
        const image = $(this).attr('data-attr-4');
        const price = $(this).attr('data-attr-5');

        $('#update-product-modal').modal('show');

        $('#update-product-msg').text(id);
        $('#update-product-name').val(name);
        $('#update-product-desc').val(desc);
        $('#update-product-image').val(image);
        $('#update-product-price').val(price);
    });

    $('#update-product-submit').on('click', () => {
        const update = {
            _id: $('#update-product-msg').text(),
            name: $('#update-product-name').val(),
            description: $('#update-product-desc').val(),
            image: $('#update-product-image').val(),
            price: $('#update-product-price').val()
        };

        $.post('/admin/update', update, (data, status) => {
            console.log(data);
            if (data.error) {
                $('#update-product-msg').addClass('text-danger').text('There was an error processing your request.');
                setTimeout(() => {
                    $('#update-product-msg').removeClass().empty();
                }, 3000);
            } else {
                console.log('update else ran');
                $('#update-product-msg').addClass('text-success').text('Product was updated!');
                setTimeout(() => {
                    $('#update-product-msg').removeClass().empty();
                    $('#update-product-modal').modal('hide');
                    location.reload();
                }, 3000);
            }
        });
    });

    $('.delete-product').on('click', function () {
        const id = $(this).attr('data-attr');
        $.post('/admin/delete', { id }, (data, status) => {
            if (data.error) {
                $('#error-modal').modal('show');
            } else {
                location.reload();
            }
        });
    });

    $('.add-to-cart').on('click', function () {
        const name = $(this).siblings('.store-product-name').text();
        const price = $(this).siblings('p').last().children().text();
        const status = $('#cart-modal-body').attr('data-attr');
        cartItemCount++;
        $('#cartModal').modal('show');
        if (status === 'empty') {
            $('.fa-shopping-cart').addClass('shopping-cart-occupied');
            $('#cart-modal-body').empty().append(`
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody id="cart-table-body">
                    <tr>
                        <td>${name}</td>
                        <td>$${price}</td>
                        <td><input type="number" value="1" min="1" class="cart-qty">
                        <td><a class="remove-cart-item">&#x274C;</a></td>
                    </tr>
                </tbody>
            </table>
        `).attr('data-attr', '');
        } else {
            $('#cart-table-body').append(`
                <tr>
                    <td>${name}</td>
                    <td>$${price}</td>
                    <td><input type="number" value="1" min="1" class="cart-qty"></td>
                    <td><a class="remove-cart-item">&#x274C;</a></td>
                </tr>
            `);
        }
    });

    $(document).on('click', '.remove-cart-item', function() {
        cartItemCount--;
        $(this).parent().parent().remove();
        if (!cartItemCount) {
            $('#cart-modal-body').empty().append('<p>Your cart is empty.</p>');
            $('.fa-shopping-cart').removeClass('shopping-cart-occupied');
            $('#cart-modal-body').attr('data-attr', 'empty');
        }
    });

    $('#cartSubmit').on('click', () => {
        $('#cartModal').modal('hide');
        $('#payment-modal').modal('show');
    });

    $('.card-img-top').on('click', function() {
        const imgSrc = $(this).attr('src');
        $('#image-modal-body').empty().append(`
            <img class="image-zoom" src="${imgSrc}" width="795">
        `);
        $('#image-zoom-modal').modal('show');
        
    });

});

function registerValidator(username, email, password, password2) {
    let flag = true;
    let emailPatt = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/g);
    let emailResult = emailPatt.test(email);
    let passwordPatt = new RegExp(/.{8,}/g);
    let passwordResult = passwordPatt.test(password);
    let passwordPatt2 = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/);
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

