document.getElementById('csat-id-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    fetch('/get_csat_id')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            document.getElementById('csat-id-list').textContent = 'Error: ' + text;
          });
        }
        return response.json(); // Parse JSON response data
      })
      .then(data => {
        const csatIdList = data.csat_id;
        if (csatIdList.length === 0) {
          document.getElementById('csat-id-list').textContent = 'No CSAT IDs found.';
        } else {
          const list = document.createElement('ul');
          csatIdList.forEach(id => {
            const listItem = document.createElement('li');
            listItem.textContent = id;
            list.appendChild(listItem);
          });
          document.getElementById('csat-id-list').innerHTML = ''; // Clear previous content
          document.getElementById('csat-id-list').appendChild(list);
        }
      })
      .catch(error => {
        document.getElementById('csat-id-list').textContent = 'Error fetching CSAT IDs: ' + error;
      });
  });
  