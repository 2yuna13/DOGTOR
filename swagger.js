const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    title: "dogtor",
    description: "insa",
  },
  host: "localhost:5000",
  schemas: ["http"],
};

const outputFile = "./swagger-output.json"; // 같은 위치에 swagger-output.json을 만든다.
const endpointsFiles = [
  "./src/app.ts", // 라우터가 명시된 곳을 지정해준다.
];

swaggerAutogen(outputFile, endpointsFiles, doc);
