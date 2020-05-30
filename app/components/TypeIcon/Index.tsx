import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotesIcon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add';

type Props = {
  type: string;
};

export default function TypeIcon({ type }: Props) {
  const selectIcon = (iconType: string) => {
    switch (iconType) {
      case '0':
        return <AppsIcon />;
      case '1':
        return <CreditCardIcon />;
      case '2':
        return <LockOpenIcon />;
      case '4':
        return <NotesIcon />;
      default:
        return <AddIcon />;
    }
  };
  return <ListItemIcon>{selectIcon(type)}</ListItemIcon>;
}
