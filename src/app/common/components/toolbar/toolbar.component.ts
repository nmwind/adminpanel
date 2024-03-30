import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-toolbar',
  standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        InputTextModule
    ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
