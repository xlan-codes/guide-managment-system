import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Feedback',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'client-feedback',
                        title: 'Add Client Review',
                        type : 'item',
                        url  : '/apps/dashboards/add-client-review'
                    },
                    {
                        id   : 'client-reviews',
                        title: 'Client Reviews',
                        type : 'item',
                        url  : '/apps/dashboards/clients-reviews-list'
                    },
                    {
                        id   : 'guide',
                        title: 'Guide',
                        type : 'item',
                        url  : '/apps/dashboards/guide'
                    },
                    {
                        id   : 'portals',
                        title: 'Portals',
                        type : 'item',
                        url  : '/apps/dashboards/portal'
                    },
                    {
                        id   : 'system-users',
                        title: 'Users',
                        type : 'item',
                        url  : '/apps/dashboards/user'
                    },
                    {
                        id   : 'tour-manual',
                        title: 'Tour Manual',
                        type : 'item',
                        url  : '/apps/dashboards/tour-manual'
                    }
                ]
            },
            {
                id       : 'reports',
                title    : 'Reports',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'bar_chart',
                children : [
                    {
                        id   : 'ranking',
                        title: 'Ranking',
                        type : 'item',
                        url  : '/apps/guide-ranking-portal'
                    },
                    // {
                    //     id   : '',
                    //     title: 'Portal Reports',
                    //     type : 'item',
                    //     url  : '/apps/portal-reports'
                    // },
                    // {
                    //     id   : '',
                    //     title: 'Guide Reports',
                    //     type : 'item',
                    //     url  : '/apps/guide-reports'
                    // },
                ]
            },
            {
                id       : 'finances',
                title    : 'Finances',
                translate: 'NAV.FINANCES',
                type     : 'collapsable',
                icon     : 'account_balance',
                children : [
                    {
                        id   : 'expenes',
                        title: 'Expenes',
                        type : 'item',
                        url  : '/apps/dashboards/tour-expenses'
                    },
                    {
                        id   : 'client-payments',
                        title: 'Client Payment',
                        type : 'item',
                        url  : '/apps/dashboards/tour-payments'
                    }
                ]
            },
        ]
    }
];
