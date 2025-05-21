import { useState } from "react";
import { decrypt } from "../utils/encryption";

export default function DecryptForm() {
  const [encrypted, setEncrypted] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleDecrypt = () => {
    try {
      const decrypted = decrypt(encrypted, key);
      setResult(decrypted);
      setError("");
    } catch (e) {
      setError(e.message);
      setResult("");
    }
  };

  return (
    <div className="form-container">
      <h2>Decriptare</h2>
      <textarea
        rows={3}
        placeholder="Introdu mesajul criptat"
        value={encrypted}
        onChange={(e) => setEncrypted(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cheie"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleDecrypt}>Decriptează</button>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          Mesaj decriptat: <br />
          {result}
        </div>
      )}
    </div>
  );
}
