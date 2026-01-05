
import MainLayout from '../components/layout/MainLayout';
import { TabProvider } from '../context/TabContext';
import { WorkspaceProvider } from '../context/WorkspaceContext';
import { RequestProvider } from '../context/RequestContext';
import { EnvironmentProvider } from '../context/EnvironmentContext';

export default function Dashboard() {
  return (
    <TabProvider>
      <WorkspaceProvider>
        <EnvironmentProvider>
          <RequestProvider>
            <MainLayout />
          </RequestProvider>
        </EnvironmentProvider>
      </WorkspaceProvider>
    </TabProvider>
  );
}
