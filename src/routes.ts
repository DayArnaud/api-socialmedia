import { Router } from "express";
import { CreateUser } from "./controllers/CreateUser";
import { ListUsers } from "./controllers/ListUsers";
import { ViewOneUser } from "./controllers/ViewOneUser";
import { UpdateUser } from "./controllers/UpdateUser";
import { DisableUser } from "./controllers/DisableUser";
import { CreatePost } from "./controllers/CreatePost";
import { PostsFeed } from "./controllers/PostsFeed";
import { ViewOnePost } from "./controllers/ViewOnePost";
import { UpdatePost } from "./controllers/UpdatePost";
import { DeletePost } from "./controllers/DeletePost";
import { LikePost } from "./controllers/LikePost";
import { AddComment } from "./controllers/AddComment";

const routes = Router();

routes.post("/user", new CreateUser().create);
routes.get("/users", new ListUsers().get);
routes.get("/user/:id", new ViewOneUser().show);
routes.put("/user/:id", new UpdateUser().update);
routes.patch("/user/:id/inactive", new DisableUser().inactive);

routes.post("/post", new CreatePost().create);
routes.get("/posts", new PostsFeed().get);
routes.get("/post/:id", new ViewOnePost().show);
routes.patch("/post/:id", new UpdatePost().update);
routes.delete("/post/:id", new DeletePost().delete);
routes.patch("/post/:id/likes", new LikePost().likePost);
routes.patch("/post/:id/comments", new AddComment().addComment);

export default routes;
