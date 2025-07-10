import { useState } from "react";
import { postLog } from "../services/api";

const LogForm = () => {
  const [log, setLog] = useState({ timestamp: "", level: "INFO", message: "", service: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postLog(log);
    alert("Log ajouté !");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <input type="datetime-local" onChange={(e) => setLog({ ...log, timestamp: new Date(e.target.value).toISOString() })} required />
      <select onChange={(e) => setLog({ ...log, level: e.target.value })}>
        <option>INFO</option>
        <option>WARNING</option>
        <option>ERROR</option>
        <option>DEBUG</option>
      </select>
      <input placeholder="Message" onChange={(e) => setLog({ ...log, message: e.target.value })} required />
      <input placeholder="Service" onChange={(e) => setLog({ ...log, service: e.target.value })} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 mt-2">Soumettre</button>
    </form>
  );
};

export default LogForm;
