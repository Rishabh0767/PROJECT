import { useRequest } from '../../context/RequestContext';
import { FiClock, FiHardDrive, FiCopy, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function StatusBar() {
  const { response } = useRequest();

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'bg-green-600 text-white';
    if (status >= 300 && status < 400) return 'bg-yellow-600 text-white';
    if (status >= 400) return 'bg-red-600 text-white';
    return 'bg-dark-hover text-dark-text';
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const copyResponse = () => {
    const text = typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data, null, 2);
    navigator.clipboard.writeText(text);
    toast.success('Response copied to clipboard!');
  };

  const downloadResponse = () => {
    const text = typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data, null, 2);
    
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `response-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Response downloaded!');
  };

  return (
    <div className="bg-dark-surface px-4 py-3 border-b border-dark-border flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-text-secondary font-medium">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText}
          </span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 text-dark-text">
          <FiClock size={16} />
          <span className="text-sm font-medium">{response.time}ms</span>
        </div>

        {/* Size */}
        {response.size && (
          <div className="flex items-center gap-2 text-dark-text">
            <FiHardDrive size={16} />
            <span className="text-sm font-medium">{formatBytes(response.size)}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={copyResponse}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-dark-text bg-dark-bg hover:bg-dark-hover border border-dark-border rounded transition"
        >
          <FiCopy />
          Copy
        </button>
        <button
          onClick={downloadResponse}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-dark-text bg-dark-bg hover:bg-dark-hover border border-dark-border rounded transition"
        >
          <FiDownload />
          Download
        </button>
      </div>
    </div>
  );
}
