// Function to check if a value exists in cookies
function checkCookieValue(phoneNumber) {
    if (phoneNumber===173527250){
        return true;
    }
    return false;

}

// Function to handle the button click
function checkValue() {
    const phoneNumber = document.getElementById('phoneNumber');
    const value = parseInt(phoneNumber.value);

    if (value) {
        if (checkCookieValue(value)) {
            alert('Value exists in the database. Proceeding to the next page.');
            window.location.href = 'showdata.html';
            localStorage.setItem("phoneNumber", value);
        } else {
            alert('Value does not exist in the database.');
            window.location.href = 'registration.html';
            localStorage.setItem("phoneNumber", value);
        }
    } else {
        alert('Please enter a valid phone number.');
    }
}

function saveData() {
    const phoneNumber = localStorage.getItem("phoneNumber");
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const bday = document.getElementById('bday').value

    document.cookie = "phoneNumber=" + phoneNumber;
    document.cookie = "name=" + name;
    document.cookie = "email=" + email;
    document.cookie = "bday=" + bday;

    const registrationData = {
        phoneNumber: phoneNumber,
        name: name,
        email: email,
        bday: bday,
    };

    const jsonData = JSON.stringify(registrationData);

    // Store the JSON data in local storage
    localStorage.setItem('registrationData', jsonData);
    window.location.href = 'showdata.html';
}

function checkValues(){
    const nameInput = document.getElementById('name');
    const bdayInput = document.getElementById('bday');
    const emailInput = document.getElementById('email');
    const bypassEmailCheckbox = document.getElementById('bypassEmail');

    const name = nameInput.value.trim();
    const bday = bdayInput.value;
    const email = emailInput.value.trim();
    const bypassEmail = bypassEmailCheckbox.checked;
    // ADD SEPARATE CHECKS LATER

    let valid = true;

    // Check name input
    if (name === '') {
        validationMessage.textContent = 'Please insert a name.';
        valid = false;
    } else {
        // Clear the validation message
        validationMessage.textContent = '';  
    }

    // Check birthday input
    if (bday === '') {
        validationMessage1.textContent = 'Please insert your birthday.';
        valid = false;
    } else {
        validationMessage1.textContent = '';
    }

    if (!bypassEmail && email === '') {
        validationMessage2.textContent = 'Please insert a valid email address.';
        valid = false;
    } else {
        validationMessage2.textContent = ''; 
    }

    if(valid===true){
        alert('Registration success!')
        saveData();
        
    }

    return valid; 

}

function getCookieValue3(phoneNumber) {
    const cookies = document.cookie.split(';');

    let userData = {};

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split('=');
        if (cookie.length === 2) {
            const cookieName = cookie[0].trim();
            const cookieValue = decodeURIComponent(cookie[1].trim());

            if (cookieName === 'phoneNumber' && cookieValue === phoneNumber) {
                // Found a matching phone number, retrieve associated data
                userData.phoneNumber = phoneNumber;
                userData.name = getCookieValue2('name');
                userData.bday = getCookieValue2('bday');
                userData.email = getCookieValue2('email');
                break; // Stop searching once the matching phone number is found
            }
        }
    }

    return userData;
}

function getCookieValue2(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split('=');
        if (cookie.length === 2 && cookie[0] === cookieName) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return '';
}



