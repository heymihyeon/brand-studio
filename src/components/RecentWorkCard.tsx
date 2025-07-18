import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  FileCopy as DuplicateIcon,
  Delete as DeleteIcon,
  DriveFileRenameOutline as RenameIcon,
} from '@mui/icons-material';
import { RecentWork } from '../types';

interface RecentWorkCardProps {
  work: RecentWork;
  onEdit: (work: RecentWork) => void;
  onDuplicate: (work: RecentWork) => void;
  onDelete: (work: RecentWork) => void;
  onRename: (work: RecentWork, newName: string) => void;
}

const RecentWorkCard: React.FC<RecentWorkCardProps> = ({
  work,
  onEdit,
  onDuplicate,
  onDelete,
  onRename,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(work.name);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(work);
  };

  const handleDuplicate = () => {
    handleMenuClose();
    onDuplicate(work);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(work);
  };

  const handleRenameClick = () => {
    handleMenuClose();
    setNewName(work.name);
    setRenameDialogOpen(true);
  };

  const handleRename = () => {
    onRename(work, newName);
    setRenameDialogOpen(false);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return '방금 전';
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={work.thumbnail || '/placeholder.png'}
          alt={work.name}
          sx={{ bgcolor: 'grey.200', cursor: 'pointer' }}
          onClick={() => onEdit(work)}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap>
            {work.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {work.category}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(work.lastModified)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            편집
          </Button>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
          >
            <MoreIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {work.canEdit && (
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} fontSize="small" />
            편집
          </MenuItem>
        )}
        {work.canDuplicate && (
          <MenuItem onClick={handleDuplicate}>
            <DuplicateIcon sx={{ mr: 1 }} fontSize="small" />
            복제
          </MenuItem>
        )}
        {work.canRename && (
          <MenuItem onClick={handleRenameClick}>
            <RenameIcon sx={{ mr: 1 }} fontSize="small" />
            이름 바꾸기
          </MenuItem>
        )}
        {work.canDelete && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
            삭제
          </MenuItem>
        )}
      </Menu>

      <Dialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>이름 바꾸기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="새 이름"
            type="text"
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>취소</Button>
          <Button onClick={handleRename} variant="contained">확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecentWorkCard;