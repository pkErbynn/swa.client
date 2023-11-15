import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { Item } from '../interfaces/item';
import { ItemWithFactorialnumber } from '../interfaces/itemWithFactorial';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiBaseUrl = "http://localhost:5291/api";
  private items: Item[] = [];

  public itemsChanged = new Subject<Item[]>();

  constructor(private http: HttpClient) { }

  setItems(items: Item[]) {
    this.items = items;
    this.itemsChanged.next(this.items.slice());
  }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.apiBaseUrl}/items`).pipe(
      catchError(this.handlingError),
      tap((items) => {
        this.setItems(items);
      })
    );
  }

  private handlingError(errorRes: HttpErrorResponse) {
    let errorMessage = "An error has occurred!";

    if(errorRes.status === 0) {
      errorMessage = "Network connection error"
      return throwError(() => new Error(errorMessage));
    }

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    errorMessage = errorRes?.message
    return throwError(() => new Error(errorMessage));
  }

  addItem(item: Item): void {
    this.http.post<Item>(`${this.apiBaseUrl}/items`, item).subscribe(
      (item) => {
        console.log("POSTED::", item);
        this.items.push(item);
        this.itemsChanged.next(this.items.slice());
      }
    );;
  }

  processItemsConcurrently(): Observable<any> {
    const concurrentProcessingURL = `${this.apiBaseUrl}/items/process-concurrently`;
    return this.http.post<any>(concurrentProcessingURL, {});
  }

  getProcessedItems(): Observable<ItemWithFactorialnumber[]> {
    const processedItemsURL = `${this.apiBaseUrl}/items`;
    return this.http.get<ItemWithFactorialnumber[]>(processedItemsURL);
  }
}
 