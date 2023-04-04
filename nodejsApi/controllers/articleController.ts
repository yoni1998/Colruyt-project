import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/responseService";
import { IArticle } from "../interfaces/index";
import ArticleService from "../services/article_service";

export class ArticleController {
  private article_service: ArticleService = new ArticleService();

  public create_article(req: Request, res: Response) {
    // this check whether all the fields were send through the request or not

    const user_params: IArticle = {
      name: req.body.name,
      title: req.body.title,
      modification_notes: [
        {
          modified_on: new Date(Date.now()),
          modified_by: "",
          modification_note: "New user created",
        },
      ],
    };
    this.article_service.createArticle(user_params);
    successResponse("create article successfull", user_params, res);
  }

  public get_article(req: Request, res: Response) {
    if (req.params.id) {
      const articleId = { _id: req.params.id };
      this.article_service
        .articleOnId(articleId)
        .then((x) => successResponse("get article on id successfull", x, res));
    } else {
      insufficientParameters(res);
    }
  }

  public get_all_articles(req: Request, res: Response) {
    this.article_service
      .findAll()
      .then((x) => successResponse("get all articles successfull", x, res));
  }

  public update_article(req: Request, res: Response) {
    if (req.params.id && req.body.name) {
      const articleId = { _id: req.params.id };
      this.article_service.articleOnId(articleId).then((user_data: any) => {
        const article_params: IArticle = {
          _id: req.params.id,
          name: req.body.name,
          title: req.body.title,
          modification_notes: user_data.modification_notes,
        };
        this.article_service.updateArticle(article_params).then((x) => {
          successResponse("update article successfull", x, res);
        });
      });
    }
  }

  public delete_article(req: Request, res: Response) {
    if (req.params.id) {
      this.article_service.deleteArticle(req.params.id);
      successResponse(
        "delete article successfull with id " + req.params.id,
        null,
        res
      );
    } else {
      insufficientParameters(res);
    }
  }
}
