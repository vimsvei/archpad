// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {IconApiApp, IconCpu, IconServer2} from '@tabler/icons';

// constant
const icons = {
  IconServer2,
  IconApiApp,
  IconCpu
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const technologyLayer = {
  id: 'application-layer',
  title: <FormattedMessage id="technology-layer" />,
  caption: <FormattedMessage id="technology-layer-caption" />,
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'technology-devices',
      title: <FormattedMessage id="technology-devices" />,
      type: 'item',
      url: '/sample-page',
      icon: icons.IconServer2,
    },
    {
      id: 'technology-system-software',
      title: <FormattedMessage id="technology-system-software" />,
      type: 'item',
      url: '/sample-page',
      icon: icons.IconApiApp,
    },
    {
      id: 'technology-equipments',
      title: <FormattedMessage id="technology-equipments" />,
      type: 'item',
      url: '/sample-page',
      icon: icons.IconCpu,
    }
  ]
};

export default technologyLayer;
