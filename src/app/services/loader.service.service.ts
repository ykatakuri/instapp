// Angular
import { Injectable } from "@angular/core";

// Libraries
import { BehaviorSubject } from "rxjs";

// Models
import { Loader } from "../models/loader.interface";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loaders$: BehaviorSubject<Loader[]> = new BehaviorSubject<Loader[]>([]);
  public refreshButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Méthode appelée par le layout pour récupérer les loaders en cours
   */
  public getLoaders(): BehaviorSubject<Loader[]> {
    return this.loaders$;
  }

  /**
   * Permet d'ajouter un loader
   */
  public addLoader(loader: Loader): string {
    loader.id = this.generateLoaderId();
    this.loaders$.next([...this.loaders$.value, loader]);
    return loader.id;
  }

  /**
   * Génère un ID unique
   */
  private generateLoaderId(): string {
    return `${Date.now() + Math.random()}`;
  }

  /**
   * Supprimer un loader manuellement via son id
   */
  public deleteLoaderById(id: string): void {
    const values: Loader[] = this.loaders$.value;
    values.splice(
      values.findIndex((v) => v.id === id),
      1
    );
    this.loaders$.next(values);
  }

  /**
   * Supprime tous les loaders
   */
  public deleteAllLoaders(): void {
    this.loaders$.next([]);
  }

  /**
   * Affiche un message invitant l'utilisateur à rafraichir la page car la requête prend trop de temps à répondre
   */
  private displayTimeOutMessage(loader: Loader): void {
    setTimeout(() => {
      if (this.loaders$.value.find((v) => v.id === loader.id) !== undefined) {
        const loaders: Loader[] = this.loaders$.getValue();
        let data: Loader = loaders.find((v) => v.id === loader.id)!;
        data.message = "The request takes too much time, you should refresh the page.";
        this.loaders$.next(loaders);
        this.refreshButton$.next(true);
      }
    }, 30000);
  }
}
