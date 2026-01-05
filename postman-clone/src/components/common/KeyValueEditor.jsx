import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function KeyValueEditor({ items = [], onChange, placeholder = {} }) {
  const currentItems = items.length > 0 ? items : [{ key: '', value: '', enabled: true }];

  const handleAdd = () => {
    onChange([...currentItems, { key: '', value: '', enabled: true }]);
  };

  const handleRemove = (index) => {
    const newItems = currentItems.filter((_, i) => i !== index);
    onChange(newItems.length > 0 ? newItems : [{ key: '', value: '', enabled: true }]);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...currentItems];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  const handleToggle = (index) => {
    const newItems = [...currentItems];
    newItems[index] = { ...newItems[index], enabled: !newItems[index].enabled };
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 px-2 text-sm font-semibold text-gray-600 pb-2 border-b">
        <div className="col-span-1 flex items-center">
          <input type="checkbox" className="opacity-0" disabled />
        </div>
        <div className="col-span-5">Key</div>
        <div className="col-span-5">Value</div>
        <div className="col-span-1"></div>
      </div>

      {currentItems.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center group">
          <div className="col-span-1 flex items-center justify-center">
            <input
              type="checkbox"
              checked={item.enabled !== false}
              onChange={() => handleToggle(index)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="col-span-5">
            <input
              type="text"
              value={item.key}
              onChange={(e) => handleChange(index, 'key', e.target.value)}
              placeholder={placeholder.key || 'Key'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={item.enabled === false}
            />
          </div>

          <div className="col-span-5">
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              placeholder={placeholder.value || 'Value'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={item.enabled === false}
            />
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <button
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-red-600 p-2 rounded transition opacity-0 group-hover:opacity-100"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-4 font-medium transition"
      >
        <FiPlus size={18} />
        Add Row
      </button>
    </div>
  );
}
