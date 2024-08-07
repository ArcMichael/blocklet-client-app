import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import Home from './pages/home';
import UserProfile from './pages/user-profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <UserProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </UserProvider>
  );
}
