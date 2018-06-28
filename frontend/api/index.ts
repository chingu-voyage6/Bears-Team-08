import { Drawing } from "../shared/drawing";
import { Paint } from "../shared/paint";

export const login = async (): Promise<any> => {
  return Promise.resolve(0);
};

export const loadDrawing = async (uuid: string): Promise<Drawing> => {
  // axios("/api", { header: { AuthoSTuff: `Bearer ${user.token}` } });
  return new Drawing();
};

export const saveDrawing = async (drawing: Drawing): Promise<null> => {
  return;
};

export const addPaint = async (paint: Paint): Promise<null> => {
  return;
};

export const updatePaint = async (req: {
  index: number;
  fn: (paint: Paint) => Paint;
}): Promise<null> => {
  return;
};

export const deletePaint = async (id: number): Promise<null> => {
  return;
};

export const redo = async (): Promise<null> => {
  return;
};

export const undo = async (): Promise<null> => {
  return;
};
