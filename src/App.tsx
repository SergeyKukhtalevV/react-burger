import React from 'react';
import app from './App.module.css';
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
  return (
    <div className={app.appContent}>
      <AppHeader />
    </div>
  );
}

export default App;
