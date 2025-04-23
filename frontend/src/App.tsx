import './App.css'
import { Button } from '@ui5/webcomponents-react';
import TablaEjemplo from "./pages/inventario"

function App() {

  return (
    <>
      <Button onClick={() => alert('Hello World!')}>Hello world!</Button>
      <TablaEjemplo />
    </>
  )
}

export default App
