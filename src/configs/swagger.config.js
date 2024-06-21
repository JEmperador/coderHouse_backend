import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Swagger Documentation for E-Commerce Atlas Tech.",
            description: "App dedicated to the sale of computer components.",
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);