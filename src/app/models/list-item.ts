export class ListItem {
    ItemID: number;
    ItemName: string;
    InCurrentList: boolean;
    HighPriority: boolean;
   
    constructor(itemName:string, inCurrentList: boolean, itemId: number){
        this.ItemName = itemName;
        this.InCurrentList = inCurrentList;
        this.ItemID = itemId;
    }
}
