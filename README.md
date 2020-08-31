
# Angular-SideMenu

  

```hs

npm install angular-sidemenu --save

```


Create Your Side Menu Component

```hs


<div  #sideMenu  [ngStyle]="sideMenuStyle()">
	Your Side Menu Design
</div>

```

```hs

import { SideMenuService} from  'angular-sidemenu';
  
@Component({
.
.
.
host:{'(window:mousedown)':'onMouseDown($event)',
"(window:mousemove)":"onMouseMove($event)",
"(window:mouseup)":"onMouseUp($event)",
"(window:resize)":"onResize($event)"}

})


@ViewChild('sideMenu') sideMenu:ElementRef;


constructor(private sideMenuService:SideMenuService){ }


ngAfterViewInit(): void {
this.sideMenuService.sideMenu=this.sideMenu.nativeElement;

/*
//Optional
this.sideMenuService.sideMenuSize=A number between 1 and 4;
//You can add button for Side Menu
this.sideMenuService.isOpen=true-false;
*/

this.sideMenuService.ngAfterViewInit();
}

sideMenuStyle(){
return  this.sideMenuService.getStyles();
}

onMouseDown($event){
this.sideMenuService.onMouseDown($event);
}

onMouseMove($event){
this.sideMenuService.onMouseMove($event);
}

onMouseUp($event){
this.sideMenuService.onMouseUp($event);
}

onResize($event){
this.sideMenuService.onResize($event);
}

```


SideMenu Change     //	Optional

```hs
<!--Html-->

<your sidemenu></your sidemenu>
<any #main>

<!--Html-->
```

```hs

import { SideMenuChangeService } from  'angular-sidemenu';

@ViewChild('main') main:ElementRef;

constructor(private sideMenuChangeService:SideMenuChangeService ){ }

ngAfterViewInit(): void {

this.sideMenuChangeService.sideMenuWidth.subscribe(res=>{
this.main.nativeElement.style.marginLeft=res+"%";
//Optional
//this.main.nativeElement.style.width=(100-res)+"%";
});

}
```