import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addColonist } from './features/colonySlice';
import ColonistList from "./components/colony/ColonistList";
import logo from './logo.svg';
import './App.css';

const mapDispatch = { addColonist }

type Colonist = {
  name: string
}

interface AppProps {
  addColonist: any // lazy I know... 
}

const App: React.FC<AppProps> = ({ addColonist }) => {
  const [colonistName, setColonistName] = useState('')

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setColonistName(value)
  }

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column", width: "100vw"}}>
      <div style={{display: "block", width: "400px"}}>
      <img src={logo} width="200px" alt="secord logo" />
      <ColonistList page={1} />
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!colonistName.trim()) {
            return
          }
          addColonist(colonistName)
          setColonistName('')
        }}
      >
        <input value={colonistName} onChange={onChange} />
        <button type="submit">Add Colonist</button>
      </form>
      </div>
    </div>)
}

export default connect(
  null,
  mapDispatch
)(App)
