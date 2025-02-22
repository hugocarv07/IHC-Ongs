function validateForm(event) {
    event.preventDefault();
    
    // Remove previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());

    let isValid = true;
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Validate passwords match
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        showError(confirmPassword, 'As senhas não coincidem');
        isValid = false;
    }

    // Validate CPF format
    const cpf = document.getElementById('cpf');
    if (cpf && !validateCPF(cpf.value)) {
        showError(cpf, 'CPF inválido');
        isValid = false;
    }

    // Validate phone format
    const phone = document.getElementById('phone');
    if (phone && !validatePhone(phone.value)) {
        showError(phone, 'Telefone inválido');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically submit the form to a server
        alert('Cadastro realizado com sucesso!');
        document.getElementById('userForm').reset();
    }

    return false;
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function validateCPF(cpf) {
    // Simple CPF format validation
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    return cpfRegex.test(cpf);
}

function validatePhone(phone) {
    // Simple phone format validation
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/;
    return phoneRegex.test(phone);
}

function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

function closeTerms() {
    document.getElementById('termsModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('termsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Format inputs as user types
document.addEventListener('DOMContentLoaded', function() {
    const cpf = document.getElementById('cpf');
    if (cpf) {
        cpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = value;
            }
        });
    }

    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            }
        });
    }

    // Donation form specific functionality
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        // Handle amount option selection
        const amountOptions = document.querySelectorAll('.amount-option');
        const amountInput = document.getElementById('amount');

        amountOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                amountOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                this.classList.add('selected');
                // Update input value
                amountInput.value = this.dataset.value;
            });
        });

        // Handle payment method selection
        const paymentMethods = document.querySelectorAll('input[name="payment"]');
        const creditCardFields = document.getElementById('creditCardFields');

        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                if (this.value === 'credit-card') {
                    creditCardFields.style.display = 'block';
                } else {
                    creditCardFields.style.display = 'none';
                }
            });
        });

        // Handle form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate payment processing
            const loadingButton = document.querySelector('button[type="submit"]');
            loadingButton.textContent = 'Processando...';
            loadingButton.disabled = true;

            setTimeout(() => {
                // Simulate successful payment (80% chance)
                if (Math.random() < 0.8) {
                    showConfirmation();
                } else {
                    showError();
                }
                loadingButton.textContent = 'Realizar Pagamento';
                loadingButton.disabled = false;
            }, 2000);
        });
    }
});

function showConfirmation() {
    const modal = document.getElementById('confirmationModal');
    const selectedOng = document.querySelector('input[name="ong"]:checked');
    const amount = document.getElementById('amount').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    // Update confirmation details
    document.getElementById('confirmOng').textContent = 
        selectedOng ? selectedOng.parentElement.querySelector('h3').textContent : 'N/A';
    document.getElementById('confirmAmount').textContent = amount;
    document.getElementById('confirmDate').textContent = new Date().toLocaleDateString();
    document.getElementById('confirmPayment').textContent = 
        paymentMethod ? paymentMethod.parentElement.querySelector('label').textContent.trim() : 'N/A';
    document.getElementById('confirmTransaction').textContent = 
        Math.random().toString(36).substring(2, 15).toUpperCase();

    modal.style.display = 'block';
}

function showError() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'block';
}

function closeErrorModal() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'none';
}