import { useState, useEffect } from 'react';

const defaultUrls = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:5000',
];

const App = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState<string>('');

  // Load URLs from chrome storage
  useEffect(() => {
    chrome.storage.local.get(['urls'], (result) => {
      setUrls(result.urls || defaultUrls);
    });
  }, []);

  // Switch to the selected URL
  const switchToUrl = (url: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.update(tabs[0].id, { url });
      }
    });
  };

  // Add custom URL
  const addUrl = () => {
    if (customUrl && customUrl.startsWith('http')) {
      const updatedUrls = [...urls, customUrl];
      setUrls(updatedUrls);
      chrome.storage.local.set({ urls: updatedUrls });
      setCustomUrl(''); // Reset input field
    }
  };

  return (
    <div className="p-4 w-[250px]">
      <h1 className="text-lg font-semibold">Localhost Switcher</h1>
      <div className="mt-4">
        {urls.map((url, index) => (
          <button
            key={index}
            className="w-full mb-2 text-blue-500 py-2 px-4 rounded"
            onClick={() => switchToUrl(url)}
          >
            {url}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Add custom URL"
        className="border p-2 mt-4 w-full"
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
      />
      <button
        className="bg-orange-500 text-white py-2 px-4 mt-2 w-full rounded"
        onClick={addUrl}
      >
        Add URL
      </button>
      <button className="bg-green-500 text-white py-2 px-4 mt-2 w-full rounded"
        onClick={() => chrome.runtime.sendMessage({ command: 'switch-environment  ' })}
      >
        Switch Environment
      </button>
    </div>
  );
};

export default App;
