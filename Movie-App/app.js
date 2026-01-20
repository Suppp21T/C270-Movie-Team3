import React, { useState, useEffect } from 'react';
import { Film, Star, Clock, Calendar } from 'lucide-react';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const initialMovies = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, duration: 142 },
    { id: 2, title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2, duration: 175 },
    { id: 3, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, duration: 152 },
    { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9, duration: 154 },
    { id: 5, title: "Forrest Gump", year: 1994, genre: "Drama", rating: 8.8, duration: 142 },
    { id: 6, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, duration: 148 },
    { id: 7, title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7, duration: 136 },
    { id: 8, title: "Goodfellas", year: 1990, genre: "Crime", rating: 8.7, duration: 145 },
    { id: 9, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, duration: 169 },
    { id: 10, title: "The Silence of the Lambs", year: 1991, genre: "Thriller", rating: 8.6, duration: 118 }
  ];

  useEffect(() => {
    setMovies(initialMovies);
  }, []);

  const genres = ['all', ...new Set(initialMovies.map(m => m.genre))];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">MovieDB</h1>
          </div>
          <p className="text-gray-300 text-lg">Discover Your Next Favorite Film</p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-purple-500 transition"
          />
          
          <div className="flex gap-2 flex-wrap justify-center">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-700"
            >
              <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Film className="w-20 h-20 text-white opacity-50" />
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {movie.title}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{movie.year}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{movie.duration} min</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                      {movie.genre}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No movies found matching your criteria</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400">
          <p className="text-sm">MovieDB v1.0.0 • Ready for CI/CD Deployment</p>
        </div>
      </div>
    </div>
  );
};

export default MovieApp;