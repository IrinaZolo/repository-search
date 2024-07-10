import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.docs.graphql",

  // this assumes that all your source files are in a top-level `src/` directory
  //- you might need to adjust this to your file structure
  //   documents: ["src/**/*.{ts,tsx}"],
  documents: ["src/**/*.gql"],
  config: {
    content:
      "// @generated THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.",
    withHooks: true,
    skipTypename: true,
    immutableTypes: true,
    preResolveTypes: true,
  },
  generates: {
    "src/shared/model/models.gen.ts": {
      plugins: ["add", "typescript"],
    },
    "src/": {
      preset: "near-operation-file",
      plugins: ["add", "typescript-operations"],
      presetConfig: {
        extension: ".gen.ts",
        baseTypesPath: "shared/model/models.gen.ts",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
