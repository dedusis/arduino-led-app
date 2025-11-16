import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IonPage, IonContent, IonButton, IonText } from '@ionic/react';
import { turnOnLED, turnOffLED } from '../services/api';
const Dashboard = ({ token }) => {
    const [status, setStatus] = useState('');
    const handleOn = async () => {
        const res = await turnOnLED(token);
        setStatus(res);
    };
    const handleOff = async () => {
        const res = await turnOffLED(token);
        setStatus(res);
    };
    return (_jsx(IonPage, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx(IonButton, { color: "success", onClick: handleOn, children: "Turn ON" }), _jsx(IonButton, { color: "danger", onClick: handleOff, children: "Turn OFF" }), _jsx(IonText, { children: _jsx("p", { children: status }) })] }) }));
};
export default Dashboard;
