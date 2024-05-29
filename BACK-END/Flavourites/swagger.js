const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Your API Title",
        version: "1.0.0",
        description: "Your API description",
      },
      servers: ["http://localhost:5000/"], // Update with your actual server address
    },
    apis: ["./routes/*"] // Assuming all your routes are in the 'routes' directory with a .js extension
  };
  
  module.exports = swaggerOptions;

  //  http://localhost:5000/api-docs/