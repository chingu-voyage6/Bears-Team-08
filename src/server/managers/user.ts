import { UserRepository } from "../repositories";

export class UserManager {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }
}
