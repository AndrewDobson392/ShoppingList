import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  messageText: string;
  isYesNo: boolean;
  @ViewChild('messageboxContent', { static: false }) content: TemplateRef<NgbModal>;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  displayMessage(message: string) {
    this.isYesNo = false;
    this.messageText = message;
    this.modalService.open(this.content);
  }

  displayYesNoDialogue(message: string, callback: (isYes: boolean) => void) {
    this.isYesNo = true;
    this.messageText = message;
    this.modalService.open(this.content).result.then((result) => {
      callback(true);
    }, (reason) => {
      callback(false);
    });
  }

}
