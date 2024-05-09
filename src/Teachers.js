import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';
import './Dashboard.css';

function Teacher() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:3001/teachers'); 
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const [activeTab, setActiveTab] = useState('teacher'); // Default active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className='container'>
            <div className="sidebar">
                <Link to="/students">
                    <button className={activeTab === 'student' ? 'active' : ''} onClick={() => handleTabClick('student')}>
                        Student
                    </button>
                </Link>
                <Link to="/teachers">
                    <button className={activeTab === 'teacher' ? 'active' : ''} onClick={() => handleTabClick('teacher')}>
                        Teacher
                    </button>
                </Link>
            </div>
            <div className="content">
                <Routes>
                <Route path="/students" component={Students} />
                <Route path="/teachers" component={Teachers} />
                </Routes>
                <h1>Teacher List</h1>
                <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>Age</th>
                        <th>Classroom</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.age}</td>
                            <td>{teacher.classroom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

        </div>
    );
}

export default Teacher;
