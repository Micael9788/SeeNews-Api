import { Router } from "express";
import { DocsApiControllers, PrivacidadeApiControllers, SuporteApiControllers } from "@/controllers/html/HtmlApiControllers";
import noticiasPost from "@/controllers/news/NoticiasPostControllers";
import noticiasList from "@/controllers/news/NoticiasGetControllers";
import register from "@/controllers/auth/RegisterApiControllers";
import login from "@/controllers/auth/LoginApiControllers";
import { authentication } from "@/middlewares/check-auth";

const router: Router = Router();


router.post("/api/user/register", register);
router.post("/api/user/login", login);

router.post("/api/news/v1/post", noticiasPost);
router.get("/api/news/v1/list", authentication, noticiasList);

router.get("/api/docs", DocsApiControllers);
router.get("/api/privacidade", PrivacidadeApiControllers);
router.get("/api/suporte", SuporteApiControllers);

export default router;
