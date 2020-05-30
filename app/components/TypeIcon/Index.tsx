import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotesIcon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add';
import Names from '../../constants/names.json';

type Props = {
  type: string;
};

export default function TypeIcon({ type }: Props) {
  const selectIcon = (iconType: string) => {
    switch (iconType) {
      case Names.ALL:
        return <AppsIcon />;
      case Names.CREDIT_CARD:
        return <CreditCardIcon />;
      case Names.LOGIN_INFO:
        return <LockOpenIcon />;
      case Names.SECURE_NOTE:
        return <NotesIcon />;
      case Names.ADD_BUTTON:
        return <AddIcon />;
      default:
        return <AddIcon />;
    }
  };
  return <ListItemIcon>{selectIcon(type)}</ListItemIcon>;
}
