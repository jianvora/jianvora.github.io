// DOM elements
const addButton = document.getElementById('add-button');
const placeInput = document.getElementById('place-input');
const placeList = document.getElementById('place-list');
const spinButton = document.getElementById('spin-button');
const spinner = document.getElementById('spinner');
const result = document.getElementById('result');

// Load places from localStorage or initialize with default values
let places = JSON.parse(localStorage.getItem('places')) || [
    'chipotle',
    'subway',
    'apni mandi',
    'dish n dash',
    'taco bell'
];

updatePlaceList();

// Function to add a place
addButton.addEventListener('click', () => {
    const place = placeInput.value.trim();
    if (place) {
        if (!places.includes(place)) {
            places.push(place);
            updatePlaceList();
            placeInput.value = '';
        } else {
            alert(`${place} is already in the list.`);
        }
    }
});

// Allow pressing Enter key to add a place
placeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
});

// Function to update the displayed list
function updatePlaceList() {
    placeList.innerHTML = '';
    places.forEach((place, index) => {
        const li = document.createElement('li');
        li.textContent = place;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&times;';
        removeButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to remove "${place}" from the list?`)) {
                places.splice(index, 1);
                updatePlaceList();
            }
        });

        li.appendChild(removeButton);
        placeList.appendChild(li);
    });

    // Save the updated list to localStorage
    localStorage.setItem('places', JSON.stringify(places));
}

// Function to spin and select a random place
spinButton.addEventListener('click', () => {
    if (places.length === 0) {
        alert('Please add some places first!');
        return;
    }
    spinner.style.animation = 'spin 2s linear infinite';
    spinButton.disabled = true;
    result.textContent = '';
    setTimeout(() => {
        spinner.style.animation = '';
        const randomPlace = places[Math.floor(Math.random() * places.length)];
        result.textContent = `🍽️ Let's order from ${randomPlace}!`;
        spinButton.disabled = false;
    }, 2000); // 2 seconds to match the CSS animation duration
});
