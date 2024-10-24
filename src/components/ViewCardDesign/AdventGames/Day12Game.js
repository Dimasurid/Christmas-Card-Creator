import React, { useState } from 'react';
import { Music, Mic, Save } from 'lucide-react';

const Day12Game = ({ onSave, initialState }) => {
  const [selectedSong, setSelectedSong] = useState(initialState?.selectedSong || '');
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = [
    'Jingle Bells',
    'Silent Night',
    'Deck the Halls',
    'Rudolph the Red-Nosed Reindeer',
    'Frosty the Snowman'
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    onSave({ selectedSong });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Christmas Carol Karaoke</h3>
      <select 
        value={selectedSong} 
        onChange={(e) => setSelectedSong(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a song</option>
        {songs.map(song => (
          <option key={song} value={song}>{song}</option>
        ))}
      </select>
      <button 
        onClick={togglePlay} 
        className={`${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded w-full flex items-center justify-center`}
        disabled={!selectedSong}
      >
        {isPlaying ? <Mic className="mr-2" size={20} /> : <Music className="mr-2" size={20} />}
        {isPlaying ? 'Stop Singing' : 'Start Singing'}
      </button>
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
        disabled={!selectedSong}
      >
        <Save className="mr-2" size={20} />
        Save Song Choice
      </button>
    </div>
  );
};

export default Day12Game;