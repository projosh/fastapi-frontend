import { useEffect, useState } from "react";
import { getLogs } from "../services/api";
import LogCard from "../components/LogCard";
import LogFilter from "../components/LogFilter";
import LogForm from "../components/LogForm";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchLogs = async (params = {}) => {
    const res = await getLogs(params);
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilter = (newFilter: any) => {
    const updated = { ...filters, ...newFilter };
    setFilters(updated);
    fetchLogs(updated);
  };

  return (
    <div>
      <LogFilter onSearch={handleFilter} />
      {logs.map((log: any) => <LogCard key={log.id} {...log} />)}
      <LogForm />
    </div>
  );
};

export default Home;
