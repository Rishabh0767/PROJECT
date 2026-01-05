import ParamsTab from './tabs/ParamsTab';
import HeadersTab from './tabs/HeadersTab';
import AuthTab from './tabs/AuthTab';
import BodyTab from './tabs/BodyTab';
import { requestStyles } from '../../utils/requestStyles';

export default function RequestConfigTabs({ 
  activeConfigTab, 
  setActiveConfigTab, 
  currentTabData, 
  onUpdateRequest,
  activeTabId 
}) {
  const requestTabs = [
    { id: 'params', label: 'Params' },
    { id: 'authorization', label: 'Authorization' },
    { id: 'headers', label: 'Headers' },
    { id: 'body', label: 'Body' }
  ];

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex px-4 bg-dark-bg flex-shrink-0 h-10">
        {requestTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveConfigTab(tab.id)}
            className={`${requestStyles.button} ${
              activeConfigTab === tab.id 
                ? requestStyles.activeConfigTab
                : requestStyles.inactiveConfigTab
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-dark-bg">
        {activeConfigTab === 'params' && (
          <ParamsTab 
            currentTabData={currentTabData} 
            onUpdateRequest={onUpdateRequest} 
          />
        )}
        
        {activeConfigTab === 'headers' && (
          <HeadersTab 
            currentTabData={currentTabData} 
            onUpdateRequest={onUpdateRequest} 
          />
        )}
        
        {activeConfigTab === 'authorization' && (
          <AuthTab 
            currentTabData={currentTabData} 
            onUpdateRequest={onUpdateRequest} 
          />
        )}
        
        {activeConfigTab === 'body' && (
          <BodyTab 
            currentTabData={currentTabData} 
            onUpdateRequest={onUpdateRequest}
            activeTabId={activeTabId}
          />
        )}
      </div>
    </>
  );
}
