import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';
import { FuseHighlightModule } from '@fuse/components';

import { CardsComponent } from 'app/main/ui/cards/cards.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : 'cards',
        component: CardsComponent
    }
];

@NgModule({
    declarations: [
        CardsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseDemoModule,
        FuseHighlightModule,
    ]
})
export class UICardsModule
{
}
