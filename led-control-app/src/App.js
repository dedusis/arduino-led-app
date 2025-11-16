import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonText, IonPage, IonItem, IonLabel, } from '@ionic/react';
import './theme/variables.css';
import './main.css';
const backendURL = 'http://192.168.1.215:5000';
const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    // 🔹 Login Request
    const handleLogin = async () => {
        try {
            const res = await fetch(`${backendURL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.token) {
                setToken(data.token);
                setError('');
                setStatus('Login successful ✅');
            }
            else {
                setError(data.error || 'Invalid credentials');
            }
        }
        catch (err) {
            setError('Server error');
        }
    };
    // 🔹 LED ON
    const turnOnLED = async () => {
        try {
            const res = await fetch(`${backendURL}/led/on`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const text = await res.text();
            setStatus(text);
        }
        catch {
            setStatus('Error connecting to server');
        }
    };
    // 🔹 LED OFF
    const turnOffLED = async () => {
        try {
            const res = await fetch(`${backendURL}/led/off`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const text = await res.text();
            setStatus(text);
        }
        catch {
            setStatus('Error connecting to server');
        }
    };
    // 🔹 Logout
    const handleLogout = () => {
        setToken(null);
        setUsername('');
        setPassword('');
        setStatus('');
    };
    return (_jsx(IonApp, { children: _jsxs(IonPage, { children: [_jsx(IonHeader, { children: _jsx(IonToolbar, { color: "primary", children: _jsx(IonTitle, { children: "Arduino LED Control" }) }) }), _jsx(IonContent, { className: "ion-padding", fullscreen: true, children: !token ? (_jsxs(_Fragment, { children: [_jsxs(IonItem, { children: [_jsx(IonLabel, { position: "floating", children: "Username" }), _jsx(IonInput, { value: username, onIonChange: (e) => setUsername(e.detail.value) })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { position: "floating", children: "Password" }), _jsx(IonInput, { type: "password", value: password, onIonChange: (e) => setPassword(e.detail.value) })] }), _jsx(IonButton, { expand: "block", onClick: handleLogin, color: "primary", children: "Login" }), error && (_jsx(IonText, { color: "danger", children: _jsx("p", { children: error }) }))] })) : (_jsxs(_Fragment, { children: [_jsx(IonButton, { expand: "block", color: "success", onClick: turnOnLED, children: "Turn ON" }), _jsx(IonButton, { expand: "block", color: "danger", onClick: turnOffLED, children: "Turn OFF" }), _jsx(IonButton, { expand: "block", color: "medium", onClick: handleLogout, children: "Logout" }), _jsx(IonText, { children: _jsx("p", { style: { marginTop: '20px', fontWeight: 'bold' }, children: status }) })] })) })] }) }));
};
export default App;
