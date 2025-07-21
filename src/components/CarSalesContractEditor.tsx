import React from 'react';
import {
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  Box,
} from '@mui/material';

export interface ContractData {
  // Vehicle Information
  registrationNumber: string;
  modelName: string;
  year: string;
  vin: string;
  
  // Sales Information
  salesPrice: string;
  paymentTerms: string;
  
  // Party A (Seller)
  sellerName: string;
  sellerAddress: string;
  sellerContact: string;
  
  // Party B (Buyer)
  buyerName: string;
  buyerAddress: string;
  buyerContact: string;
  
  // Agreement Date
  agreementDate: string;
}

interface CarSalesContractEditorProps {
  data: ContractData;
  onChange: (data: ContractData) => void;
  onImageEdit?: (elementId: string) => void;
  editableValues?: Record<string, any>;
}

const CarSalesContractEditor: React.FC<CarSalesContractEditorProps> = ({ 
  data, 
  onChange,
  onImageEdit,
  editableValues 
}) => {
  const handleChange = (field: keyof ContractData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: event.target.value,
    });
  };

  return (
    <Paper sx={{ 
      p: 0, 
      height: '100%', 
      overflowY: 'auto',
      boxShadow: 'none',
      elevation: 0 
    }}>
      <Stack spacing={2}>
        {/* Vehicle Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Vehicle Information
        </Typography>
        <TextField
          fullWidth
          label="Registration Number"
          value={data.registrationNumber}
          onChange={handleChange('registrationNumber')}
          placeholder="e.g. 12GA 3456"
          size="small"
        />
        <TextField
          fullWidth
          label="Model Name"
          value={data.modelName}
          onChange={handleChange('modelName')}
          placeholder="e.g. Sonata DN8"
          size="small"
        />
        <TextField
          fullWidth
          label="Year"
          value={data.year}
          onChange={handleChange('year')}
          placeholder="e.g. 2024"
          size="small"
        />
        <TextField
          fullWidth
          label="VIN"
          value={data.vin}
          onChange={handleChange('vin')}
          placeholder="e.g. KMHL14JA6PA123456"
          size="small"
        />

        <Divider />

        {/* Sales Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Sales Information
        </Typography>
        <TextField
          fullWidth
          label="Sale Price"
          value={data.salesPrice}
          onChange={handleChange('salesPrice')}
          placeholder="e.g. $35,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Payment Terms"
          value={data.paymentTerms}
          onChange={handleChange('paymentTerms')}
          placeholder="e.g. 10% down, 90% balance"
          size="small"
          multiline
          rows={2}
        />

        <Divider />

        {/* Seller Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Seller Information
        </Typography>
        <TextField
          fullWidth
          label="Address"
          value={data.sellerAddress}
          onChange={handleChange('sellerAddress')}
          placeholder="e.g. 123 Main St, City, State"
          size="small"
        />
        <TextField
          fullWidth
          label="Name"
          value={data.sellerName}
          onChange={handleChange('sellerName')}
          placeholder="e.g. John Doe"
          size="small"
        />
        <TextField
          fullWidth
          label="Contact"
          value={data.sellerContact}
          onChange={handleChange('sellerContact')}
          placeholder="e.g. (555) 123-4567"
          size="small"
        />

        <Divider />

        {/* Buyer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Buyer Information
        </Typography>
        <TextField
          fullWidth
          label="Address"
          value={data.buyerAddress}
          onChange={handleChange('buyerAddress')}
          placeholder="e.g. 456 Oak Ave, City, State"
          size="small"
        />
        <TextField
          fullWidth
          label="Name"
          value={data.buyerName}
          onChange={handleChange('buyerName')}
          placeholder="e.g. Jane Smith"
          size="small"
        />
        <TextField
          fullWidth
          label="Contact"
          value={data.buyerContact}
          onChange={handleChange('buyerContact')}
          placeholder="e.g. (555) 987-6543"
          size="small"
        />

        <Divider />

        {/* Agreement Date */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Agreement Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={data.agreementDate}
          onChange={handleChange('agreementDate')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Divider />

        {/* Image Edit */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Image Edit
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px' }}>
              Logo Image
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onImageEdit && onImageEdit('brandLogo')}
            >
              {editableValues?.['brandLogo']?.name || 'Select Logo'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CarSalesContractEditor;