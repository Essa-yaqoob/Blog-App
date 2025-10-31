import { app } from "./app";
import { dbConnect } from "./config/db.config";

const PORT = process.env.PORT;

dbConnect()
  .then(() => {
    console.log(`DB connected successfully`);
    app.listen(PORT, () => {
      console.log(`Server started on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed", error);
    process.exit(1);
  });
