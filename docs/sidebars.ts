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
            'api/auth/isConnected',
            'api/auth/isAdmin',
          ]
        },
        {
          type: 'category',
          label: 'Action',
          items: [
            'api/action/getAll',
            'api/action/getById',
          ]
        },
        {
          type: 'category',
          label: 'Reaction',
          items: [
            'api/reaction/getAll',
            'api/reaction/getById',
          ]
        },
        {
          type: 'category',
          label: 'Area',
          items: [
            'api/area/add',
            'api/area/getAllCurrentUser',
            'api/area/getById',
            'api/area/updateById',
            'api/area/deleteById',
          ]
        },
        {
          type: 'category',
          label: 'Area Execution',
          items: [
            'api/areaExecution/getAllCurrentUser',
            'api/areaExecution/getById',
          ]
        }
      ],
    },
  ],
};

export default sidebars;
