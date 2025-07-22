import React from 'react';
import {
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface VehicleItem {
  id: string;
  modelType: string;
  color: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

export interface PurchaseOrderData {
  // Order Information
  poNumber: string;
  orderDate: string;
  deliveryDate: string;
  deliveryLocation: string;
  paymentTerms: string;
  shippingMethod: string;
  
  // Vehicle Items
  items: VehicleItem[];
  
  // Price Summary
  subtotal: string;
  tax: string;
  shippingHandling: string;
  totalAmount: string;
  
  // Special Instructions
  specialInstructions: string;
  
  // Buyer Information
  buyerCompany: string;
  buyerDepartment: string;
  buyerAddress: string;
  buyerContactPerson: string;
  buyerPhone: string;
  buyerEmail: string;
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

  const handleItemChange = (index: number, field: keyof VehicleItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...data.items];
    newItems[index] = {
      ...newItems[index],
      [field]: event.target.value,
    };
    
    // Calculate total price when quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? event.target.value : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? event.target.value : newItems[index].unitPrice;
      const quantityNum = parseInt(quantity) || 0;
      const unitPriceNum = parseInt(unitPrice.replace(/,/g, '')) || 0;
      newItems[index].totalPrice = (quantityNum * unitPriceNum).toLocaleString();
    }
    
    onChange({ ...data, items: newItems });
    
    // Recalculate totals
    calculateTotals(newItems);
  };

  const addItem = () => {
    const newItem: VehicleItem = {
      id: Date.now().toString(),
      modelType: '',
      color: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
    calculateTotals(newItems);
  };

  const calculateTotals = (items: VehicleItem[]) => {
    const subtotal = items.reduce((sum, item) => {
      const total = parseInt(item.totalPrice.replace(/,/g, '')) || 0;
      return sum + total;
    }, 0);
    
    const taxAmount = Math.round(subtotal * 0.1);
    const shipping = parseInt(data.shippingHandling.replace(/,/g, '')) || 0;
    const total = subtotal + taxAmount + shipping;
    
    onChange({
      ...data,
      subtotal: subtotal.toLocaleString(),
      tax: taxAmount.toLocaleString(),
      totalAmount: total.toLocaleString(),
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
        {/* Order Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Order Information
        </Typography>
        <TextField
          fullWidth
          label="Purchase Order Number"
          value={data.poNumber}
          onChange={handleChange('poNumber')}
          placeholder="e.g. PO-2024-0001"
          size="small"
        />
        <TextField
          fullWidth
          type="date"
          label="Order Date"
          value={data.orderDate}
          onChange={handleChange('orderDate')}
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          fullWidth
          type="date"
          label="Requested Delivery Date"
          value={data.deliveryDate}
          onChange={handleChange('deliveryDate')}
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          fullWidth
          label="Delivery Location"
          value={data.deliveryLocation}
          onChange={handleChange('deliveryLocation')}
          placeholder="e.g. Main Warehouse, 123 Industrial Ave"
          size="small"
        />
        <TextField
          fullWidth
          label="Payment Terms"
          value={data.paymentTerms}
          onChange={handleChange('paymentTerms')}
          placeholder="e.g. Net 30 days"
          size="small"
        />
        <TextField
          fullWidth
          label="Shipping Method"
          value={data.shippingMethod}
          onChange={handleChange('shippingMethod')}
          placeholder="e.g. Carrier transport"
          size="small"
        />

        <Divider />

        {/* Vehicle Specifications */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Vehicle Specifications
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addItem}
              size="small"
              variant="outlined"
            >
              Add Item
            </Button>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item No.</TableCell>
                  <TableCell>Model/Type</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price (KRW)</TableCell>
                  <TableCell>Total Price (KRW)</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        value={item.modelType}
                        onChange={handleItemChange(index, 'modelType')}
                        placeholder="e.g. Sonata DN8"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.color}
                        onChange={handleItemChange(index, 'color')}
                        placeholder="e.g. White"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.quantity}
                        onChange={handleItemChange(index, 'quantity')}
                        placeholder="0"
                        size="small"
                        type="number"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.unitPrice}
                        onChange={handleItemChange(index, 'unitPrice')}
                        placeholder="0"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => removeItem(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Price Summary */}
        <Box sx={{ mt: 2 }}>
          <Stack spacing={1} sx={{ ml: 'auto', width: 300 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="bold">₩ {data.subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tax (10%):</Typography>
              <Typography>₩ {data.tax}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Shipping & Handling:</Typography>
              <TextField
                value={data.shippingHandling}
                onChange={handleChange('shippingHandling')}
                size="small"
                sx={{ width: 150 }}
              />
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography fontWeight="bold">Total Amount:</Typography>
              <Typography fontWeight="bold" color="primary">₩ {data.totalAmount}</Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* Special Instructions */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Special Instructions
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={data.specialInstructions}
          onChange={handleChange('specialInstructions')}
          placeholder="Enter any special requirements or instructions..."
          size="small"
        />

        <Divider />

        {/* Buyer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Buyer Information
        </Typography>
        <TextField
          fullWidth
          label="Company Name"
          value={data.buyerCompany}
          onChange={handleChange('buyerCompany')}
          placeholder="e.g. ABC Motors Ltd."
          size="small"
        />
        <TextField
          fullWidth
          label="Department"
          value={data.buyerDepartment}
          onChange={handleChange('buyerDepartment')}
          placeholder="e.g. Purchasing Department"
          size="small"
        />
        <TextField
          fullWidth
          label="Address"
          value={data.buyerAddress}
          onChange={handleChange('buyerAddress')}
          placeholder="e.g. 123 Business St, City, State"
          size="small"
        />
        <TextField
          fullWidth
          label="Contact Person"
          value={data.buyerContactPerson}
          onChange={handleChange('buyerContactPerson')}
          placeholder="e.g. John Smith"
          size="small"
        />
        <TextField
          fullWidth
          label="Phone"
          value={data.buyerPhone}
          onChange={handleChange('buyerPhone')}
          placeholder="e.g. (02) 1234-5678"
          size="small"
        />
        <TextField
          fullWidth
          label="Email"
          value={data.buyerEmail}
          onChange={handleChange('buyerEmail')}
          placeholder="e.g. purchasing@abcmotors.com"
          size="small"
        />

        <Divider />

        {/* Image Edit */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Image Edit
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px' }}>
              Company Logo
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onImageEdit && onImageEdit('companyLogo')}
            >
              {editableValues?.['companyLogo']?.name || 'Upload Logo'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: '4px' }}>
              Authorized Signature
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onImageEdit && onImageEdit('authorizedSignature')}
            >
              {editableValues?.['authorizedSignature']?.name || 'Upload Signature'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PurchaseOrderEditor;