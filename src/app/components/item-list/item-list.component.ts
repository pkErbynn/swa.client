import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { ItemWithFactorialnumber } from 'src/app/interfaces/itemWithFactorial';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  processedItems: ItemWithFactorialnumber[] = []; // New array to store processed items
  subscription: Subscription = new Subscription;
  error: string | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.subscription = this.itemService.itemsChanged.subscribe(
      (items: Item[]) => (this.items = items)
    );
    this.loadItems();
  }

  loadItems() { 
    this.subscription = this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (errorMessage)=> {
        this.error = errorMessage;
      }
    });
  }

  processItemsConcurrently() {
    this.itemService.processItemsConcurrently().subscribe({});
    this.loadItemsWithFactorialResult();
  }

  loadItemsWithFactorialResult() {
    this.itemService.getProcessedItems().subscribe((processedItems) => {
      this.processedItems = processedItems;
      console.log("factorial obj::");
      console.log(processedItems);
    });
  }

  onErrorHandle() {
    this.error = undefined;
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
