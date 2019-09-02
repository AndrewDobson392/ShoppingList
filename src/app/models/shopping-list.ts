import { ListItem } from './list-item';

export class ShoppingList {
    private listArray: Array<ListItem> = new Array<ListItem>();
    private isCurrent: boolean;

    constructor(isCurrent: boolean) {
        this.isCurrent = isCurrent;
    }

    addItem(itemText: string, id: number) {
        this.listArray.push(new ListItem(itemText, this.isCurrent, id));
    }

    removeItem(item: ListItem) {
        this.listArray = this.listArray.filter(li => li.ItemID !== item.ItemID)
    }

    hasADuplicate(itemName: string): boolean {
        return this.getItemIndex(itemName) >= 0;
    }

    itemHasADuplicate(itemText: string, itemId: number): boolean {
        return this.listArray.
            findIndex(it => it.ItemName === itemText && it.ItemID !== itemId) >= 0
    }

    getItemIndex(itemName: string): number {
        return this.listArray.findIndex(item => item.ItemName === itemName);
    }

    items(): Array<ListItem> {
        return this.listArray;
    }

    moveItemUp(listItem: ListItem) {
        if (listItem.ItemID > 0 && listItem.InCurrentList) {
            let itemIndex = this.getItemIndex(listItem.ItemName);
            if (itemIndex > 0) {
                this.removeItem(listItem);
                this.listArray.splice(itemIndex - 1, 0, listItem);
            }
        }
    }

    moveItemDown(listItem: ListItem) {
        if (listItem.ItemID > 0 && listItem.InCurrentList) {
            let itemIndex = this.getItemIndex(listItem.ItemName);
            if (itemIndex < this.listArray.length - 1) {
                this.removeItem(listItem);
                this.listArray.splice(itemIndex + 1, 0, listItem);
            }
        }
    }
}
