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

export interface PurchaseOrderData {
  // Vehicle Details
  modelName: string;
  year: string;
  vin: string;
  registrationNumber: string;
  mileage: string;
  fuelTransmission: string;
  exteriorInteriorColor: string;
  
  // Order Summary
  basePrice: string;
  vat: string;
  optionalFeatures: string;
  registrationFees: string;
  deliveryCharges: string;
  totalPrice: string;
  
  // Order Terms and Payment
  deposit: string;
  deliveryDate: string;
  deliveryLocation: string;
  titleTransferDate: string;
  
  // Order Conditions
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
  
  // Date of Order
  orderDate: string;
}

interface PurchaseOrderEditorProps {
  data: PurchaseOrderData;
  onChange: (data: PurchaseOrderData) => void;
  onImageEdit?: (elementId: string) => void;
  editableValues?: Record<string, any>;
}

const PurchaseOrderEditor: React.FC<PurchaseOrderEditorProps> = ({ 
  data, 
  onChange,
  onImageEdit,
  editableValues 
}) => {
  const handleChange = (field: keyof PurchaseOrderData) => (
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
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
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
        <TextField
          fullWidth
          label="Exterior / Interior Color"
          value={data.exteriorInteriorColor}
          onChange={handleChange('exteriorInteriorColor')}
          placeholder="e.g. Pearl White / Black Leather"
          size="small"
        />

        <Divider />

        {/* Order Summary */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Order Summary
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
          label="Total Order Price"
          value={data.totalPrice}
          onChange={handleChange('totalPrice')}
          placeholder="e.g. 41,100,000"
          size="small"
          sx={{ '& .MuiInputBase-input': { fontWeight: 'bold' } }}
        />

        <Divider />

        {/* Order Terms and Payment */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Order Terms and Payment
        </Typography>
        <TextField
          fullWidth
          label="Deposit Amount"
          value={data.deposit}
          onChange={handleChange('deposit')}
          placeholder="e.g. 5,000,000"
          size="small"
        />
        <TextField
          fullWidth
          type="date"
          label="Vehicle Delivery Date"
          value={data.deliveryDate}
          onChange={handleChange('deliveryDate')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Delivery Location"
          value={data.deliveryLocation}
          onChange={handleChange('deliveryLocation')}
          placeholder="e.g. ABC Motors Showroom, 123 Main St"
          size="small"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          type="date"
          label="Title Transfer Completion Date"
          value={data.titleTransferDate}
          onChange={handleChange('titleTransferDate')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Divider />

        {/* Order Conditions */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Order Conditions
        </Typography>
        <TextField
          fullWidth
          type="date"
          label="Order Valid Until"
          value={data.validUntil}
          onChange={handleChange('validUntil')}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Divider />

        {/* Dealer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
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
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
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

        {/* Date of Order */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Date of Order
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={data.orderDate}
          onChange={handleChange('orderDate')}
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
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px' }}>
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
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px' }}>
              Customer Signature
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onImageEdit && onImageEdit('customerSignature')}
            >
              {editableValues?.['customerSignature']?.name || 'Upload Signature'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PurchaseOrderEditor;