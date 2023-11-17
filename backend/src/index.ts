import * as dotenv from "dotenv";
import express from "express";
import { context, migrate } from "./data/context";
import { UserService } from "./services/userService";
import { UserRepository } from "./data/repositories/userRepository";
import { ValidationService } from "./services/validationService";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

migrate();

const userService = new UserService(
  new UserRepository(context),
  new ValidationService()
);

app.post("/api/users", async (req, res) => {
  console.log("Received request on /api/users with body:");
  console.log(req.body);

  try {
    await userService.createUser(req.body);
  } catch (e) {
    res.status(400);
    res.send(
      JSON.stringify({
        status: "request body contains errors.",
      })
    );
    return;
  }
  res.status(200);
  res.send(
    JSON.stringify({
      status: "successfully created a new user.",
    })
  );
});

app.listen(PORT, async () => {
  console.log(`listning on port ${PORT}`);
});
