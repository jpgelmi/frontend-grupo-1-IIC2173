import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function BetsTable({ bets }) {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getStatusColor = (status) => {
    const colors = {
      correct: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      wrong: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      rejected: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return colors[status];
  };

  const getOddForBet = (bet) => {
    return bet.fixture.odds[0].values.find(
      (value) => value.value === bet.request.betType
    ).odd;
  };

  const getBettedTeam = (bet) => {
    if (bet.request.betType != "draw") {
      return bet.fixture.teams[bet.request.betType].name;
    } else {
      return "Empate";
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Equipos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Apuesta
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Precio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ponderador
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {bets.map((bet) => (
              // console.log(bet.request),
              <React.Fragment key={bet.id}>
                <tr
                  onClick={() => toggleRow(bet.id)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {expandedRows.has(bet.id) ? (
                        <ChevronUp className="h-4 w-4 mr-2 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {bet.fixture.teams.home.name} vs {bet.fixture.teams.away.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {bet.request.betType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {bet.fixture.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${bet.request.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {getOddForBet(bet)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(bet.request.status)}`}>
                      {bet.request.status.charAt(0).toUpperCase() + bet.request.status.slice(1)}
                    </span>
                  </td>
                </tr>
                {expandedRows.has(bet.id) && (
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cantidad de bonos</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{bet.request.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipo apostado</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{getBettedTeam(bet)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Posible ganancia</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                            ${(bet.request.quantity * 1000 * getOddForBet(bet)).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Boleta</p>
                          <button
                            disabled={bet.request.status === 'rejected' || bet.request.status === 'pending'}
                            className={`mt-1 inline-flex items-center text-sm ${
                              bet.request.status === 'rejected' || bet.request.status === 'pending'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (bet.request.status !== 'rejected') {
                                window.open(bet.ticketLink, '_blank');
                              }
                            }}
                          >
                            Ver boleta
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                        <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de compra</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{bet.request.date != "Invalid Date" ? bet.request.date : 'Fecha no disponible :('}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}