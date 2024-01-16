import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
toolbarTypes: string[] = ["main"];
activeBar: string = "main";

  constructor(private _snack: MatSnackBar){ }
  set(type: string): string{
    if(this.toolbarTypes.includes(type)){
      this.activeBar = type;
      return this.activeBar;
    }else{
      this._snack.open('Not a valid toolbar type', 'Close', {
        duration: 1500
      })
      return "";
    }
  }
  
  get(): string{
    return this.activeBar;
  }
}
