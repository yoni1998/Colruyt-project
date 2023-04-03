import { IArticle } from "../interfaces/index";
import articles from "../models//article.model";

export default class ArticleService {
  public createArticle(article_params: IArticle) {
    const _session = new articles(article_params);
    _session.save();
  }
  public findAll = async () => articles.find();

  public articleOnId = async (id: any) => await articles.findOne(id);

  public updateArticle = async (articles_params: IArticle) => {
    const query = { _id: articles_params._id };
    await articles.findOneAndUpdate(query, articles_params);
  };

  public deleteArticle = async (_id: String) => {
    const query = { _id: _id };
    await articles.deleteOne(query);
  };
}
