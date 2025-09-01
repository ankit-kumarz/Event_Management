document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Store user credentials
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to booking page
    window.location.href = 'booking.html';
});