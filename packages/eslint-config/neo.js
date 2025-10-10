import neo from 'neostandard';

export const config = [
  ...neo({
    ts: true,
    semi: true,
    ignores: ['.turbo', 'dist', 'node_modules']
  }),
  {
    rules: {
      'import-x/order': [
        'warn',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'internal', 'external', 'sibling', 'parent', 'index', 'type'],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
];
