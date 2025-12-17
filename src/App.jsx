import { RouterProvider } from 'react-router-dom';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import router from './routes';
import './styles/global.css';

function App() {
  return (
    <WorkspaceProvider>
      <RouterProvider router={router} />
    </WorkspaceProvider>
  );
}

export default App;