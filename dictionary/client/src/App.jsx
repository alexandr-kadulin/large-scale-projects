import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SharedLayout } from './layouts';
import { ProtectedRoute } from './routes';
import {
  LandingPage,
  RegisterPage,
  ErrorPage,
  ProfilePage,
  CreateWordPage,
  SearchWordsPage,
  DevelopersTeamPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SearchWordsPage />} />
          <Route path="/word" element={<CreateWordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<DevelopersTeamPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
