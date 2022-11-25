// Angular
import { Injectable } from "@angular/core";

// Libraries
import { BehaviorSubject } from "rxjs";

// Models
import { Toast } from "../interfaces/toast.interface";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  public position: "left" | "right" = "right";

  constructor() {}

  /**
   * Méthode appelée par le layout pour récupérer les toasts en cours
   */
  public getToasts(): BehaviorSubject<Toast[]> {
    return this.toasts;
  }

  /**
   * Permet d'ajouter un toast
   */
  public addToast(toast: Toast): void {
    toast.id = this.generateToastId();
    this.toasts.next([...this.toasts.value, toast]);
    this.removeToastWhenTimeIsOver(toast);
  }

  /**
   * Génère un ID unique
   */
  private generateToastId(): string {
    return `${Date.now() + Math.random()}`;
  }

  /**
   * Supprimer un toast manuellement via son id
   */
  public deleteToastById(id: string): void {
    const values: Toast[] = this.toasts.value;
    values.splice(
      values.findIndex((v) => v.id === id),
      1
    );
    this.toasts.next(values);
  }

  /**
   * Supprime le toast de la stack lorsque son timer arrive à échéance
   */
  private removeToastWhenTimeIsOver(toast: Toast): void {
    if (toast.duration > 0) {
      setTimeout(() => {
        if (this.toasts.value.find((v) => v.id === toast.id) !== undefined) {
          const values: Toast[] = this.toasts.value;
          values.splice(
            values.findIndex((v) => v.id === toast.id),
            1
          );
          this.toasts.next(values);
        }
      }, toast.duration + 600);
    }
  }
}
