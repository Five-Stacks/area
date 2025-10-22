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

  userGuideSidebar: [
    {
      type: 'category',
      label: '👤 User Guide',
      collapsible: false,
      items: [
        'user-guide/overview',
        'user-guide/creating-areas',
        'user-guide/managing-areas',
        'user-guide/web-app',
        'user-guide/mobile-app',
        'user-guide/services',
        'user-guide/faq',
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
        },
        {
          type: 'category',
          label: 'Users management',
          items: [
            'api/users/createUser',
            'api/users/deleteById',
            'api/users/getAll',
            'api/users/getById',
            'api/users/updateById',
          ]
        },
        {
          type: 'category',
          label: 'Services',
          items: [
            'api/service/getAll',
            'api/service/getById',
          ]
        },
        {
          type: 'category',
          label: 'User Services',
          items: [
            'api/userService/getAll',
            'api/userService/getById',
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
