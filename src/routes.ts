import { Router } from "express";
import { CreateUser } from "./controllers/CreateUser";
import { ListUsers } from "./controllers/ListUsers";
import { ViewOneUser } from "./controllers/ViewOneUser";
import { UpdateUser } from "./controllers/UpdateUser";

const routes = Router();

routes.post("/user", new CreateUser().create);
routes.get("/users", new ListUsers().get);
routes.get("/user/:id", new ViewOneUser().show);
routes.put("/user/:id", new UpdateUser().update);

export default routes;
