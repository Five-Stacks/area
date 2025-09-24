import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gettingStartedSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsible: false,
      items: [
        'getting-started/welcome',
        'getting-started/architecture',
        'getting-started/contributing',
      ],
    },
  ],

  guidesSidebar: [
    {
      type: 'category',
      label: '📚 Guides',
      collapsible: false,
      items: [
        'guides/installation',
        // 'guides/deployment',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: '🛠 API Reference',
      collapsible: false,
      items: [
        'api/overview',
        // 'api/endpoints',
      ],
    },
  ],
};

export default sidebars;
