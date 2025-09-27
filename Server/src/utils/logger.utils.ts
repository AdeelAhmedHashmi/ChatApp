import listEndpoints from "express-list-endpoints";
import app from "../app"; // your express app
import { Router } from "express";

// Print all routes
export default function logger(router: Router) {
  const endpoints = listEndpoints(router);

  console.log("=== All Routes ===");
  endpoints.forEach((endpoint) => {
    endpoint.methods.forEach((method) => {
      console.log(`${method} -> ${endpoint.path}`);
    });
  });
}
