import { useState, useEffect } from 'react';
import axios from 'axios';

interface Log {
  id: number;
  timestamp: string;
  level: string;
  service: string;
  message: string;
}

function App() {
  // États pour filtres et recherche
  const [level, setLevel] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  // États pour logs et état chargement / erreur
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // États pour le formulaire ajout log
  const [newLevel, setNewLevel] = useState<string>('info');
  const [newService, setNewService] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string | null>(null);

  // Fonction pour charger les logs via axios
  const fetchLogs = async (params?: { level?: string; startDate?: string; query?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Log[]>('http://localhost:8000/logs', {
        params: {
          limit: 20,
          sort: 'desc',
          level: params?.level || undefined,
          startDate: params?.startDate || undefined,
          query: params?.query || undefined,
        },
      });
      setLogs(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les logs au montage (initial)
  useEffect(() => {
    fetchLogs({ level, startDate, query });
  }, []);

  // Mise à jour automatique des logs à chaque changement des filtres/recherche
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLogs({ level, startDate, query });
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [level, startDate, query]);

  // Fonction pour ajouter un nouveau log
  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostStatus(null);

    if (!newService || !newMessage) {
      setPostStatus('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/logs', {
        level: newLevel,
        service: newService,
        message: newMessage,
        timestamp: new Date().toISOString(),
      });

      setPostStatus('Log ajouté avec succès !');
      setNewLevel('info');
      setNewService('');
      setNewMessage('');
      fetchLogs({ level, startDate, query }); // rafraîchir les logs
    } catch (err) {
      setPostStatus('Erreur lors de l\'ajout du log.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Visualisation des logs</h1>

      {/* Recherche */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Recherche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
      </div>

      {/* Filtres */}
      <div className="mb-4 flex gap-4 items-center">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Tous niveaux</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Résultats */}
      <div className="bg-white rounded shadow p-4 min-h-[200px] mb-8">
        {loading && <p>Chargement des logs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && logs.length === 0 && (
          <p className="text-gray-500">Aucun résultat</p>
        )}

        {!loading && !error && logs.length > 0 && (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li key={log.id} className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span><strong>Date:</strong> {new Date(log.timestamp).toLocaleString()}</span>
                  <span><strong>Niveau:</strong> {log.level.toUpperCase()}</span>
                  <span><strong>Service:</strong> {log.service}</span>
                </div>
                <p className="text-gray-800">{log.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulaire ajout log */}
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau log</h2>
        <form onSubmit={handleAddLog} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="newLevel">Niveau</label>
            <select
              id="newLevel"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="newService">Service</label>
            <input
              id="newService"
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nom du service"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="newMessage">Message</label>
            <textarea
              id="newMessage"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Message du log"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ajouter le log
          </button>
        </form>

        {postStatus && (
          <p className={`mt-4 ${postStatus.startsWith('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
            {postStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
