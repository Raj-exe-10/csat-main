document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const formData = new FormData(this);
    const ratings = {};

    for (const [key, value] of formData.entries()) {
        if (key.startsWith('rating-question')) {
            const questionId = key.split('-')[2];
            ratings[questionId] = value;
        }
    }

    console.log('Collected Ratings:', ratings);
    // Here, implement an AJAX call to submit the ratings to the server
    // Example: axios.post('/submit_reviews', { customer_id: '{{ customer_id }}', ratings })
});
