/* eslint react/jsx-one-expression-per-line: 0, react/jsx-no-bind: 0 */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import AircraftRow from 'molecules/AircraftRow';
import { Aircraft } from 'redux/Planes/types';
import { StyledPanel, Title } from './Panel.style';

interface Props {
  activePlane: string | boolean | null;
  planes: Aircraft[];
  onPlaneSelect: (aircraft: Aircraft) => void;
  onPlaneTraceClear: (aircraft: Aircraft) => void;
  onPlaneTraceToggle: (aircraft: Aircraft) => void;
  onPlaneIconChange: (aircraft: Aircraft) => void;
  onPlaneRename: (aircraft: Aircraft, newName: string) => void;
}

const Panel: React.FunctionComponent<Props> = ({
  planes,
  activePlane,
  onPlaneIconChange,
  onPlaneTraceClear,
  onPlaneTraceToggle,
  onPlaneRename,
  onPlaneSelect,
}) => (
  <StyledPanel>
    <Title>Active Aircraft ({planes.length})</Title>
    <List dense>
      {planes.map(plane => (
        <AircraftRow
          plane={plane}
          key={plane.identifier}
          isFollowed={plane.identifier === activePlane}
          onPlaneSelect={() => onPlaneSelect(plane)}
          onPlaneTraceToggle={() => onPlaneTraceToggle(plane)}
          onPlaneTraceClear={() => onPlaneTraceClear(plane)}
          onPlaneIconChange={() => onPlaneIconChange(plane)}
          onPlaneRename={(newName: string) => onPlaneRename(plane, newName)}
        />
      ))}
      {planes.length === 0 && <ListItem>No planes yet</ListItem>}
    </List>
  </StyledPanel>
);

export default Panel;
