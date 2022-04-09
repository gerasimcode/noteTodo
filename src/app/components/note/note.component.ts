import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: any;
  constructor(private noteSrv: NotesService) { }

  ngOnInit(): void {
  }
  delete(note: any) {
    this.noteSrv.deleteNotes(note).subscribe((res:any)=> {
      debugger;
      this.noteSrv.onDelete.next(true);
    });
  }

}
