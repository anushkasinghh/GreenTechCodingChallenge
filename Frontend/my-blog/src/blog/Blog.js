import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import BlogEntryDetail from './components/BlogEntryDetail';
import { TransferProvider } from './TransferContext';

function getEntryFromUrl() {
  return new URLSearchParams(window.location.search).get('entry');
}

export default function Blog({ onNavigateHome, ...props }) {
  const [selectedEntryId, setSelectedEntryId] = useState(() => getEntryFromUrl());

  useEffect(() => {
    const onPopState = () => setSelectedEntryId(getEntryFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openEntry = (id) => {
    window.history.pushState({}, '', `?entry=${id}`);
    setSelectedEntryId(id);
  };

  const closeEntry = () => {
    window.history.pushState({}, '', window.location.pathname);
    setSelectedEntryId(null);
  };

  return (
    <TransferProvider>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar onNavigateHome={onNavigateHome} />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
          {selectedEntryId ? (
            <BlogEntryDetail
              entryId={selectedEntryId}
              onBack={closeEntry}
            />
          ) : (
            <>
              <MainContent onSelectEntry={openEntry} />
              <Latest />
            </>
          )}
        </Container>
        <Footer />
      </AppTheme>
    </TransferProvider>
  );
}
