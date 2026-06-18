// ===================================
// AUTENTICACIÓN Y GESTIÓN DE SESIÓN
// ===================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.loadUserFromStorage();
    }

    loadUserFromStorage() {
        const user = localStorage.getItem('fpqrs_user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    }

    saveUserToStorage(user) {
        localStorage.setItem('fpqrs_user', JSON.stringify(user));
        this.currentUser = user;
    }

    login(email, password) {
        // Simulated login with mock data
        const mockUsers = [
            {
                id: 1,
                email: 'demo@example.com',
                password: 'demo123',
                name: 'Juan Pérez',
                document: '123456789',
                phone: '+57 301 234 5678',
                address: 'Cra 7 #12-34, Bogotá'
            },
            {
                id: 2,
                email: 'test@example.com',
                password: 'test123',
                name: 'María García',
                document: '987654321',
                phone: '+57 302 345 6789',
                address: 'Calle 5 #23-45, Medellín'
            }
        ];

        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.saveUserToStorage(user);
            return { success: true, user };
        }
        
        return { success: false, message: 'Correo o contraseña incorrectos' };
    }

    register(name, email, password) {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('fpqrs_users') || '[]');
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'El correo ya está registrado' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            document: '',
            phone: '',
            address: ''
        };

        users.push(newUser);
        localStorage.setItem('fpqrs_users', JSON.stringify(users));
        this.saveUserToStorage(newUser);

        return { success: true, user: newUser };
    }

    logout() {
        localStorage.removeItem('fpqrs_user');
        this.currentUser = null;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();

// ===================================
// FORM VALIDATION AND HANDLERS
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-switch button').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    document.querySelector(`.tab-switch button[data-tab="${tabName}"]`).classList.add('active');
}

// ===================================
// LOGIN FORM HANDLER
// ===================================

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Clear error messages
    document.querySelectorAll('#loginForm .error-message').forEach(el => {
        el.parentElement.querySelector('input')?.classList.remove('error');
    });

    // Validate
    let hasErrors = false;

    if (!validateEmail(email)) {
        document.getElementById('loginEmail').classList.add('error');
        hasErrors = true;
    }

    if (!password) {
        document.getElementById('loginPassword').classList.add('error');
        hasErrors = true;
    }

    if (hasErrors) return;

    // Attempt login
    const result = authManager.login(email, password);

    if (result.success) {
        showSuccessMessage('Inicio de sesión exitoso');
        setTimeout(() => {
            navigateToPage('inbox');
        }, 500);
    } else {
        showErrorMessage(result.message);
        document.getElementById('loginEmail').classList.add('error');
        document.getElementById('loginPassword').classList.add('error');
    }
});

// ===================================
// REGISTER FORM HANDLER
// ===================================

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    // Clear error messages
    document.querySelectorAll('#registerForm .error-message').forEach(el => {
        el.parentElement.querySelector('input')?.classList.remove('error');
    });

    // Validate
    let hasErrors = false;

    if (!name || name.length < 3) {
        document.getElementById('registerName').classList.add('error');
        hasErrors = true;
    }

    if (!validateEmail(email)) {
        document.getElementById('registerEmail').classList.add('error');
        hasErrors = true;
    }

    if (!validatePassword(password)) {
        document.getElementById('registerPassword').classList.add('error');
        hasErrors = true;
    }

    if (password !== confirm) {
        document.getElementById('registerConfirm').classList.add('error');
        hasErrors = true;
    }

    if (hasErrors) return;

    // Attempt registration
    const result = authManager.register(name, email, password);

    if (result.success) {
        showSuccessMessage('Registro exitoso. Redirigiendo...');
        setTimeout(() => {
            navigateToPage('inbox');
        }, 500);
    } else {
        showErrorMessage(result.message);
    }
});

// ===================================
// UI HELPERS
// ===================================

function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    alert.style.zIndex = '10000';
    alert.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3';
    alert.style.zIndex = '10000';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// ===================================
// TAB SWITCHING
// ===================================

document.querySelectorAll('.tab-switch button').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// ===================================
// LOGOUT
// ===================================

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        authManager.logout();
        navigateToPage('auth');
    }
});
