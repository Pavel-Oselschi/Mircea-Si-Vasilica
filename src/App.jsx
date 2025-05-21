import EncryptForm from "./components/EncryptForm";
import DecryptForm from "./components/DecryptForm";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>🔐 Aplicație Criptare & Decriptare</h1>
      <EncryptForm />
      <DecryptForm />
    </div>
  );
}

export default App;
