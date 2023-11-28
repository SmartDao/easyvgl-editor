import React from 'react';
import './App.css';
import { EditorProvider } from './context/EditorContext';
import Layout from "./components/Layout";
// core styles are required for all packages
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <EditorProvider>
            <Layout/>
      </EditorProvider>
    </>
  );
}

export default App;
