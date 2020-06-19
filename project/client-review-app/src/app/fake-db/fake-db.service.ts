import { InMemoryDbService } from 'angular-in-memory-web-api';

import { FileManagerFakeDb } from 'app/fake-db/file-manager';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { FaqFakeDb } from 'app/fake-db/faq';
import { IconsFakeDb } from 'app/fake-db/icons';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {


            // File Manager
            'file-manager': FileManagerFakeDb.files,



            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // FAQ
            'faq': FaqFakeDb.data,

            // Icons
            'icons': IconsFakeDb.icons,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
