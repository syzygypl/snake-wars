import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_IO_HOST || '/');

ReactDOM.render(
    <SocketProvider socket={socket}>
        <App />
    </SocketProvider>,
    document.getElementById('root')
);
registerServiceWorker();
