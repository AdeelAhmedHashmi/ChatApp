import { Response, Request, NextFunction } from "express";
import { ZodSchema } from "zod";

const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = await schema.safeParseAsync(req.body);

    console.log(req.body);
    if (error) {
      let errors: Array<{ field: string; error: string }> = [];

      for (let issue of error.issues) {
        console.log(issue.message, issue.path);
        errors.push({
          field: issue.path[0] as string,
          error: issue.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: "invalid data formate!",
        data: errors,
      });
    }

    req.body.data = data;
    next();
  };

export default validate;
