import { Database } from "../lib/database";
import { DrawingJSON, ID } from "../entities";
import { NotFoundError } from "../errors";

export type SqlDrawing = {
  id?: ID;
  name?: string;
  user_id?: string;
  width?: number;
  height?: number;
  created_at?: Date;
  updated_at?: Date;
  data?: any;
};

export type SqlDrawingContributor = {
  id?: ID;
  user_id: ID;
  drawing_id: ID;
};

export class DrawingRepository {
  private readonly TABLE: string = "drawing";
  private readonly CONTRIBUTORS_TABLE = "drawing_contributors";
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async find(
    limit: number = 10,
    offset: number = 0
  ): Promise<DrawingJSON[]> {
    const conn = await this.db.getConnection();
    const drawings = await conn
      .table(this.TABLE)
      .orderBy("id")
      .limit(limit)
      .offset(offset);
    const contributors = conn
      .table(this.CONTRIBUTORS_TABLE)
      .where({ drawing_id: drawings.id });
    return drawings.map(this.transform);
  }

  public async findByID(id: ID): Promise<DrawingJSON> {
    const conn = await this.db.getConnection();
    const drawing = await conn
      .table(this.TABLE)
      .where({ id })
      .first();

    if (!drawing) {
      throw new NotFoundError(drawing);
    }

    return this.transform(drawing);
  }

  public async findContributors(id: ID): Promise<ID[]> {
    const conn = await this.db.getConnection();
    const contribs = await conn.table(this.TABLE).where({ drawing_id: id });

    if (!contribs) {
      throw new NotFoundError(contribs);
    }

    return contribs;
  }

  private transform(row: SqlDrawing): DrawingJSON {
    return {
      id: row.id,
      name: row.name,
      width: row.width,
      height: row.height,
      owner: row.user_id,
      contributors: [],
      paints: []
    };
  }
}
