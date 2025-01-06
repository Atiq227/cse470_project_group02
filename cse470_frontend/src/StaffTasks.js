import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stafftasks.css';

const StaffTasks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { staffName, staffId, contactNumber, email } = location.state || {};

    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState({
        success: false,
        error: ''
    });

    const fetchTasks = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/staff-tasks/${staffId}`);
            const data = await response.json();
            if (response.ok) {
                setTasks(data.data);
            } else {
                setStatus({ success: false, error: data.message });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setStatus({ success: false, error: 'An error occurred while fetching the tasks' });
        }
    }, [staffId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const markAsDone = async (taskId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/staff-task/${taskId}/done`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                setTasks(tasks.filter(task => task.task_id !== taskId));
            } else {
                setStatus({ success: false, error: data.message });
            }
        } catch (error) {
            console.error('Error marking task as done:', error);
            setStatus({ success: false, error: 'An error occurred while marking the task as done' });
        }
    };

    const handleBack = () => {
        navigate('/staffhome', { state: { staffName, staffId, contactNumber, email } });
    };

    return (
        <div className="staff-tasks">
            <nav className="menu-nav">
                <button onClick={handleBack}>
                    Back to Dashboard
                </button>
            </nav>
            <h2>Staff Tasks</h2>
            {status.error && <p className="error-message">{status.error}</p>}
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.task_id} className="task-item">
                        <p>{task.task_description}</p>
                        <button onClick={() => markAsDone(task.task_id)}>Mark as Done</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StaffTasks;