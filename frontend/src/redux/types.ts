import { PlanesState } from './Planes';
import { LayersState } from './Layers';
import { ActivePlaneState } from './ActivePlane';
import { NotamsState } from './Notams';

export type RootState = Readonly<{
  planes: PlanesState;
  layers: LayersState;
  activePlane: ActivePlaneState;
  notams: NotamsState;
}>;
