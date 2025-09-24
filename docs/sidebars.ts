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
        'guides/contributing',
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
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'api/auth/register',
            'api/auth/login',
            'api/auth/logout',
          ]
        }
      ],
    },
  ],
};

export default sidebars;
