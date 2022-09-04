import React, {useState} from 'react';

import { Question } from "./components/AddWidget/types";

import AskWidget from './components/AskWidget';
import AddWidget from './components/AddWidget';

import config from "./components/db.json";
import './App.css';

function App() {
  const [data, setData] = useState<Array<Question>>(config.data);

  return (
    <div className="App">
      <div className="Wrapper">
        <AskWidget data={data} />
        <AddWidget data={data} setData={setData} />
      </div>
    </div>
  );
}

export default App;
