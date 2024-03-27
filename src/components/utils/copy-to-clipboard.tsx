import React, { useState } from 'react';

interface CopyToClipboardProps {
  text: string;
  buttonText?: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, buttonText = 'Copy to Clipboard' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => console.error('Failed to copy to clipboard:', error));
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        aria-label={copied ? 'Text copied to clipboard' : 'Copy text to clipboard'}
      >
        {copied ? 'Copied!' : buttonText}
      </button>
      {copied && (
        <span className="absolute top-full left-0 mt-2 text-sm text-gray-500">
          Copied to clipboard
        </span>
      )}
    </div>
  );
};

export default CopyToClipboard;
