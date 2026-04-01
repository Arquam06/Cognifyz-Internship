document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const successMsg = document.getElementById('success-msg');

    // Show input error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'input-group error';
        const errorMsg = formControl.querySelector('.error-msg');
        errorMsg.innerText = message;
    }

    // Show success outline
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'input-group success';
        const errorMsg = formControl.querySelector('.error-msg');
        errorMsg.innerText = '';
    }

    // Check email is valid
    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        } else {
            showError(input, 'Email is not valid');
            return false;
        }
    }

    // Check required fields
    function checkRequired(inputArray) {
        let isRequiredValid = true;
        inputArray.forEach(function(input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                isRequiredValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isRequiredValid;
    }

    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
            return false;
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    // Get fieldname
    function getFieldName(input) {
        let name = input.id;
        if (name === 'username') return 'Full Name';
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    // Event listeners
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isReqValid = checkRequired([username, email, password]);
        let isLenValid = true;
        let isEmailValid = true;

        if(username.value.trim() !== '') {
            isLenValid = checkLength(username, 3, 30) && isLenValid;
        }
        
        if(password.value.trim() !== '') {
            isLenValid = checkLength(password, 8, 25) && isLenValid;
        }

        if(email.value.trim() !== '') {
            isEmailValid = checkEmail(email);
        }

        // If all valid, show success message
        if (isReqValid && isLenValid && isEmailValid) {
            successMsg.classList.remove('hidden');
            form.reset(); // clear the inputs
            
            // clear success classes
            [username, email, password].forEach(input => {
                input.parentElement.className = 'input-group';
            });

            // Hide success message automatically after 5 secs
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        } else {
            successMsg.classList.add('hidden');
        }
    });
});
