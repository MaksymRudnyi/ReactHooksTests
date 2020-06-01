import React from 'react';
import './App.css';

import useBooleanToggle from './hooks/useBooleanToggle';

function App() {
    const {status, handleStatusChange} = useBooleanToggle(false);

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handleStatusChange}>Show Message</button>
                {status && <h1>Hello friends!</h1>}

            </header>
        </div>
    );
}

export default App;
