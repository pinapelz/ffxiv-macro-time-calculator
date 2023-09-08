import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [macro, setMacro] = useState<string>('');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [showRunCountInput, setShowRunCountInput] = useState<boolean>(false);
  const [runCount, setRunCount] = useState<number | null>(null);
  const [useFood, setUseFood] = useState<boolean>(false);
  const [numFood, setNumFood] = useState<number>(0);
  const [useTincture, setUseTincture] = useState<boolean>(false);
  const [numTincture, setNumTincture] = useState<number>(0);

  useEffect(() => {
    calculateTotalTime();
  }, [macro, runCount]);

  const calculateTotalTime = () => {
    const lines = macro.split('\n');
    let totalTime = 0;

    for (const line of lines) {
      const waitMatch = line.match(/<wait\.(\d+)>/);

      if (waitMatch) {
        const waitTime = parseInt(waitMatch[1]);
        totalTime += waitTime;
      }
    }

    if (runCount && runCount > 0) {
      totalTime *= runCount;
    }
    setTotalTime(totalTime);
    setNumTincture(Math.ceil(totalTime/60/15));
    setNumFood(Math.ceil(totalTime/60/30));
  };

  const handleMacroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMacro(event.target.value);
    setShowRunCountInput(!!event.target.value);
    setNumFood(Math.ceil(totalTime/60/30));
    setNumTincture(Math.ceil(totalTime/60/15));
  };

  const handleRunCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value);
    setRunCount(count);
    setNumFood(Math.ceil(totalTime/60/30));
    setNumTincture(Math.ceil(totalTime/60/15));
  };

  return (
    <div className="container mx-auto p-4">
    <div className="flex items-center">
      <img src="ffxivbyre.png" alt="Logo" className="w-16 h-16 mr-4" />
      <h1 className="text-3xl font-semibold">FFXIV Macro Time Calculator</h1>
    </div>
      <p className="mb-2">Paste your macro below:</p>
      <textarea
        className="w-full h-32 border border-gray-300 rounded p-2"
        value={macro}
        onChange={handleMacroChange}
      ></textarea>
      {showRunCountInput && (
        <>
          <p className="mt-2">How many times do you plan to run the macro?</p>
          <input
            type="number"
            value={runCount || ''}
            onChange={handleRunCountChange}
            min="1"
            className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={useFood}
                onChange={() => setUseFood(!useFood)}
              />
              <span className="ml-2 text-gray-700">Use Food?</span>
            </label>
          </p>
          <p className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={useTincture}
                onChange={() => setUseTincture(!useTincture)}
              />
              <span className="ml-2 text-gray-700">Use Tea/Syrup (Pot)</span>
            </label>
          </p>
        </>
      )}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg py-2">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Results</h2>
          <p className="mt-2 text-lg text-gray-500">Total time to complete macro: {totalTime} seconds</p>
          {useFood && (
            <>
              <p className="mt-4 text-lg text-gray-500">You will need to refresh food {numFood} {numFood > 1 ? 'times' : 'time'}</p>
            </>
          )}
          {useTincture && (
            <>
              <p className="mt-4 text-lg text-gray-500">You will need to refresh pots {numTincture} {numTincture > 1 ? 'times' : 'time'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
