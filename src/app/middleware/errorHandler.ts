import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const formattedErrors: any = {};
    for (const key in err.errors) {
      const e = err.errors[key];
      formattedErrors[key] = {
        message: e.message,
        name: e.name,
        properties: e.properties,
        kind: e.kind,
        path: e.path,
        value: e.value,
      };
    }

    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors: formattedErrors,
      },
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      success: false,
      error: {
        name: err.name,
        message: err.message,
        path: err.path,
        value: err.value,
      },
    });
  }

  res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err,
  });
};
