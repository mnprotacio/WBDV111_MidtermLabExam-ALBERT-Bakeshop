document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.contactform');
    const button = document.querySelector('.submitbtn');

    const name = document.getElementById("fullname");
    const email = document.querySelector('input[type="email"]');
    const subject = document.querySelector('select');
    const message = document.querySelector('textarea');
    const phone = document.querySelector('input[placeholder*="9XX XXX XXXX"]');

    // =============================
    // NAME INPUT - LETTERS ONLY + MIN 5 CHARS CHECK
    // =============================
    name.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });

    name.oninvalid = () => {
        const trimmedName = name.value.trim();
        if (trimmedName.length === 0) {
            name.setCustomValidity("Please fill this field.");
        } else if (trimmedName.length < 5) {
            name.setCustomValidity("Name must be at least 5 characters.");
        } else if (trimmedName.length > 50) {
            name.setCustomValidity("Name must be at most 50 characters.");
        } else {
            name.setCustomValidity("Name must contain letters only.");
        }
    };

    // =============================
    // 09 PHONE FORMAT CHECK
    // =============================
    phone.addEventListener("input", function () {
        let numbers = this.value.replace(/[^0-9]/g, "");

        if (numbers.length > 0 && !numbers.startsWith("09")) {
            numbers = "09" + numbers.replace(/^0+/, "");
        }

        numbers = numbers.slice(0, 11);

        let formatted = "";
        if (numbers.length > 0) formatted = numbers.substring(0, 4);
        if (numbers.length >= 5) formatted += "-" + numbers.substring(4, 7);
        if (numbers.length >= 8) formatted += "-" + numbers.substring(7, 11);

        this.value = formatted;
        phone.setCustomValidity("");
    });

    // =============================
    // CUSTOM VALIDATION MESSAGES
    // =============================

    message.oninvalid = () =>
        message.setCustomValidity("Please complete this field");

    email.oninvalid = () => {
        if (email.value === "") {
            email.setCustomValidity("Please complete this field");
        } else {
            email.setCustomValidity("Please include a valid email address.");
        }
    };

    // DATE PICKER - show/hide based on select
    const datePickerGroup = document.getElementById('datePickerGroup');
    const preferredDate = document.getElementById('preferredDate');

    // set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    preferredDate.setAttribute('min', today);

    subject.addEventListener('change', () => {
        const val = subject.value;
        if (val === 'Customized Cakes' || val === 'Reservations') {
            datePickerGroup.style.display = 'flex';
            preferredDate.required = true;
        } else {
            datePickerGroup.style.display = 'none';
            preferredDate.required = false;
            preferredDate.value = '';
        }
    });

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
            name.setCustomValidity("Full name must be at least 5 characters (e.g. 'Mart Khervin Protacio').");
            name.reportValidity();
            return;
        }
        if (trimmedName.length > 50) {
            name.setCustomValidity("Full name must be at most 50 characters (e.g. 'Lance').");
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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
        if (!emailRegex.test(email.value)) {
            email.setCustomValidity("Please enter a valid Gmail or Yahoo address.");
            email.reportValidity();
            return;
        }

        // DISCUSSION CHECK
        const selectValue = subject.value;
        if (!selectValue || selectValue.trim() === '') {
            subject.setCustomValidity('You must select a subject.');
            subject.reportValidity();
            return;
        }

        form.reset();
        openModal();
    });

    // ============================
    // MODAL
    // ============================
    window.openModal = function () {
        document.getElementById("modalBackdrop").classList.add("open");
    };

    window.closeModal = function () {
        document.getElementById("modalBackdrop").classList.remove("open");
    };

    // close modal on backdrop click
    document.getElementById("modalBackdrop").addEventListener("click", function (e) {
        if (e.target === this) closeModal();
    });

});
