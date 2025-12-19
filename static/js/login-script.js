function initTheme() {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const iconPath = document.getElementById('sun-icon');
    if (isDark) {
        iconPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
    } else {
        iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
    }
}

function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab');
    const title = document.getElementById('auth-title');

    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
        title.textContent = "Welcome Back";
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        tabs[1].classList.add('active');
        title.textContent = "Join BlitzLearn";
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

async function handleLogin(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    setTimeout(() => {
        submitBtn.textContent = 'Success!';
        submitBtn.style.background = 'var(--success)';
        setTimeout(() => {
            alert("Login Successful!");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
            submitBtn.style.background = '';
        }, 500);
    }, 1500);
}

async function handleSignup(e) {
    e.preventDefault();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm-password').value;
    const errorMsg = document.getElementById('signup-confirm-error');

    if (password !== confirm) {
        errorMsg.classList.add('show');
        return;
    }
    errorMsg.classList.remove('show');

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';

    setTimeout(() => {
        submitBtn.textContent = 'Account Created!';
        submitBtn.style.background = 'var(--success)';
        setTimeout(() => {
            alert("Sign up complete!");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
            submitBtn.style.background = '';
            switchTab('login');
        }, 800);
    }, 1500);
}

function handleSocialLogin(provider) {
    alert(`Redirecting to ${provider} authentication...`);
}

function handleForgotPassword(e) {
    e.preventDefault();
    const email = prompt("Enter your email:");
    if (email) alert(`Reset link sent to ${email}`);
}

initTheme();