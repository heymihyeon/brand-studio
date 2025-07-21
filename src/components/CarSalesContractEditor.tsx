import React from 'react';
import {
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
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
}

const CarSalesContractEditor: React.FC<CarSalesContractEditorProps> = ({ 
  data, 
  onChange 
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
    <Paper sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
      <Stack spacing={2}>
        {/* Vehicle Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          차량 정보
        </Typography>
        <TextField
          fullWidth
          label="등록번호"
          value={data.registrationNumber}
          onChange={handleChange('registrationNumber')}
          placeholder="예: 12가 3456"
          size="small"
        />
        <TextField
          fullWidth
          label="모델명"
          value={data.modelName}
          onChange={handleChange('modelName')}
          placeholder="예: Sonata DN8"
          size="small"
        />
        <TextField
          fullWidth
          label="연식"
          value={data.year}
          onChange={handleChange('year')}
          placeholder="예: 2024"
          size="small"
        />
        <TextField
          fullWidth
          label="차대번호 (VIN)"
          value={data.vin}
          onChange={handleChange('vin')}
          placeholder="예: KMHL14JA6PA123456"
          size="small"
        />

        <Divider />

        {/* Sales Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          판매 정보
        </Typography>
        <TextField
          fullWidth
          label="판매가격"
          value={data.salesPrice}
          onChange={handleChange('salesPrice')}
          placeholder="예: 35,000,000원"
          size="small"
        />
        <TextField
          fullWidth
          label="지불조건"
          value={data.paymentTerms}
          onChange={handleChange('paymentTerms')}
          placeholder="예: 계약금 10%, 잔금 90%"
          size="small"
          multiline
          rows={2}
        />

        <Divider />

        {/* Seller Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          판매자 정보 (갑)
        </Typography>
        <TextField
          fullWidth
          label="성명"
          value={data.sellerName}
          onChange={handleChange('sellerName')}
          placeholder="예: 홍길동"
          size="small"
        />
        <TextField
          fullWidth
          label="주소"
          value={data.sellerAddress}
          onChange={handleChange('sellerAddress')}
          placeholder="예: 서울시 강남구 테헤란로 123"
          size="small"
        />
        <TextField
          fullWidth
          label="연락처"
          value={data.sellerContact}
          onChange={handleChange('sellerContact')}
          placeholder="예: 010-1234-5678"
          size="small"
        />

        <Divider />

        {/* Buyer Information */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          구매자 정보 (을)
        </Typography>
        <TextField
          fullWidth
          label="성명"
          value={data.buyerName}
          onChange={handleChange('buyerName')}
          placeholder="예: 김철수"
          size="small"
        />
        <TextField
          fullWidth
          label="주소"
          value={data.buyerAddress}
          onChange={handleChange('buyerAddress')}
          placeholder="예: 서울시 서초구 반포대로 123"
          size="small"
        />
        <TextField
          fullWidth
          label="연락처"
          value={data.buyerContact}
          onChange={handleChange('buyerContact')}
          placeholder="예: 010-9876-5432"
          size="small"
        />

        <Divider />

        {/* Agreement Date */}
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          계약일
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
      </Stack>
    </Paper>
  );
};

export default CarSalesContractEditor;