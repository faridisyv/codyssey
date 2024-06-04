import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForgetPassword.module.css'; // Import your CSS file

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Send a request to your backend to handle password reset
        axios.post('http://127.0.0.1:3001/reset-password', { email })
            .then(result => {
                setMessage(result.data.message);
                setLoading(false);
            })
            .catch(err => {
                setMessage('Something went wrong. Please try again later.');
                setLoading(false);
            });
    }

    return (
        <div className="h-screen flex justify-center items-center bg-n-8">
            <div className="bg-black p-8 rounded-lg shadow-lg">
                <h2 className='mb-4 text-2xl font-semibold text-primary'>Forget Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-n-1 font-semibold">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-dark transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p className="text-n-1 mt-2">{message}</p>}
                <div className="mt-4 text-n-1">
                    <p>Remember your password? <Link to='/login' className="text-primary font-semibold">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;
