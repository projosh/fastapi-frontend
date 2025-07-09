import React, { useState } from 'react';

function App() {
  // État pour la recherche
  const [query, setQuery] = useState('');

  // État pour les résultats
  const [results, setResults] = useState<any[]>([]);

  // Fonction pour simuler la recherche (plus tard on fera appel à l'API)
  const handleSearch = () => {
    // Ici tu appelleras ton API avec 'query' et les filtres
    // Pour l'instant on simule un retour statique
    setResults([
      { id: 1, message: 'Log 1 correspondant à ' + query },
      { id: 2, message: 'Log 2 correspondant à ' + query },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Visualisation des logs</h1>

      {/* Barre de recherche */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Recherche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>

      {/* Zone des filtres - on ajoutera plus tard */}

      {/* Résultats */}
      <div className="bg-white rounded shadow p-4">
        {results.length === 0 ? (
          <p className="text-gray-500">Aucun résultat</p>
        ) : (
          results.map((log) => (
            <div key={log.id} className="border-b py-2 last:border-b-0">
              {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
