import { Router } from "express";
import { CreateUser } from "./controllers/CreateUser";
import { ListUsers } from "./controllers/ListUsers";
import { ViewOneUser } from "./controllers/ViewOneUser";
import { UpdateUser } from "./controllers/UpdateUser";
import { DisableUser } from "./controllers/DisableUser";
import { CreatePost } from "./controllers/CreatePost";
import { PostsFeed } from "./controllers/PostsFeed";
import { ViewOnePost } from "./controllers/ViewOnePost";

const routes = Router();

routes.post("/user", new CreateUser().create);
routes.get("/users", new ListUsers().get);
routes.get("/user/:id", new ViewOneUser().show);
routes.put("/user/:id", new UpdateUser().update);
routes.patch("/user/:id/inactive", new DisableUser().inactive);

routes.post("/post", new CreatePost().create);
routes.get("/posts", new PostsFeed().get);
routes.get("/post/:id", new ViewOnePost().show);

export default routes;
