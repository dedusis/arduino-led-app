import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import App from './App';

import '@ionic/react/css/core.css';
import './theme/variables.css';
import './main.css';

setupIonicReact();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
