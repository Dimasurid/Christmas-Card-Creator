import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import FooterHomepage from './components/FooterHomepage';
import { LanguageProvider } from './contexts/LanguageContext';

const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Home = lazy(() => import('./components/Home'));
const CreateCard = lazy(() => import('./components/CreateCard'));
const ViewCard = lazy(() => import('./components/ViewCard'));
const MyCards = lazy(() => import('./components/MyCards'));
const Help = lazy(() => import('./components/Help'));
const PublicViewCard = lazy(() => import('./components/PublicViewCard'));
const Regenerate = lazy(() => import('./components/Regenerate'));

const AuthLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-grow">
      {children}
    </div>
    <FooterHomepage />
  </div>
);

const PublicLayout = ({ children }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

function App() {
  const [user, loading] = useAuthState(auth);
  const [language, setLanguage] = useState('en');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageProvider value={{ language, setLanguage }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <PublicLayout>
                {user ? <Navigate to="/home" /> : <LandingPage />}
              </PublicLayout>
            } />
            <Route path="/login" element={
              <PublicLayout>
                {user ? <Navigate to="/home" /> : <Login />}
              </PublicLayout>
            } />
            <Route path="/register" element={
              <PublicLayout>
                {user ? <Navigate to="/home" /> : <Register />}
              </PublicLayout>
            } />
            <Route path="/home" element={
              <AuthLayout>
                {user ? <Home /> : <Navigate to="/login" />}
              </AuthLayout>
            } />
            <Route path="/create" element={
              <AuthLayout>
                {user ? <CreateCard /> : <Navigate to="/login" />}
              </AuthLayout>
            } />
            <Route path="/card/:id" element={
              <AuthLayout>
                {user ? <ViewCard /> : <Navigate to="/login" />}
              </AuthLayout>
            } />
            <Route path="/mycards" element={
              <AuthLayout>
                {user ? <MyCards /> : <Navigate to="/login" />}
              </AuthLayout>
            } />
            <Route path="/help" element={
              <AuthLayout>
                <Help />
              </AuthLayout>
            } />
            <Route path="/view/:id" element={
              <PublicLayout>
                <PublicViewCard />
              </PublicLayout>
            } />
            <Route path="/regenerate/:id" element={
              <AuthLayout>
                {user ? <Regenerate /> : <Navigate to="/login" />}
              </AuthLayout>
            } />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;