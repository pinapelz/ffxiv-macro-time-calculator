import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [macro, setMacro] = useState<string>('');
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    calculateTotalTime();
  }, [macro]);

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

    setTotalTime(totalTime);
  };

  const handleMacroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMacro(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">FFXIV Macro Timer</h1>
      <p className="mb-2">Paste your macro below:</p>
      <textarea
        className="w-full h-32 border border-gray-300 rounded p-2"
        value={macro}
        onChange={handleMacroChange}
      ></textarea>
      <p className="mt-2">Total time to complete macro: {totalTime} seconds</p>
    </div>
  );
};

export default App;
