
# Angular-SideMenu

  

```hs

npm install angular-sidemenu --save

```

Import Module

  

```

import { AngularSideMenuModule } from 'angular-sidemenu';

@NgModule({

imports: [

AngularSideMenuModule

]

})

```


Create Your Side Menu Component

```hs

<angular-sidemenu //Optional:[isOpen]="true-false" //Optional:[sideMenuIndex]="1.0 - 4.0">
	Your Side Menu Design
</angular-sidemenu>

```

SideMenu Change     //	Optional

```hs
<!--Html-->

<angular-sidemenu></angular-sidemenu>
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