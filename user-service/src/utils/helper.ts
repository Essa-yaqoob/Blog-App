import DatauriParser from "datauri/parser";

import path from "node:path";

const parser = new DatauriParser();

export const getBuffer = (file: any) => {
  const ext = path.extname(file.originalname).toString();

  return parser.format(ext, file.buffer);
};
