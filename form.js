document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.contactform');
    const button = document.querySelector('.submitbtn');

    const name = document.getElementById("fullname");
    const email = document.querySelector('input[type="email"]');
    const subject = document.querySelector('select');
    const message = document.querySelector('textarea');
    const phone = document.querySelector('input[placeholder*="9XX XXX XXXX"]');

    //MINIMUM 5 CHARS
    //LETTERS ONLY
    name.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });

    name.oninvalid = () => {
        const trimmedName = name.value.trim();
        if (trimmedName.length === 0) {
            name.setCustomValidity("Please fill this field.");
        } else if (trimmedName.length < 5) {
            name.setCustomValidity("Name must be at least 5 characters.");
        } else {
            name.setCustomValidity("Name must contain letters only.");
        }
    };

    // =============================
    // PHONE: +63 format
    // =============================
    phone.addEventListener("input", function () {
        let numbers = this.value.replace(/[^\d+]/g, "");

        if (numbers.length > 0 && !numbers.startsWith("+63")) {
            numbers = "+63" + numbers.replace(/^\+?63/, "");
        }

        numbers = numbers.slice(0, 13);
        this.value = numbers;
        phone.setCustomValidity("");
    });

    // =============================
    // CUSTOM VALIDATION MESSAGES
    // =============================
    subject.oninvalid = () =>
        subject.setCustomValidity("Please complete this field");

    message.oninvalid = () =>
        message.setCustomValidity("Please complete this field");

    email.oninvalid = () => {
        if (email.value === "") {
            email.setCustomValidity("Please complete this field");
        } else {
            email.setCustomValidity("Please include a valid email address.");
        }
    };

    // =============================
    // RESET VALIDATION ON INPUT
    // =============================
    [name, email, subject, message, phone].forEach(input => {
        input.oninput = () => input.setCustomValidity("");
    });

    // =============================
    // FORM SUBMIT - MIN 5 CHARS CHECK
    // =============================
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // HTML validation check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // NAME STRICT CHECK (MINIMUM 5 CHARS + letters only)
        const trimmedName = name.value.trim();
        if (trimmedName.length < 5) {
            name.setCustomValidity("Full name must be at least 5 characters (e.g. 'John Doe').");
            name.reportValidity();
            return;
        }

        const nameRegex = /^[a-zA-Z\sáéíóúñÁÉÍÓÚÑ\-']+$/;
        if (!nameRegex.test(trimmedName)) {
            name.setCustomValidity("Name must contain letters only.");
            name.reportValidity();
            return;
        }

        // EMAIL STRICT CHECK
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.setCustomValidity("Please include a valid email address.");
            email.reportValidity();
            return;
        }

        // PHONE STRICT CHECK
        if (phone.value.length !== 13 || !phone.value.startsWith('+63')) {
            phone.setCustomValidity("Phone must be +639XXXXXXXXX format");
            phone.reportValidity();
            return;
        }

        form.reset();

        //add modal popup here
    });

});
