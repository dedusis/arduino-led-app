import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonText } from '@ionic/react';
import { turnOnLED, turnOffLED } from '../services/api';

interface Props {
  token: string;
}

const Dashboard: React.FC<Props> = ({ token }) => {
  const [status, setStatus] = useState('');

  const handleOn = async () => {
    const res = await turnOnLED(token);
    setStatus(res);
  };

  const handleOff = async () => {
    const res = await turnOffLED(token);
    setStatus(res);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton color="success" onClick={handleOn}>Turn ON</IonButton>
        <IonButton color="danger" onClick={handleOff}>Turn OFF</IonButton>
        <IonText><p>{status}</p></IonText>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
