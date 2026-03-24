import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  image: string;
  category: string;
}

interface PopularProductsProps {
  onGameClick: (game: Game) => void;
  onViewAllClick: () => void;
}

const games: Game[] = [
  {
    id: '1',
    name: 'Mobile Legends',
    image: 'https://i.imgur.com/LOVaLCz.png',
    category: 'games',
  },
  {
    id: '2',
    name: 'PUBG Mobile',
    image: 'https://i.imgur.com/5kbq9EG.png',
    category: 'games',
  },
  {
    id: '3',
    name: 'Honor of Kings',
    image: 'https://i.imgur.com/tKG76iS.png',
    category: 'games',
  },
  {
    id: '4',
    name: 'Free Fire',
    image: 'https://i.imgur.com/GBiBFSQ.png',
    category: 'games',
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'games', label: 'Games' },
  { id: 'cards', label: 'Cards' },
  { id: 'recharges', label: 'Mobile Recharges' },
  { id: 'subscriptions', label: 'Subscriptions' },
];

const PopularProducts: React.FC<PopularProductsProps> = ({ onGameClick, onViewAllClick }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGames = activeFilter === 'all' 
    ? games 
    : games.filter(g => g.category === activeFilter);

  return (
    <section id="catalog" className="bg-white py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-2">
              Popular Products
            </h2>
            <p className="text-gray-500">
              Top-up your favorite games instantly
            </p>
          </div>
          <button
            onClick={onViewAllClick}
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium text-black hover:text-[#FF8A3D] transition-colors group"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] text-white shadow-lg shadow-[#FFD36A]/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredGames.map((game, index) => (
            <button
              key={game.id}
              onClick={() => onGameClick(game)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-50 transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#FFD36A] focus:ring-offset-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Game Image */}
              <img
                src={game.image}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Game Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold text-white">
                  {game.name}
                </h3>
                <p className="text-sm text-white/80">
                  Top-up now
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-[#FFD36A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500">No products in this category yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
