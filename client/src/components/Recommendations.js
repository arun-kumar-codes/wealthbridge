import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('/api/recommendations');
                setRecommendations(response.data);
            } catch (err) {
                setError('Failed to fetch recommendations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return <div>Loading recommendations...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Personalized Investment Recommendations</h2>
            <ul>
                {recommendations.map((rec) => (
                    <li key={rec.id}>
                        <h3>{rec.title}</h3>
                        <p>{rec.description}</p>
                        <p>Expected Return: {rec.expectedReturn}%</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;