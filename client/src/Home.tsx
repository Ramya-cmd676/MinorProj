import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState<any[]>([]); // State to hold the courses
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        // Fetch courses data from the backend
        axios.get('http://localhost:5000/api/courses/scrape', {
            params: { query: 'AI' } // Replace with your actual query parameter
        })
            .then((response) => {
                console.log(response.data); // Log the response data for debugging
                setCourses(response.data.courses || []); // Store the response data in state
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, []); // The empty array means this will only run once when the component mounts

    const getYouTubeEmbedLink = (url: string) => {
        const videoId = url.split('v=')[1]?.split('&')[0]; // Extract video ID
        return `https://www.youtube.com/embed/${videoId}`;
    };

    // Loading state
    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    // No courses found state
    if (courses.length === 0) {
        return <div>No courses found.</div>;
    }

    return (
        <div className="courses-wrapper">
            <h1>Welcome to Course Finder</h1>
            <h2>Courses</h2>
            <div className="courses-container">
                {courses.map((course: any) => (
                    <div key={course.id} className="course-item">
                        <h3 className="course-title">{course.title}</h3>
                        <iframe
                            className="course-video"
                            src={getYouTubeEmbedLink(course.link)}
                            title={course.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
