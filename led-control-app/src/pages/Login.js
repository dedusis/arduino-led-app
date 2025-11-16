import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { login } from '../services/api';
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            if (data.token) {
                onLogin(data.token);
            }
            else {
                setError(data.error || 'Login failed');
            }
        }
        catch {
            setError('Server error');
        }
    };
    return (_jsx(IonPage, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx(IonInput, { placeholder: "Username", value: username, onIonChange: e => setUsername(e.detail.value) }), _jsx(IonInput, { placeholder: "Password", type: "password", value: password, onIonChange: e => setPassword(e.detail.value) }), _jsx(IonButton, { onClick: handleLogin, children: "Login" }), error && _jsx(IonText, { color: "danger", children: error })] }) }));
};
export default Login;
