let currentLocation = null;

function getLocation() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorDisplay = document.getElementById('location-error');
    const successDisplay = document.getElementById('location-success');
    const coordinatesDisplay = document.getElementById('coordinates-display');
    const locationInput = document.getElementById('location-input');

    // Reset displays
    if (errorDisplay) errorDisplay.style.display = 'none';
    if (successDisplay) successDisplay.style.display = 'none';
    if (coordinatesDisplay) coordinatesDisplay.style.display = 'none';
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    if (locationInput) locationInput.value = '';

    // Check if geolocation is supported
    if (!navigator.geolocation) {
        showError("आपका ब्राउज़र लोकेशन का समर्थन नहीं करता है");
        return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
        showPosition,
        showError,
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

function showPosition(position) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const successDisplay = document.getElementById('location-success');
    const coordinatesDisplay = document.getElementById('coordinates-display');
    const locationInput = document.getElementById('location-input');
    
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    
    // Store location
    currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Reverse geocode the coordinates
    reverseGeocode(currentLocation)
        .then(address => {
            if (locationInput) {
                locationInput.value = address;
            }
            if (successDisplay) {
                successDisplay.style.display = 'block';
                successDisplay.textContent = "स्थान सफलतापूर्वक प्राप्त किया गया";
            }
        })
        .catch(error => {
            if (locationInput) {
                locationInput.value = `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`;
            }
        });

    // Show coordinates if display element exists
    if (coordinatesDisplay) {
        coordinatesDisplay.style.display = 'block';
        coordinatesDisplay.innerHTML = `
            <p>अक्षांश: ${position.coords.latitude.toFixed(6)}</p>
            <p>देशांतर: ${position.coords.longitude.toFixed(6)}</p>
            <p>सटीकता: ${Math.round(position.coords.accuracy)} मीटर</p>
        `;
    }
}

function showError(error) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorDisplay = document.getElementById('location-error');
    
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    
    let errorMessage;
    if (typeof error === 'string') {
        errorMessage = error;
    } else {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "लोकेशन की अनुमति नहीं दी गई";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "लोकेशन की जानकारी उपलब्ध नहीं है";
                break;
            case error.TIMEOUT:
                errorMessage = "लोकेशन प्राप्त करने का समय समाप्त हो गया";
                break;
            default:
                errorMessage = "कोई त्रुटि हुई";
        }
    }
    
    if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.textContent = errorMessage;
    }
}

async function reverseGeocode(location) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
        );
        if (!response.ok) throw new Error('Geocoding failed');
        
        const data = await response.json();
        return data.display_name;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw error;
    }
}

// Add this CSS for styling location elements
const locationStyles = document.createElement('style');
locationStyles.textContent = `
    .current-location-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 15px;
        transition: background-color 0.3s ease;
    }

    .current-location-btn:hover {
        background-color: #45a049;
    }

    .current-location-btn:before {
        content: '📍';
    }

    #loading-spinner {
        display: none;
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4CAF50;
        border-radius: 50%;
        animation: locationSpin 1s linear infinite;
        margin: 10px auto;
    }

    @keyframes locationSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    #location-error {
        display: none;
        color: #dc3545;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
    }

    #location-success {
        display: none;
        color: #155724;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
    }

    #coordinates-display {
        display: none;
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        font-size: 14px;
    }

    #coordinates-display p {
        margin: 5px 0;
        color: #666;
    }

    .location-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 15px;
        font-size: 16px;
    }

    .location-input:focus {
        border-color: #4CAF50;
        outline: none;
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
    }

    @media (max-width: 768px) {
        .current-location-btn {
            width: 100%;
            justify-content: center;
        }

        .location-input {
            font-size: 14px;
        }
    }
`;

document.head.appendChild(locationStyles);

// Initialize location features when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const locationButton = document.querySelector('.current-location-btn');
    if (locationButton) {
        locationButton.addEventListener('click', getLocation);
    }
});
