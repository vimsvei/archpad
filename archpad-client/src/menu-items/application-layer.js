// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {IconComponents, IconKey, IconBug, Icon3dCubeSphere} from '@tabler/icons';

// constant
const icons = {
  Icon3dCubeSphere,
  IconComponents
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const applicationLayer = {
  id: 'application-layer',
  title: <FormattedMessage id="application-layer" />,
  caption: <FormattedMessage id="application-layer-caption" />,
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'application-components',
      title: <FormattedMessage id="application-components" />,
      type: 'item',
      url: '/sample-page',
      icon: icons.IconComponents,
    },
    {
      id: 'application-services',
      title: <FormattedMessage id="application-services" />,
      type: 'item',
      url: '/sample-page',
      icon: icons.Icon3dCubeSphere,
    }
  ]
};

export default applicationLayer;
