import { Component, OnInit, ViewChild } from '@angular/core';
import { ListItem } from 'src/app/models/list-item';
import { MessageBoxComponent } from 'src/app/components/message-box/message-box.component';
import { ShoppingList } from 'src/app/models/shopping-list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  title = 'ShoppingList';
  currentList: ShoppingList = new ShoppingList(true);
  previousList: ShoppingList = new ShoppingList(false);
  itemCounter: number = 1;
  selectedItem: ListItem = new ListItem('', false, -1);
  @ViewChild(MessageBoxComponent, { static: false }) messageBox: MessageBoxComponent;

  ngOnInit() {
    this.previousList.addItem('Milk', this.itemCounter++);
    this.previousList.addItem('Bread', this.itemCounter++);
    this.previousList.addItem('Oranges', this.itemCounter++);
    this.previousList.addItem('Cake', this.itemCounter++);
  }

  onItemAdded(editText: string) {
    if (!this.currentList.hasADuplicate(editText)) {
      this.currentList.addItem(editText, this.itemCounter++)
    }
    else {
      this.messageBox.displayMessage("Item is already in the list");
    }
  }

  onEditedItemSaved(editText: string) {
    if (this.selectedItem.ItemID > 0 && this.selectedItem.InCurrentList) {
      if (!this.currentList.itemHasADuplicate(editText, this.selectedItem.ItemID)) {
        this.selectedItem.ItemName = editText;
      }
      else {
        this.messageBox.displayMessage('There is already an item in the list with that name');
      }
    }
  }

  setRow(selectedItem: ListItem) {
    this.selectedItem = selectedItem;
  }

  removeItem() {
    if (this.selectedItem.ItemID > 0 && this.selectedItem.InCurrentList) {
      this.messageBox.displayYesNoDialogue("Are you sure you want to remove this item?",
        (result: boolean) => {
          if (result) {
            this.currentList.removeItem(this.selectedItem);
            this.selectedItem = new ListItem('', false, -1);
          }
        });
    }
  }

  moveItemUp() {
    this.currentList.moveItemUp(this.selectedItem);
  }

  moveItemDown() {
    this.currentList.moveItemDown(this.selectedItem);
  }

  addItemToCurrentList() {
    if (this.selectedItem.ItemID > 0 && !this.selectedItem.InCurrentList) {
      if (!this.currentList.hasADuplicate(this.selectedItem.ItemName)) {
        this.currentList.addItem(this.selectedItem.ItemName, this.itemCounter++)
      }
      else {
        this.messageBox.displayMessage('You cannot add the same item twice to the current list');
      }
    }
  }
}
