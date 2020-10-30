import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SideMenuChangeService } from './sidemenu-change.service';

@Component({
  selector: 'angular-sidemenu',
  templateUrl: './angular-sidemenu.component.html',
  styleUrls: ['./angular-sidemenu.component.scss'],
  host:{'(window:mousedown)':'onMouseDown($event)',"(window:mousemove)":"onMouseMove($event)","(window:mouseup)":"onMouseUp($event)","(window:resize)":"onResize($event)"}
})
export class AngularSideMenuComponent implements OnInit,AfterViewInit,OnChanges {
    
  private _isOpen:boolean;

  private _isClick:boolean;
  private _isMove:boolean;

  private _locationX:number;
  private _moveLocationX:number;
  private _clientX:number;
  private _differenceLocation:number;

  private _sideMenuIndex:number;

  @Input() sideMenuIndex:number;
  @Input() isOpen:boolean;

  constructor(private sideMenu:ElementRef,private sideMenuService:SideMenuChangeService) { 
    this._sideMenuIndex=2;
    this._isClick=false;
    this._isMove=false;
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let sizeOfSideMenu:number=Math.sin(((this._sideMenuIndex*90/window.innerWidth)*100>60?60:(this._sideMenuIndex*90/window.innerWidth*100))*Math.PI/180)*100;
    this.sideMenu.nativeElement.style.width=sizeOfSideMenu+"%";
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.sideMenuIndex!=undefined){
      if(changes.sideMenuIndex.currentValue!=changes.sideMenuIndex.previousValue){
        this._sideMenuIndex=changes.sideMenuIndex.currentValue<1?1:changes.sideMenuIndex.currentValue>4?4:changes.sideMenuIndex.currentValue;
        let sizeOfSideMenu:number=Math.sin(((this._sideMenuIndex*90/window.innerWidth)*100>60?60:(this._sideMenuIndex*90/window.innerWidth)*100)*Math.PI/180)*100;
        this.sideMenu.nativeElement.style.width=sizeOfSideMenu+"%";
        if(this._isOpen){
          this.sideMenuService.setSideMenuWidth(sizeOfSideMenu);
        }
      }
    }
    if(changes.isOpen!=undefined){
      if(changes.isOpen.currentValue!=changes.isOpen.previousValue){
        this._isOpen=changes.isOpen.currentValue;
        if(this._isOpen){
          this.sideMenu.nativeElement.style.transform=`translate3d(${0}%, 0px, 0px)`;
          this.sideMenuService.setSideMenuWidth(this.sideMenu.nativeElement.clientWidth*100/window.innerWidth);
        }else{
          this.sideMenu.nativeElement.style.transform=`translate3d(${-100}%, 0px, 0px)`;
          this.sideMenuService.setSideMenuWidth(0);
        }
      }
    }
  }
  onMouseDown($event){
    this._locationX=$event.clientX;
    this._isClick=true;
    Math.abs(parseInt(window.getComputedStyle(this.sideMenu.nativeElement).getPropertyValue('transform').split(',')[4]))==0?this._isOpen=true:this._isOpen=false;
  }
  onMouseMove($event){
    $event.stopPropagation();
    this._isClick?this._isMove=true:null;
    if(this._isClick==true&&this._isMove==true){
      this._clientX=$event.clientX>=window.innerWidth?window.innerWidth:$event.clientX;
      this._differenceLocation=this._locationX-this._clientX;
      this._moveLocationX=(this._locationX-this._clientX)/window.innerWidth*100;
      if(this._differenceLocation<=0&&!this._isOpen){
        this.sideMenu.nativeElement.style.transform=`translate3d(${-this._moveLocationX-100}%, 0px, 0px)`;
        this.sideMenuService.setSideMenuWidth(-this._moveLocationX*this.sideMenu.nativeElement.clientWidth/window.innerWidth);
      }else if(this._differenceLocation>0&&this._isOpen){
        this.sideMenu.nativeElement.style.transform=`translate3d(${0-this._moveLocationX}%, 0px, 0px)`;
        this.sideMenuService.setSideMenuWidth(this.sideMenu.nativeElement.clientWidth*100/window.innerWidth-this._moveLocationX*this.sideMenu.nativeElement.clientWidth/window.innerWidth);
      }
    }
  }
  onMouseUp($event){
    if(this._isClick&&this._isMove) this.setNavbar();
    this._isClick=false;
    this._isMove=false;
  }
  private setNavbar(){
    if(this._isOpen&&(this._differenceLocation>0)){
      this.sideMenu.nativeElement.style.transform=`translate3d(${-100}%, 0px, 0px)`
      this.sideMenuService.setSideMenuWidth(0);
    }else if(this._moveLocationX+100<95||(this._isOpen&&this._differenceLocation<0)){
      this.sideMenu.nativeElement.style.transform=`translate3d(${0}%, 0px, 0px)`;
      this.sideMenuService.setSideMenuWidth(this.sideMenu.nativeElement.clientWidth*100/window.innerWidth);
    }else{
      this.sideMenu.nativeElement.style.transform=`translate3d(${-100}%, 0px, 0px)`;
      this.sideMenuService.setSideMenuWidth(0);
    }
  }
  onResize($event){
    Math.abs(parseInt(window.getComputedStyle(this.sideMenu.nativeElement).getPropertyValue('transform').split(',')[4]))==0?this._isOpen=true:this._isOpen=false;
    let sizeOfSideMenu:number=Math.sin(((this._sideMenuIndex*90/window.innerWidth)*100>60?60:(this._sideMenuIndex*90/window.innerWidth)*100)*Math.PI/180)*100;
    this.sideMenu.nativeElement.style.width=sizeOfSideMenu+"%";
    if(this._isOpen) this.sideMenuService.setSideMenuWidth(sizeOfSideMenu);
  }
}
