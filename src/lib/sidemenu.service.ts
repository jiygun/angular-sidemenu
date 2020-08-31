import { Injectable } from '@angular/core';
import { SideMenuChangeService } from './sidemenu-change.service';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  private _isClick:boolean;
  private _isMove:boolean;

  private _isOpen:boolean;

  private _locationX:number;
  private _moveLocationX:number;
  private _clientX:number;
  private _differenceLocation:number;

  private _sideMenuIndex:number;
  private _sideMenu:HTMLElement;

  constructor(private sideMenuService:SideMenuChangeService) {
    this._sideMenuIndex=2;
    this._isClick=false;
    this._isMove=false;
  }
  ngAfterViewInit(): void {
    this._isOpen?this._sideMenu.style.transform=`translate3d(${0}%, 0px, 0px)`:this._sideMenu.style.transform=`translate3d(${-100}%, 0px, 0px)`;
    let sizeOfSideMenu:number=Math.sin(((this._sideMenuIndex*90/window.innerWidth)*100>60?60:(this._sideMenuIndex*90/window.innerWidth*100))*Math.PI/180)*100;
    this._sideMenu.style.width=sizeOfSideMenu+"%";
  }
  onMouseDown($event){
    this._locationX=$event.clientX;
    this._isClick=true;
    Math.abs(parseInt(window.getComputedStyle(this._sideMenu).getPropertyValue('transform').split(',')[4]))==0?this._isOpen=true:this._isOpen=false;
  }
  onMouseMove($event){
    $event.stopPropagation();
    this._isClick?this._isMove=true:null;
    if(this._isClick==true&&this._isMove==true){
      this._clientX=$event.clientX>=window.innerWidth?window.innerWidth:$event.clientX;
      this._differenceLocation=this._locationX-this._clientX;
      this._moveLocationX=(this._locationX-this._clientX)/window.innerWidth*100;
      if(this._differenceLocation<=0&&!this._isOpen){
        this._sideMenu.style.transform=`translate3d(${-this._moveLocationX-100}%, 0px, 0px)`;
        this.sideMenuService.setSideMenuWidth(-this._moveLocationX*this._sideMenu.clientWidth/window.innerWidth);
      }else if(this._differenceLocation>0&&this._isOpen){
        this._sideMenu.style.transform=`translate3d(${0-this._moveLocationX}%, 0px, 0px)`;
        this.sideMenuService.setSideMenuWidth(this._sideMenu.clientWidth*100/window.innerWidth-this._moveLocationX*this._sideMenu.clientWidth/window.innerWidth);
      }
    }
  }
  onMouseUp($event){
    if(this._isClick==true&&this._isMove==true) this.setNavbar();
    this._isClick=false;
    this._isMove=false;
  }
  private setNavbar(){
    if(this._isOpen&&(this._differenceLocation>0)){
      this._sideMenu.style.transform=`translate3d(${-100}%, 0px, 0px)`
      this.sideMenuService.setSideMenuWidth(0);
    }else if(this._moveLocationX+100<95||(this._isOpen&&this._differenceLocation<0)){
      this._sideMenu.style.transform=`translate3d(${0}%, 0px, 0px)`;
      this.sideMenuService.setSideMenuWidth(this._sideMenu.clientWidth*100/window.innerWidth);
    }else{
      this._sideMenu.style.transform=`translate3d(${-100}%, 0px, 0px)`;
      this.sideMenuService.setSideMenuWidth(0);
    }
  }
  onResize($event){
    let tempWindowWidth:number;
    tempWindowWidth=tempWindowWidth==null||tempWindowWidth==undefined?window.innerWidth:tempWindowWidth;
    Math.abs(parseInt(window.getComputedStyle(this._sideMenu).getPropertyValue('transform').split(',')[4]))==0?this._isOpen=true:this._isOpen=false;
    let sizeOfSideMenu:number=Math.sin(((this._sideMenuIndex*90/window.innerWidth)*100>60?60:(this._sideMenuIndex*90/window.innerWidth)*100)*Math.PI/180)*100;
    this._sideMenu.style.width=sizeOfSideMenu+"%";
    if(this._isOpen) this.sideMenuService.setSideMenuWidth(sizeOfSideMenu);
    tempWindowWidth=window.innerWidth;
  }
  getStyles(){
    return{
        transform:"translate3d(-100%, 0px, 0px)",
        display:"flex",
        height:"100vh",
        position:"fixed",
        top: "0",
        left: "0",
    }
  }
  set sideMenu(sideMenu:HTMLElement){
    this._sideMenu=sideMenu;
  }
  set sideMenuSize(sideMenuSize:number){
    this._sideMenuIndex=sideMenuSize<1?1:sideMenuSize>4?4:sideMenuSize;
  }
  get isOpen():boolean{
    return this._isOpen;
  }
  set isOpen(isOpen:boolean){
    isOpen?this._sideMenu.style.transform=`translate3d(${0}%, 0px, 0px)`:this._sideMenu.style.transform=`translate3d(${-100}%, 0px, 0px)`;
    this._isOpen=isOpen;
  }
}
