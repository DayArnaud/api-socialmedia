import { Router } from "express";
import { CreateUser } from "./controllers/CreateUser";
import { ListUsers } from "./controllers/ListUsers";
import { ViewOneUser } from "./controllers/ViewOneUser";

const routes = Router();

routes.post("/user", new CreateUser().create);
routes.get("/users", new ListUsers().get);
routes.get("/user/:id", new ViewOneUser().show);

export default routes;
