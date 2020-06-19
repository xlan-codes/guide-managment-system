import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';

import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        // FilterPipe,
        CamelCaseToDashPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        // FilterPipe,
        CamelCaseToDashPipe
    ]
})
export class FusePipesModule
{
}
