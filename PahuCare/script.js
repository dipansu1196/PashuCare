// Configuration and state management
let currentMode = 'auto';
let currentLocation = null;


// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLocationHandling();
    setupEventListeners();
});

function initializeLocationHandling() {
    const locationInput = document.getElementById('location-input');
    preventFormSubmission();
    setupLocationSearch();
}

// Event Listeners Setup
function setupEventListeners() {
    const specializationSelect = document.getElementById('specialization-select');
    const searchButton = document.querySelector('.search-button');

    if (specializationSelect) {
        specializationSelect.addEventListener('change', findNearbyVets);
    }

    if (searchButton) {
        searchButton.addEventListener('click', findNearbyVets);
    }
}

// Form submission prevention
function preventFormSubmission() {
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
        locationInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                findNearbyVets();
                return false;
            }
        });
    }
}

// Location search setup
function setupLocationSearch() {
    const locationInput = document.getElementById('location-input');
    
    if (locationInput) {
        locationInput.addEventListener('input', debounce(async (e) => {
            if (e.target.value.length < 3) return;
            
            try {
                const suggestions = await searchLocations(e.target.value);
                updateSearchSuggestions(suggestions);
            } catch (error) {
                console.error('Error getting search suggestions:', error);
            }
        }, 300));
    }
}

// Search for nearby veterinarians
async function findNearbyVets() {
    const locationInput = document.getElementById('location-input');
    const specializationSelect = document.getElementById('specialization-select');
    const resultsSection = document.getElementById('results');
    
    if (!locationInput.value) {
        alert('कृपया स्थान दर्ज करें।');
        return;
    }

    try {
        // Show loading state
        showLoadingState(true);

        // Get filters
        const location = locationInput.value;
        const specialization = specializationSelect.value;

        // Here you would typically make an API call to get actual results
        // For now, we're simulating with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Display results
        resultsSection.style.display = 'block';
        displayResults(location, specialization);
    } catch (error) {
        console.error('Error finding vets:', error);
        alert('डॉक्टर्स की जानकारी प्राप्त करने में त्रुटि हुई।');
    } finally {
        showLoadingState(false);
    }
}

// Display search results
function displayResults(location, specialization) {
    const resultsGrid = document.querySelector('.doctors-grid');
    
    // Sample data - replace with actual API data
    const doctors = [
        {
            name: 'डॉ. राजेश शर्मा',
            specialization: 'सामान्य पशु चिकित्सक',
            experience: '15 वर्ष',
            location: 'दिल्ली',
            distance: '2.5 km',
            image: 'doctor1.jpg'
        }
        // Add more sample doctors as needed
    ];

    // Filter doctors based on specialization if selected
    const filteredDoctors = specialization ? 
        doctors.filter(doc => doc.specialization === specialization) : 
        doctors;

    if (filteredDoctors.length === 0) {
        resultsGrid.innerHTML = `
            <div class="no-results">
                <p>इस स्थान पर कोई डॉक्टर नहीं मिला। कृपया दूसरा स्थान चुनें।</p>
            </div>`;
        return;
    }

    // Generate HTML for doctor cards
    resultsGrid.innerHTML = filteredDoctors.map(doctor => `
        <div class="doctor-card">
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p class="specialization">${doctor.specialization}</p>
                <p class="experience">अनुभव: ${doctor.experience}</p>
                <p class="location">लोकेशन: ${doctor.location}</p>
                <p class="distance">दूरी: ${doctor.distance}</p>
                <div class="contact-buttons">
                    <button class="appointment-btn" onclick="bookAppointment('${doctor.name}')">
                        अपॉइंटमेंट बुक करें
                    </button>
                    <button class="call-btn" onclick="callDoctor('${doctor.name}')">
                        कॉल करें
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// UI Helper Functions
function showLoadingState(show) {
    const loadingSpinner = document.getElementById('location-loading');
    if (loadingSpinner) {
        loadingSpinner.style.display = show ? 'block' : 'none';
    }
}

function updateSearchSuggestions(suggestions) {
    const suggestionsList = document.getElementById('location-suggestions') || 
                          createSuggestionsList();
    
    suggestionsList.innerHTML = '';
    
    if (suggestions && suggestions.length) {
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.name;
            li.addEventListener('click', () => {
                document.getElementById('location-input').value = suggestion.name;
                suggestionsList.style.display = 'none';
                findNearbyVets();
            });
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}

function createSuggestionsList() {
    const suggestionsList = document.createElement('ul');
    suggestionsList.id = 'location-suggestions';
    suggestionsList.className = 'location-suggestions';
    document.querySelector('.location-wrapper').appendChild(suggestionsList);
    return suggestionsList;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Action Functions
function bookAppointment(doctorName) {
    alert(`${doctorName} के साथ अपॉइंटमेंट बुक करने की प्रक्रिया शुरू की जा रही है।`);
    // Implement actual booking logic here
}

function callDoctor(doctorName) {
    alert(`${doctorName} को कॉल किया जा रहा है।`);
    // Implement actual calling logic here
}

// Export functions for use in other modules if needed
export {
    findNearbyVets,
    bookAppointment,
    callDoctor
};
