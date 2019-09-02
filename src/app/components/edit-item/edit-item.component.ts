import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { ListItem } from 'src/app/models/list-item';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EdititemComponent implements OnInit {

  editText: string;

  @Input() isEdit:boolean;
  @Input() editItem: ListItem;
  @Output() saved: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MessageBoxComponent, { static: false }) messageBox: MessageBoxComponent;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {    
  }

  openEditDialogue(content) {
    if(!this.isEdit){
      this.editText=''
    }
    else{
      if( !this.editItem.InCurrentList || this.editItem.ItemID < 0){
        this.messageBox.displayMessage('You must select an item to edit from the current list')
        return;
      }
      else{
        this.editText = this.editItem.ItemName;
      }
    }
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.saved.emit(this.editText);
    }, (reason) => {});
  }
}
