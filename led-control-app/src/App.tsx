import React, { useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonPage
} from '@ionic/react';
import './theme/variables.css';
import './main.css';

const backendURL = 'http://192.168.2.12:5000/led';

const App: React.FC = () => {
  const [status, setStatus] = useState('');

  const turnOnLED = async () => {
    try {
      const res = await fetch(`${backendURL}/on`);
      const text = await res.text();
      setStatus(text);
    } catch {
      setStatus('Error connecting to server');
    }
  };

  const turnOffLED = async () => {
    try {
      const res = await fetch(`${backendURL}/off`);
      const text = await res.text();
      setStatus(text);
    } catch {
      setStatus('Error connecting to server');
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Arduino LED Control</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding" fullscreen>
          <IonButton expand="led-btn" color="success" onClick={turnOnLED}>
           Turn ON
          </IonButton>
          <IonButton expand="led-btn" color="danger" onClick={turnOffLED}>
           Turn OFF
          </IonButton>

          <IonText>
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
          </IonText>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
