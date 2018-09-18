import * as Modules from "./modules";
import * as Config from "./config";
import { Authenticator, JWTAuthenticator } from "./lib/authentication";
import { BCryptHasher } from "./lib/crypto";
import { Database, Configuration } from "./lib/database";
import { UserManager } from "./managers";
import { UserRepository } from "./repositories";
import { baseLogger, Logger } from "./lib/logger";

export type ApplicationConfig = {
  dbConfig: Configuration;
  secretKey: string;
};

export class Application {
  public database: Database;
  public webLogger: Logger;
  public errorLogger: Logger;
  public repositories: {
    user: UserRepository;
  };
  public managers: {
    user: UserManager;
  };
  public lib: {
    authenticator: Authenticator;
    hasher: BCryptHasher;
  };
  public components: Modules.ModuleFn[];

  private config: ApplicationConfig;

  constructor(config: ApplicationConfig) {
    this.config = config;
    this.components = [];
    this.webLogger = baseLogger.child({ name: "Web Logs" });
    this.errorLogger = baseLogger.child({ name: "Error logs" });
  }

  public async init(): Promise<Application> {
    this.database = new Database(this.config.dbConfig);

    // initialize repositories
    this.repositories = {
      user: new UserRepository(this.database)
    };

    // initialize libs
    this.lib = {
      authenticator: new JWTAuthenticator(
        this.repositories.user,
        this.config.secretKey
      ),
      hasher: new BCryptHasher(10)
    };

    // initialize managers
    this.managers = {
      user: new UserManager(
        this.repositories.user,
        this.lib.hasher,
        this.lib.authenticator
      )
    };

    // create components
    this.components.push(Modules.userModule(this));

    return this;
  }

  public async shutdown(): Promise<void> {
    await this.database.close();
  }
}
