import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: '../../shared/graphql/server/*.graphql',
    documents: '../../shared/graphql/client/*/**.graphql',
    generates: {
        './generated/types/': {
            preset: 'client',
            presetConfig: { fragmentMasking: false }
        }
    }
}

export default config
