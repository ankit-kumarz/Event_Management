// Check if user is logged in
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

let currentEditId = null;
const modal = document.getElementById('editModal');
const closeBtn = document.getElementsByClassName('close')[0];

// Close modal when clicking the X button
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Function to delete booking
function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        let bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
        bookings = bookings.filter(booking => booking.id !== id);
        localStorage.setItem('eventBookings', JSON.stringify(bookings));
        displayBookings();
    }
}

// Function to open edit modal
function editBooking(id) {
    const bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
    const booking = bookings.find(b => b.id === id);
    
    if (booking) {
        currentEditId = id;
        document.getElementById('editEventName').value = booking.eventName;
        document.getElementById('editEventDate').value = booking.eventDate;
        document.getElementById('editEventTime').value = booking.eventTime;
        document.getElementById('editVenue').value = booking.venue;
        document.getElementById('editEventType').value = booking.eventType;
        
        modal.style.display = 'block';
    }
}

// Handle edit form submission
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
    const index = bookings.findIndex(b => b.id === currentEditId);
    
    if (index !== -1) {
        const username = bookings[index].username; // Preserve the original username
        bookings[index] = {
            id: currentEditId,
            username: username,
            eventName: document.getElementById('editEventName').value,
            eventDate: document.getElementById('editEventDate').value,
            eventTime: document.getElementById('editEventTime').value,
            venue: document.getElementById('editVenue').value,
            eventType: document.getElementById('editEventType').value
        };
        
        localStorage.setItem('eventBookings', JSON.stringify(bookings));
        modal.style.display = 'none';
        displayBookings();
    }
});

// Function to display all bookings
function displayBookings() {
    const bookingsList = document.getElementById('bookingsList');
    const bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];

    bookingsList.innerHTML = '';

    bookings.forEach(booking => {
        const bookingCard = document.createElement('div');
        bookingCard.className = 'booking-card';
        
        bookingCard.innerHTML = `
            <div class="booking-user">👤 Booked by: ${booking.username}</div>
            <h3>${booking.eventName}</h3>
            <div class="booking-info">📅 Date: ${booking.eventDate}</div>
            <div class="booking-info">⏰ Time: ${booking.eventTime}</div>
            <div class="booking-info">📍 Venue: ${booking.venue}</div>
            <div class="event-type-tag">${booking.eventType}</div>
            <div class="action-buttons">
                <button onclick="editBooking(${booking.id})" class="edit-btn">Edit</button>
                <button onclick="deleteBooking(${booking.id})" class="delete-btn">Delete</button>
            </div>
        `;

        bookingsList.appendChild(bookingCard);
    });
}

// Display bookings when page loads
displayBookings();

// Event Listeners
document.getElementById('newBooking').addEventListener('click', function() {
    window.location.href = 'booking.html';
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
});