import { useState } from "react";
import { encrypt } from "../utils/encryption";

export default function EncryptForm() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    try {
      const encrypted = encrypt(message, key);
      setResult(encrypted);
      setError("");
    } catch (e) {
      setError(e.message);
      setResult("");
    }
  };

  return (
    <div className="form-container">
      <h2>Criptare</h2>
      <textarea
        rows={3}
        placeholder="Introdu mesajul"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cheie (fără caractere duplicate)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleEncrypt}>Criptează</button>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          Mesaj criptat: <br />
          {result}
        </div>
      )}
    </div>
  );
}
