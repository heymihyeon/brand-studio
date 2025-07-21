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

export interface QuotationData {
  // Vehicle Details
  modelName: string;
  year: string;
  vin: string;
  registrationNumber: string;
  mileage: string;
  fuelTransmission: string;
  
  // Quotation Summary
  basePrice: string;
  vat: string;
  optionalFeatures: string;
  registrationFees: string;
  deliveryCharges: string;
  totalPrice: string;
  
  // Quotation Terms
  validUntil: string;
  
  // Party A (Dealer)
  dealerCompanyName: string;
  dealerAddress: string;
  dealerContactPerson: string;
  dealerPhone: string;
  dealerEmail: string;
  
  // Party B (Customer)
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  
  // Date of Issue
  issueDate: string;
}

interface QuotationEditorProps {
  data: QuotationData;
  onChange: (data: QuotationData) => void;
  onImageEdit?: (elementId: string) => void;
  editableValues?: Record<string, any>;
}

const QuotationEditor: React.FC<QuotationEditorProps> = ({ 
  data, 
  onChange,
  onImageEdit,
  editableValues 
}) => {
  const handleChange = (field: keyof QuotationData) => (
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
        {/* Vehicle Details */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Vehicle Details
        </Typography>
        <TextField
          fullWidth
          label="Vehicle Type and Model"
          value={data.modelName}
          onChange={handleChange('modelName')}
          placeholder="e.g. Sonata DN8"
          size="small"
        />
        <TextField
          fullWidth
          label="Year of Manufacture"
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
        <TextField
          fullWidth
          label="Registration Number (if applicable)"
          value={data.registrationNumber}
          onChange={handleChange('registrationNumber')}
          placeholder="e.g. 12GA 3456"
          size="small"
        />
        <TextField
          fullWidth
          label="Mileage"
          value={data.mileage}
          onChange={handleChange('mileage')}
          placeholder="e.g. 25,000 km"
          size="small"
        />
        <TextField
          fullWidth
          label="Fuel Type / Transmission"
          value={data.fuelTransmission}
          onChange={handleChange('fuelTransmission')}
          placeholder="e.g. Gasoline / Automatic"
          size="small"
        />

        <Divider />

        {/* Quotation Summary */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Quotation Summary
        </Typography>
        <TextField
          fullWidth
          label="Base Vehicle Price"
          value={data.basePrice}
          onChange={handleChange('basePrice')}
          placeholder="e.g. 35,000,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Value-Added Tax (VAT)"
          value={data.vat}
          onChange={handleChange('vat')}
          placeholder="e.g. 3,500,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Optional Features / Add-ons"
          value={data.optionalFeatures}
          onChange={handleChange('optionalFeatures')}
          placeholder="e.g. 2,000,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Registration Fees and Taxes"
          value={data.registrationFees}
          onChange={handleChange('registrationFees')}
          placeholder="e.g. 500,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Delivery Charges"
          value={data.deliveryCharges}
          onChange={handleChange('deliveryCharges')}
          placeholder="e.g. 100,000"
          size="small"
        />
        <TextField
          fullWidth
          label="Total Estimated Price"
          value={data.totalPrice}
          onChange={handleChange('totalPrice')}
          placeholder="e.g. 41,100,000"
          size="small"
          sx={{ '& .MuiInputBase-input': { fontWeight: 'bold' } }}
        />

        <Divider />

        {/* Quotation Terms */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Quotation Terms
        </Typography>
        <TextField
          fullWidth
          type="date"
          label="Valid Until"
          value={data.validUntil}
          onChange={handleChange('validUntil')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Divider />

        {/* Dealer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Dealer Information
        </Typography>
        <TextField
          fullWidth
          label="Company Name"
          value={data.dealerCompanyName}
          onChange={handleChange('dealerCompanyName')}
          placeholder="e.g. ABC Motors Ltd."
          size="small"
        />
        <TextField
          fullWidth
          label="Address"
          value={data.dealerAddress}
          onChange={handleChange('dealerAddress')}
          placeholder="e.g. 123 Main St, City, State"
          size="small"
        />
        <TextField
          fullWidth
          label="Contact Person"
          value={data.dealerContactPerson}
          onChange={handleChange('dealerContactPerson')}
          placeholder="e.g. John Doe"
          size="small"
        />
        <TextField
          fullWidth
          label="Phone"
          value={data.dealerPhone}
          onChange={handleChange('dealerPhone')}
          placeholder="e.g. (555) 123-4567"
          size="small"
        />
        <TextField
          fullWidth
          label="Email"
          value={data.dealerEmail}
          onChange={handleChange('dealerEmail')}
          placeholder="e.g. sales@abcmotors.com"
          size="small"
        />

        <Divider />

        {/* Customer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Customer Information
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={data.customerName}
          onChange={handleChange('customerName')}
          placeholder="e.g. Jane Smith"
          size="small"
        />
        <TextField
          fullWidth
          label="Address"
          value={data.customerAddress}
          onChange={handleChange('customerAddress')}
          placeholder="e.g. 456 Oak Ave, City, State"
          size="small"
        />
        <TextField
          fullWidth
          label="Phone"
          value={data.customerPhone}
          onChange={handleChange('customerPhone')}
          placeholder="e.g. (555) 987-6543"
          size="small"
        />
        <TextField
          fullWidth
          label="Email"
          value={data.customerEmail}
          onChange={handleChange('customerEmail')}
          placeholder="e.g. jane.smith@email.com"
          size="small"
        />

        <Divider />

        {/* Date of Issue */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
          Date of Issue
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={data.issueDate}
          onChange={handleChange('issueDate')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Divider />

        {/* Image Edit */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
            Image Edit
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px', color: 'black' }}>
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
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px', color: 'black' }}>
              Dealer Signature
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onImageEdit && onImageEdit('dealerSignature')}
            >
              {editableValues?.['dealerSignature']?.name || 'Upload Signature'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default QuotationEditor;