import { useNavigate } from 'react-router-dom';


// This is a simple home page component for an expense tracker application.

export default function Home() {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            color: 'inherit',
            padding: '1rem'
        }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                color: 'inherit',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                Welcome to Expense Tracker
            </h1>
            <p style={{
                fontSize: '1.2rem',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.8',
                color: 'inherit',
                marginBottom: '2rem'
            }}>
                Track your expenses effortlessly and stay on top of your finances.
            </p>
            <button style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--primary-color, #007bff)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => {
                    navigate('/signup');
                }
                }>
                Get Started
            </button>
        </div>
    )
}