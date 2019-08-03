import React, { useState } from 'react';
import classnames from 'classnames';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShowChartsIcon from '@material-ui/icons/ShowChart';
import ClearIcon from '@material-ui/icons/Clear';

import EditableText from 'molecules/EditableText';
import { ICONS } from 'services/constants';
import { Aircraft } from 'redux/Planes/types';

import { StyledRow } from './AircraftRow.style';

interface Props {
  isFollowed: boolean;
  onPlaneSelect: () => void;
  onPlaneIconChange: () => void;
  onPlaneTraceToggle: () => void;
  onPlaneTraceClear: () => void;
  onPlaneRename: (newName: string) => void;
  plane: Aircraft;
}

const makeFloat = (float: number) =>
  (float || 0).toLocaleString('en-us', { maximumFractionDigits: 0 });

const makeSubtext = (alt: number, heading: number, speed: number) =>
  `${makeFloat(alt)} ft • ${makeFloat(heading)}° • GS ${makeFloat(speed)} kts`;

const PlaneRow: React.FunctionComponent<Props> = ({
  plane,
  onPlaneSelect,
  onPlaneTraceToggle,
  onPlaneRename,
  onPlaneIconChange,
  onPlaneTraceClear,
  isFollowed,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { icon, altitude, heading, speed, name } = plane;
  return (
    <StyledRow
      button
      onClick={() => onPlaneSelect()}
      className={classnames({ followed: isFollowed })}
    >
      <ListItemAvatar>
        <Avatar onClick={onPlaneIconChange} src={ICONS[icon]} />
      </ListItemAvatar>
      <ListItemText
        primary={<EditableText value={name} onSubmit={onPlaneRename} />}
        secondary={makeSubtext(altitude, heading, speed)}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="More" aria-haspopup="true" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={!!anchorEl} onClose={handleMenuClose} anchorEl={anchorEl}>
          <MenuItem
            dense
            onClick={() => {
              handleMenuClose();
              onPlaneTraceToggle();
            }}
          >
            <ListItemIcon>
              <ShowChartsIcon />
            </ListItemIcon>
            <ListItemText primary={`${plane.isTraceActive ? 'Hide' : 'Show'} Trace`} />
          </MenuItem>
          <MenuItem
            dense
            onClick={() => {
              handleMenuClose();
              onPlaneTraceClear();
            }}
          >
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Clear Trace" />
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </StyledRow>
  );
};

export default PlaneRow;
