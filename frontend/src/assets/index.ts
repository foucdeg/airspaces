import airliner from './Airliner.svg';
import civil from './Civil.svg';
import fighter from './Fighter.svg';
import helicopter from './Helicopter.svg';

export type IconName = 'airliner' | 'civil' | 'fighter' | 'helicopter';
export type IconsType = { [name in IconName]: string };

const icons: IconsType = {
  airliner,
  civil,
  fighter,
  helicopter,
};

export default icons;
