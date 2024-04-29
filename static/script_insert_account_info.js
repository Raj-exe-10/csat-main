document.getElementById('account-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const form = this;
    const data = {
      account_name: form.account_name.value,
      vertical_name: form.vertical_name.value,
      account_head_id: form.account_head_id.value
    };
    
    fetch('/insert_account_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {  // Handle successful response
      if (!response.ok) {
        return response.text().then(text => {
          document.getElementById('message').textContent = 'Failed to insert account information: ' + text;
        });
      }
      return response.json(); // Parse JSON response data
    })
    .then(data => {  // Process response data (optional)
      document.getElementById('message').textContent = data.message || 'Account information inserted successfully!';
      // You can potentially reset the form here: form.reset();
    })
    .catch(error => {  // Handle errors
      document.getElementById('message').textContent = 'Failed to insert account information: ' + error;
    });
  });
  