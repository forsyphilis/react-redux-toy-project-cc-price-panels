import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement);

if(module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <NextApp />,
            rootElement
        )
    })
}

registerServiceWorker();
