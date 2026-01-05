import RequestTabs from './RequestTabs';
import RequestBreadcrumb from './RequestBreadcrumb';
import RequestLine from './RequestLine';
import RequestConfigTabs from './RequestConfigTabs';
import SaveRequestModal from './SaveRequestModal';
import { useRequestBuilder } from '../../hooks/useRequestBuilder';
import { requestStyles } from '../../utils/requestStyles';

export default function RequestBuilder() {
  const {
    // State
    activeConfigTab,
    setActiveConfigTab,
    showSaveModal,
    setShowSaveModal,
    collections,
    selectedCollection,
    setSelectedCollection,
    newCollectionName,
    setNewCollectionName,
    isCreatingNew,
    setIsCreatingNew,
    currentTabData,
    
    // Tab actions
    tabs,
    activeTabId,
    addTab,
    closeTab,
    switchTab,
    
    // Request actions
    handleUpdateRequest,
    handleSend,
    handleSaveRequest,
    handleCreateAndSave,
    
    // Workspace
    activeWorkspace
  } = useRequestBuilder();

  return (
    <div className={requestStyles.container}>
      <RequestTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onSwitchTab={switchTab}
        onCloseTab={closeTab}
        onAddTab={addTab}
      />

      <RequestBreadcrumb
        activeWorkspace={activeWorkspace}
        currentTabData={currentTabData}
        onUpdateRequest={handleUpdateRequest}
        onShowSaveModal={() => setShowSaveModal(true)}
      />

      <RequestLine
        currentTabData={currentTabData}
        onUpdateRequest={handleUpdateRequest}
        onSend={handleSend}
      />

      <RequestConfigTabs
        activeConfigTab={activeConfigTab}
        setActiveConfigTab={setActiveConfigTab}
        currentTabData={currentTabData}
        onUpdateRequest={handleUpdateRequest}
        activeTabId={activeTabId}
      />

      {showSaveModal && (
        <SaveRequestModal
          collections={collections}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          newCollectionName={newCollectionName}
          setNewCollectionName={setNewCollectionName}
          isCreatingNew={isCreatingNew}
          setIsCreatingNew={setIsCreatingNew}
          onSave={handleSaveRequest}
          onCreateAndSave={handleCreateAndSave}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
