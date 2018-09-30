import { DrawingRepository } from "../repositories";
import { DrawingJSON } from "../entities";

export class DrawingManager {
  private repo: DrawingRepository;

  constructor(repo: DrawingRepository) {
    this.repo = repo;
  }

  public findDrawings = async (
    limit: number = 10,
    offset: number = 0
  ): Promise<DrawingJSON[]> => {
    return this.repo.find(limit, offset);
  };
}
