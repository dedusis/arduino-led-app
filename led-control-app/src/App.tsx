import React, { useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonText,
  IonPage,
  IonItem,
  IonLabel,
} from '@ionic/react';
import './theme/variables.css';
import './main.css';

const backendURL = 'http://192.168.2.12:5000'; // χωρίς /led, θα το προσθέσουμε δυναμικά

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
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
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
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
    } catch {
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
    } catch {
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

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Arduino LED Control</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding" fullscreen>

          {/* Αν δεν υπάρχει token → δείξε login form */}
          {!token ? (
            <>
              <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>

              <IonButton expand="block" onClick={handleLogin} color="primary">
                Login
              </IonButton>

              {error && (
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              )}
            </>
          ) : (
            <>
              <IonButton expand="block" color="success" onClick={turnOnLED}>
                Turn ON
              </IonButton>
              <IonButton expand="block" color="danger" onClick={turnOffLED}>
                Turn OFF
              </IonButton>

              <IonButton expand="block" color="medium" onClick={handleLogout}>
                Logout
              </IonButton>

              <IonText>
                <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
              </IonText>
            </>
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
