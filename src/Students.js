import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';
import './Dashboard.css';

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3001/students'); 
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const [activeTab, setActiveTab] = useState('student'); // Default active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
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
                    <Route path="/students" element={<Students />} />
                    <Route path="/teachers" element={<Teachers />} />
                </Routes>
                <h1>Student List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>Age</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.age}</td>
                                <td>{student.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
