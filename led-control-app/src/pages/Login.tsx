import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { login } from '../services/api';

interface Props {
  onLogin: (token: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      if (data.token) {
        onLogin(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" value={username} onIonChange={e => setUsername(e.detail.value!)} />
        <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        <IonButton onClick={handleLogin}>Login</IonButton>
        {error && <IonText color="danger">{error}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default Login;
