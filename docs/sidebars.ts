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
            'api/auth/isConnected',
            'api/auth/isAdmin',
          ]
        },
        {
            type: 'category',
            label: 'OAuth',
            items: [
                'api/oauth/github',
                'api/oauth/discord',
                'api/oauth/spotify',
                'api/oauth/microsoft',
                'api/oauth/twitter',
            ]
        }
      ],
    },
  ],
};

export default sidebars;
