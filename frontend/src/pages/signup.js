const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug log
    console.log('Submitting data:', {
        email,
        password,
        // ... other fields
    });

    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                // ... other fields
            })
        });

        // Debug log
        const data = await response.json();
        console.log('Response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        navigate('/login');
    } catch (error) {
        console.error('Registration error:', error);
        setError(error.message);
    }
}; 