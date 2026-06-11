import * as React from 'react';

const TransferContext = React.createContext({ totalBytes: 0, addTransfer: () => {} });

export function TransferProvider({ children }) {
  const [totalBytes, setTotalBytes] = React.useState(() => {
    const saved = localStorage.getItem('totalTransferBytes');
    return saved ? parseInt(saved, 10) : 0;
  });

  const addTransfer = React.useCallback((bytes) => {
    setTotalBytes((prev) => {
      const next = prev + bytes;
      localStorage.setItem('totalTransferBytes', String(next));
      return next;
    });
  }, []);

  return (
    <TransferContext.Provider value={{ totalBytes, addTransfer }}>
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  return React.useContext(TransferContext);
}
