document.addEventListener('DOMContentLoaded', function() {
    let pincodeData = [];

    // Load the CSV file from Shopify
    fetch('https://cdn.shopify.com/s/files/1/0256/0301/4740/files/pincode_1.csv?v=1730699377')
        .then(response => response.text())
        .then(csvText => {
            // Split each line and trim whitespace to store pincodes in an array
            pincodeData = csvText.split('\n').map(row => row.trim());
        })
        .catch(error => console.error('Error loading pincodes:', error));

    // Get references to the input and result elements
    const pincodeInput = document.getElementById('pincode-input');
    const resultElem = document.getElementById('pincode-result');

    // Restrict input to numbers only and clear message if input is empty
    pincodeInput.addEventListener('input', function() {
        // Remove any non-numeric characters from the input field
        pincodeInput.value = pincodeInput.value.replace(/\D/g, '');

        // Clear the result message when the input is empty
        if (pincodeInput.value === '') {
            resultElem.textContent = '';
        }
    });

    // Pincode checker function, triggered on button click
    document.getElementById('check-pincode').addEventListener('click', function() {
        const inputPincode = pincodeInput.value.trim();

        // Check if the pincode is empty or not numeric
        if (inputPincode === "") {
            resultElem.textContent = "Please enter a valid pincode.";
            resultElem.style.color = "red";
            return;
        }

        // Validate if the input is exactly 6 digits
        if (inputPincode.length !== 6) {
            resultElem.textContent = "Pincode must be exactly 6 digits.";
            resultElem.style.color = "red";
            return;
        }

        // Check if the input pincode exists in the loaded data
        if (pincodeData.includes(inputPincode)) {
            resultElem.textContent = "Pincode is serviceable!";
            resultElem.style.color = "green";
        } else {
            resultElem.textContent = "Pincode not serviceable!";
            resultElem.style.color = "red";
        }
    });
});
