import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() fav: any;
  constructor(private noteSrv: NotesService) { }

  ngOnInit(): void {
  }
  onDelete(fav: any) {
    debugger;
    this.noteSrv.deleteFav(fav).subscribe((res:any)=> {
      this.noteSrv.onDelete.next(true);
    });
  }

}
