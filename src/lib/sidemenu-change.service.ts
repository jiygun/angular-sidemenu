import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuChangeService {

  private _sideMenuWidthSource:BehaviorSubject<number>;
  private _sideMenuWidth:Observable<number>;

  constructor() { 
    this._sideMenuWidthSource=new BehaviorSubject(0);
    this._sideMenuWidth=this._sideMenuWidthSource.asObservable();
  }

  setSideMenuWidth(sideMenuWidth:number){
    this._sideMenuWidthSource.next(sideMenuWidth);
  }
  get sideMenuWidth():Observable<number>{
    return this._sideMenuWidth;
  }
}
