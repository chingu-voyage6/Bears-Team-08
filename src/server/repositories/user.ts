export class UserRepository {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  public async findByEmail(email: any): Promise<any> {
    return null;
  }
}
