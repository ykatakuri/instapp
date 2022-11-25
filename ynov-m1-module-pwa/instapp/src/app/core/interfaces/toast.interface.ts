export interface Toast {
  id?: string;
  duration: number;
  message: string;
  button?: string;
  type: "info" | "success" | "warning" | "error" | "normal";
}
