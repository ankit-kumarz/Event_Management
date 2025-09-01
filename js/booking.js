// Check if user is logged in
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = localStorage.getItem('username');
    const eventData = {
        id: Date.now(), // Use timestamp as unique ID
        username: username, // Add username to event data
        eventName: document.getElementById('eventName').value,
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value,
        venue: document.getElementById('venue').value,
        eventType: document.getElementById('eventType').value
    };

    // Get existing bookings or initialize empty array
    let bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
    
    // Add new booking
    bookings.push(eventData);
    
    // Save to localStorage
    localStorage.setItem('eventBookings', JSON.stringify(bookings));
    
    // Redirect to bookings page
    window.location.href = 'bookings.html';
});

document.getElementById('viewBookings').addEventListener('click', function() {
    window.location.href = 'bookings.html';
});