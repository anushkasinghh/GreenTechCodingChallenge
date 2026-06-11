import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTransfer } from '../TransferContext';

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function estimatedEmission(bytes) {
  const gb = bytes / (1024 * 1024 * 1024);
  const EMDC = gb * 0.012 * 494;
  const EMN  = gb * 0.013 * 494;
  const EMUD = gb * 0.081 * 494;
  const total = EMDC + EMN + EMUD;

  if (total === 0) return '0 gCO2e';
  if (total < 0.001) return `${(total * 1_000_000).toFixed(2)} µgCO2e`;
  if (total < 1)     return `${(total * 1000).toFixed(2)} mgCO2e`;
  return `${total.toFixed(3)} gCO2e`;
}


export default function Footer() {
  const { totalBytes } = useTransfer();

  return (
    <React.Fragment>
      <Divider />
      {/* Hidden until analytics consent is confirmed — toggled to 'flex' in production */}
      <Box
        sx={{
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          py: 1.5,
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Total data transferred:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {formatBytes(totalBytes)}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Emission estimation (if it were online): 
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {estimatedEmission(totalBytes)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <a href='https://sustainablewebdesign.org/estimating-digital-emissions/'>sustainablewebdesign.org</a>
        </Typography>
        
      </Box>
    </React.Fragment>
  );
}
