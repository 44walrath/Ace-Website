const passwordField = document.getElementById('password');
const showButton = document.getElementById('show');
const icon = showButton.querySelector('i');

showButton.addEventListener('click', () => {
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show password
        icon.classList.remove('fa-eye'); // Remove open eye icon
        icon.classList.add('fa-eye-slash'); // Add closed eye icon
    } else {
        passwordField.type = 'password'; // Hide password
        icon.classList.remove('fa-eye-slash'); // Remove closed eye icon
        icon.classList.add('fa-eye'); // Add open eye icon
    }
});
