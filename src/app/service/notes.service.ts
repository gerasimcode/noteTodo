import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public openNoteModelSub:Subject<boolean>;
  public openFavModelSub:Subject<boolean>;
  public onDelete:Subject<boolean>;

  constructor() { 
    this.openNoteModelSub = new Subject<boolean>();
    this.openFavModelSub = new Subject<boolean>();
    this.onDelete = new Subject<boolean>();
  }


  getLatestNoteId() {
    debugger;
    const isData= localStorage.getItem('noteData');
    if (isData !== null) {
      const parseArray = JSON.parse(isData);
      return parseArray.length +1;
    } else {
      return 1;
    } 
  }
  getLatestFavId() {
    const isData= localStorage.getItem('favData');
    if (isData !== null) {
      const parseArray = JSON.parse(isData);
      return parseArray.length +1;
    } else {
      return 1;
    } 
  }
  addNote(noteObj: any) : Observable<boolean> {
    debugger;
    noteObj.id =  this.getLatestNoteId();
    const isData= localStorage.getItem('noteData');
    if (isData == null) {
      const noteArray= [];
      noteArray.push(noteObj);
      localStorage.setItem('noteData',JSON.stringify(noteArray));
    } else {
      const parseArray = JSON.parse(isData);
      parseArray.push(noteObj);
      localStorage.setItem('noteData',JSON.stringify(parseArray));
    }
    return of(true);
  }

  loadNotes(): Observable<any[]> {
    debugger;
    const isData= localStorage.getItem('noteData');
    if (isData != null) { 
      return of(JSON.parse(isData));
    } else {
      const EmptyArr: any[] = [];
      return of([]);
    }
  }

  deleteNotes(note: any): Observable<boolean> {
    const isData= localStorage.getItem('noteData');
    const parseArry = JSON.parse(isData);
    for (let index = 0; index < parseArry.length; index++) {
      if (note.id == parseArry[index].id) {
        parseArry.splice(index,1);
      }
    }
    localStorage.setItem('noteData',JSON.stringify(parseArry));
    return of(true);
  }

  addFav(favObj: any): Observable<boolean> {
    favObj.id =  this.getLatestFavId();
    const isData= localStorage.getItem('favData');
    if (isData == null) {
      const noteArray= [];
      noteArray.push(favObj);
      localStorage.setItem('favData',JSON.stringify(noteArray));
    } else {
      const parseArray = JSON.parse(isData);
      parseArray.push(favObj);
      localStorage.setItem('favData',JSON.stringify(parseArray));
    }
    return of(true);
  }

  loadFav(): Observable<any []> {
    const isData= localStorage.getItem('favData');
    if (isData != null) { 
      return of(JSON.parse(isData));
    } else { 
      return of([]);
    }
  }

  deleteFav(note: any): Observable<boolean>  {
    debugger;
    const isData= localStorage.getItem('favData');
    const parseArry = JSON.parse(isData);
    for (let index = 0; index < parseArry.length; index++) {
      if (note.id == parseArry[index].id) {
        parseArry.splice(index,1);
      }
    }
    localStorage.setItem('favData',JSON.stringify(parseArry));
    return of (true);
  }
}
