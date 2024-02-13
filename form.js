function hideErrorMessages() {
    var errorMessages = document.querySelectorAll('.form-error');
    errorMessages.forEach(function (errorMessage) {
      errorMessage.style.display = 'none';
    });
  }

  hideErrorMessages();

  function validateForm() {
    hideErrorMessages();

    var name = document.getElementById("Name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var country = document.querySelector('select[name="Country"]').value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var genderError = document.getElementById("genderError");
    var countryError = document.getElementById("countryError");

    if (name === "") {
      nameError.style.display = "block";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      nameError.textContent = "Name should only contain letters and spaces";
      nameError.style.display = "block";
    }

    if (email === "") {
      emailError.style.display = "block";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError.textContent = "Invalid email format";
      emailError.style.display = "block";
    }

    if (phone === "") {
      phoneError.style.display = "block";
    } else if (!/^(012|011|015|010)\d{8}$/.test(phone)) {
      phoneError.textContent = "Invalid phone number format";
      phoneError.style.display = "block";
    }

    if (password === "") {
      passwordError.style.display = "block";
    }

    if (confirmPassword === "") {
      confirmPasswordError.style.display = "block";
    } else if (confirmPassword !== password) {
      confirmPasswordError.style.display = "block";
    }

    if (gender === null) {
      genderError.style.display = "block";
    }

    if (country === "") {
      countryError.style.display = "block";
    }

    var isValid = (
      name !== "" && /^[a-zA-Z ]+$/.test(name) &&
      email !== "" && /\S+@\S+\.\S+/.test(email) &&
      phone !== "" && /^(012|011|015|010)\d{9}$/.test(phone) &&
      password !== "" &&
      confirmPassword !== "" && confirmPassword === password &&
      gender !== null &&
      country !== ""
    );

    if (isValid) {
      alert("Submit successful");
      resetForm();
    }
  }

  function resetForm() {
    document.getElementById("Name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.querySelector('input[name="gender"]').checked = false;
    document.querySelector('select[name="Country"]').value = "Please select your country";
    hideErrorMessages();
  }