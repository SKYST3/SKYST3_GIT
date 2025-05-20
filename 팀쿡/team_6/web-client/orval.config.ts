// orval --config ./orval.config.ts
export default {
  trynari: {
    input: "https://api-starrynight.luidium.com/swagger.json",
    output: {
      mode: "tags",
      target: "./api/orval/",
      client: "axios",
      schemas: "./api/orval/schemas",
      prettier: true,
    },
  },
};
