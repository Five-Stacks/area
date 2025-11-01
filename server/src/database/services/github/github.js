const newIssueConfig = {
    "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    }
  ]
};

const newPullRequestConfig = {
    "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    }
  ]
};

const newStarConfig = {
    "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    }
  ]
};

const newReleaseConfig = {
    "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    }
  ]
};

const createIssueConfig = {
    "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    },
    {
      "id": 2,
      "mandatory": true,
      "name": "Title",
      "title": "Issue title",
      "input_field": {
        "placeholder": "Bug: unexpected behavior in API"
      }
    },
    {
      "id": 3,
      "mandatory": false,
      "name": "Body",
      "title": "Issue body",
      "input_field": {
        "placeholder": "Describe the issue..."
      }
    },
    {
      "id": 4,
      "mandatory": false,
      "name": "Labels (comma-separated)",
      "title": "Labels (comma-separated)",
      "input_field": {
        "placeholder": "bug, urgent (comma-separated)"
      }
    }
  ]
};

const createPullRequestConfig = {
  "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    },
    {
      "id": 2,
      "mandatory": true,
      "name": "Head Branch (ex: feature/login-fix)",
      "title": "Head branch (ex: feature/login-fix)",
      "input_field": {
        "placeholder": "feature/login-fix"
      }
    },
    {
      "id": 3,
      "mandatory": true,
      "name": "Base Branch (ex: main)",
      "title": "Base branch (ex: main)",
      "input_field": {
        "placeholder": "main"
      }
    },
    {
      "id": 4,
      "mandatory": true,
      "name": "Title",
      "title": "Pull request title",
      "input_field": {
        "placeholder": "Fix login bug"
      }
    },
    {
      "id": 5,
      "mandatory": false,
      "name": "Body",
      "title": "Pull request description",
      "input_field": {
        "placeholder": "What does this PR do?"
      }
    }
  ]
};

const starRepositoryConfig = {
  "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    }
  ]
};

const createReleaseConfig = {
  "fields": [
    {
      "id": 1,
      "mandatory": true,
      "name": "Repository owner/repo (ex: FiveStack/AREA)",
      "title": "Repository owner/repo (ex: FiveStack/AREA)",
      "input_field": {
        "placeholder": "owner/repo (ex: FiveStack/AREA)"
      }
    },
    {
      "id": 2,
      "mandatory": true,
      "name": "Tag Name (ex: v1.2.3)",
      "title": "Tag name (ex: v1.2.3)",
      "input_field": {
        "placeholder": "v1.2.3"
      }
    },
    {
      "id": 3,
      "mandatory": false,
      "name": "Release Name",
      "title": "Release title",
      "input_field": {
        "placeholder": "My awesome release"
      }
    },
    {
      "id": 4,
      "mandatory": false,
      "name": "Body",
      "title": "Release notes",
      "input_field": {
        "placeholder": "Changelog, new features, bug fixes..."
      }
    },
    {
      "id": 5,
      "mandatory": false,
      "name": "Draft (ex: true/false)",
      "title": "Draft (ex: true/false)",
      "input_field": {
        "placeholder": "true/false"
      }
    },
    {
      "id": 6,
      "mandatory": false,
      "name": "Prerelease (ex: true/false)",
      "title": "Prerelease (ex: true/false)",
      "input_field": {
        "placeholder": "true/false"
      }
    }
  ]
};

/* Export action config */
export {
    createIssueConfig,
    createPullRequestConfig,
    starRepositoryConfig,
    createReleaseConfig,
    newIssueConfig,
    newPullRequestConfig,
    newStarConfig,
    newReleaseConfig
};
