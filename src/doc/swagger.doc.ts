import { Express } from "express";
import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
      version: '1.0.0',
      title: "Mon Petit Gazon Backend API",
      description: "Test technique backend pour Mon Petit Gazon"
  },
  baseDir: __dirname,
  // On analyse tous les fichiers du projet
  filesPattern: ['../**/**/*.ts'],
  // URL où sera disponible la page de documentation
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE ?? '/docs',
  // Activation de la documentation à travers une route de l'API
  exposeApiDocs: true,
  apiDocsPath: '/api/docs',
};

export default (app: Express) => expressJSDocSwagger(app)(options);