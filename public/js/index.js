$('#loginSubmit').on('click', () => {
    $.get('/users/login', () => {
        console.log('login route ran');
    });
});