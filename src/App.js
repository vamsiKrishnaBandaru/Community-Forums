import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store';
import theme from './theme';
import './app.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './modules/landing/LandingPage';
import ForumList from './modules/forums/components/ForumList';
import ForumDetail from './modules/forums/components/ForumDetail';
import ForumForm from './modules/forums/components/ForumForm';
import Login from './modules/auth/components/Login';
import Register from './modules/auth/components/Register';
import ProtectedRoute from './components/common/ProtectedRoute';
import Profile from './modules/profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Header />
            <main style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '2rem' }}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/forums" element={<ForumList />} />
                <Route path="/forums/new" element={
                  <ProtectedRoute>
                    <ForumForm />
                  </ProtectedRoute>
                } />
                <Route path="/forums/edit/:id" element={
                  <ProtectedRoute>
                    <ForumForm />
                  </ProtectedRoute>
                } />
                <Route path="/forums/:id" element={<ForumDetail />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;