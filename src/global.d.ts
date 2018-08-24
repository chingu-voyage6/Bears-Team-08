declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

declare module "*.module.css" {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;
  export = classNames;
}

declare module "jest-environment-node" {
  export class NodeEnvironment {
    public constext: any;
    public global: any;

    constructor(config: NodeEnvironmentConfig);
    setup(): Promise<void>;
    teardown(): Promise<void>;
    runScript(script: any): any | null;
  }
  export default NodeEnvironment;
}
