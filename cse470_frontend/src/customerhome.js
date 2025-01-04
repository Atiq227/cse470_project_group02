const CustomerHome = () => {
    const navigate = useNavigate(); // Ensure `useNavigate` is imported from `react-router-dom`
    const customerName = "Your Customer Name"; // Replace with actual logic to get the customer's name

    const actions = [
        {
            title: 'View Menu',
            description: 'Browse our food menu',
            onClick: () => navigate('/menu', { state: { customerName } }),
        },
        {
            title: 'Previous Orders',
            description: 'View your order history',
            onClick: () => navigate('/previousorders', { state: { customerName } }),
        },
        {
            title: 'Credit Balance',
            description: 'Check your available credit',
            onClick: () => navigate('/credit', { state: { customerName } }),
        },
        {
            title: 'Favourite Items',
            description: 'View your saved favorites',
            onClick: () => navigate('/favorites', { state: { customerName } }),
        },
        {
            title: 'View Profile',
            description: 'Manage your account details',
            onClick: () => navigate('/customerprofile', { state: { customerName } }),
        },
    ];

    return (
        <div>
            {actions.map((action, index) => (
                <div key={index} onClick={action.onClick}>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerHome;
