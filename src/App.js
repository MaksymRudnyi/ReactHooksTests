import React, {useEffect} from 'react';
import './App.css';

import useBooleanToggle from './hooks/useBooleanToggle';
import useRest from "./hooks/useRest";


function App() {
    const { status, handleStatusChange } = useBooleanToggle(false);
    const {
        data,
        error,
        doFetch,
    } = useRest();

    useEffect(() => {
        if (!data) {
            return;
        }
        console.log(data);
        debugger
    }, [data]);

    useEffect(() => {
        if (!error) {
            return;
        }
        console.log(error);
        debugger
    }, [error]);

    const onClick = () => doFetch('https://swapi.dev/api/planets/1/');

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleStatusChange}>Show Message</button>
          {status && <h1>Hello friends!</h1>}

          <button onClick={onClick}>get data</button>
      </header>
    </div>
  );
}

export default App;
