import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirmed',
  templateUrl: './get-confirmed.component.html',
  styleUrls: ['./get-confirmed.component.scss']
})
export class GetConfirmedComponent implements OnInit {

  constructor(private matDialogRef:MatDialogRef<GetConfirmedComponent>) { }

  ngOnInit(): void {
  }

  onClose(flag:boolean){
    this.matDialogRef.close(flag)
  }

}
