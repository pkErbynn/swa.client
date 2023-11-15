import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  newItem: string = '';
  itemForm: FormGroup;
  subscription: Subscription = new Subscription;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  
  addItem() {
    if (this.itemForm.valid) {
      const newItem: Item = this.itemForm.value as Item;
      this.itemService.addItem(newItem);
      this.itemForm.reset();
    }    
  }
}
