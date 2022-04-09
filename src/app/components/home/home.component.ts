import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {

  noteObj: any;
  favObj: any;
  leftNoteArray: any[];
  rightNoteArray: any[];
  favArray: any[];
  constructor(private noteSrv: NotesService) { 
    this.noteObj = {
      Title: '',
      Details: '',
      Position: '',
      Color: ''
    };
    this.favObj = {
      Title: '',
      Link: '',
      ImageUrl: ''
    };
    this.leftNoteArray = [];
    this.rightNoteArray = [];
    this.favArray = [];
  }

  ngOnInit(): void {
    this.getNotes();
    this.getFav();
  }


  
  getNotes() {
    this.noteSrv.loadNotes().subscribe((result: any[])=>{
      debugger;
      this.leftNoteArray = result.filter((m:any) =>m.Position == 'left');
      this.rightNoteArray = result.filter((m:any) =>m.Position == 'right');
    }); 
  }
  getFav() {
    this.noteSrv.loadFav().subscribe((res:any[])=> {
      this.favArray = res;
    });
  }
  saveNote() {
    debugger;
    this.noteSrv.addNote(this.noteObj).subscribe((res)=> {
      debugger;
        this.getNotes();
        this.closeNoteModel();
    });
  }
  saveFav()  {
    this.noteSrv.addFav(this.favObj).subscribe((res:any)=> {
      this.getFav();
      this.closeFavModel();
    });
  }

  ngAfterViewInit() {
    debugger;
    this.noteSrv.openFavModelSub.subscribe((res:boolean)=>{
       debugger;
      if (res) {
        this.openFavModel();
      }
    })

    this.noteSrv.openNoteModelSub.subscribe((res:boolean)=>{
      debugger;
      if (res) {
        this.openNoteModel();
      }
    })
    this.noteSrv.onDelete.subscribe((res: any)=> {
      debugger;
      this.getNotes();
    this.getFav();
    }) 
  }

  openNoteModel() {
    document.getElementById('modelNote').style.display = 'block';
  }

  openFavModel() {
    document.getElementById('modelFav').style.display = 'block';
  }

  closeNoteModel() {
    document.getElementById('modelNote').style.display = 'none';
  }

  closeFavModel() {
    document.getElementById('modelFav').style.display = 'none';
  }

}
