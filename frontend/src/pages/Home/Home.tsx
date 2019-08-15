import React, { useState } from 'react';

import classnames from 'classnames';

import Drawer from '@material-ui/core/Drawer/Drawer';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import LayersIcon from '@material-ui/icons/Layers';
import Map from 'organisms/Map';
import Panel from 'organisms/Panel';
import KmlLoaderOverlay from 'organisms/KmlLoaderOverlay';
import Notams from 'organisms/Notams';
import { decodeConfig } from 'services/helpers';

import { MapCanvasWrapper, ButtonsRow } from './Home.style';
import useKeyboardEvent from 'services/hooks/useKeyboardEvent';

const { staticMode = false } = decodeConfig();

const Home: React.FunctionComponent = () => {
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [kmlOverlayVisible, setKmlOverlayVisible] = useState<boolean>(false);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  };

  useKeyboardEvent('Tab', togglePanel);

  return (
    <React.Fragment>
      <MapCanvasWrapper className={classnames({ shrinked: panelOpen })}>
        <Map />
        {!staticMode && (
          <ButtonsRow>
            <Tooltip title="Configure map layers">
              <Button size="small" variant="contained" onClick={() => setKmlOverlayVisible(true)}>
                <LayersIcon />
              </Button>
            </Tooltip>
            <Tooltip title={panelOpen ? 'Hide panel' : 'Show panel'}>
              <Button size="small" variant="contained" color="primary" onClick={togglePanel}>
                <MenuIcon />
              </Button>
            </Tooltip>
          </ButtonsRow>
        )}
      </MapCanvasWrapper>
      {!staticMode && (
        <Drawer variant="persistent" anchor="right" open={panelOpen}>
          <Panel />
        </Drawer>
      )}
      {!staticMode && (
        <KmlLoaderOverlay visible={kmlOverlayVisible} onClose={() => setKmlOverlayVisible(false)} />
      )}
      {!staticMode && <Notams />}
    </React.Fragment>
  );
};

export default Home;
