import { PlanesState } from './Planes';
import { LayersState } from './Layers';
import { ActivePlaneState } from './ActivePlane';

export type RootState = Readonly<{
  planes: PlanesState;
  layers: LayersState;
  activePlane: ActivePlaneState;
}>;
