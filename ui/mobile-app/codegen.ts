import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../shared/graphql/server/*.graphql',
  documents: '../../shared/graphql/client/*/**.graphql',
  generates: {
    './src/shared/generated/types/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-react-apollo': {
            withHooks: true,
          },
        },
      ],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
