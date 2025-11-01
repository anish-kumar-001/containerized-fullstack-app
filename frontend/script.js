const BACKEND_URL = 'http://3.109.55.95:5000'; // The Docker service name

// Function to fetch and display data
async function fetchData() {
    const container = document.getElementById('data-container');
    container.innerHTML = 'Loading users...';
    try {
        const response = await fetch(`${BACKEND_URL}/data`);
        const data = await response.json();

        if (response.ok) {
            if (data.length > 0) {
                let html = '<table><tr><th>ID</th><th>Name</th><th>Email</th></tr>';
                data.forEach(user => {
                    html += `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.email}</td></tr>`;
                });
                html += '</table>';
                container.innerHTML = html;
            } else {
                container.innerHTML = 'No users found in the database.';
            }
        } else {
             container.innerHTML = `Error: ${data.error || 'Failed to fetch data'}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = 'Error: Could not connect to the backend server.';
    }
}

// Function to add a new user (triggered by button click)
async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('message');
    
    messageEl.textContent = '';

    if (!name || !email) {
        messageEl.textContent = 'Please enter both name and email.';
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/users/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();

        if (response.status === 201) {
            messageEl.textContent = `Success: ${result.message} (ID: ${result.userId})`;
            // Clear inputs
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            // Refresh the user list
            fetchData(); 
        } else {
            messageEl.textContent = `Error: ${result.error || 'Failed to add user.'}`;
        }
    } catch (error) {
        console.error('Error adding user:', error);
        messageEl.textContent = 'Error: Could not connect to the backend.';
    }
}

// Initial data load when the page starts
fetchData();