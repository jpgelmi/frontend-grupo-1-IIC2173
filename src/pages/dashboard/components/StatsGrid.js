import React from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

export default function StatsGrid({ stats }) {
  const statCards = [
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Loss Rate',
      value: `${stats.lossRate}%`,
      icon: TrendingDown,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Pending Bets',
      value: stats.pendingBets,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
            <div className={`${card.bg} p-3 rounded-full`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}