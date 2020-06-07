import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import CreditCardSharpIcon from '@material-ui/icons/CreditCardSharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import PermIdentitySharpIcon from '@material-ui/icons/PermIdentitySharp';
import NotesIcon from '@material-ui/icons/Notes';
import AddSharpIcon from '@material-ui/icons/AddSharp';
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
        return <CreditCardSharpIcon />;
      case Names.LOGIN_INFO:
        return <LockOpenSharpIcon />;
      case Names.SECURE_NOTE:
        return <NotesIcon />;
      case Names.ADD_BUTTON:
        return <AddSharpIcon />;
      case Names.IDENTITY:
        return <PermIdentitySharpIcon />;
      default:
        return null;
    }
  };
  return <ListItemIcon>{selectIcon(type)}</ListItemIcon>;
}
