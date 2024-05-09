// Dashboard.js

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';

import './Dashboard.css';

function Dashboard() {
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
                <Route path="/students" component={Students} />
                <Route path="/teachers" component={Teachers} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;
