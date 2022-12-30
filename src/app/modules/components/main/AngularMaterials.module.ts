import { NgModule } from "@angular/core";

import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    imports: [
        MatChipsModule
    ],
    exports: [
        MatChipsModule
    ]
})
export class MaterialModule {}