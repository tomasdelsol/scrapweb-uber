export function getUberCookies() {
    return [
        {
            name: 'UBER_CONSENTMGR',
            value: '1764089951805|consent:true',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2026-11-25T16:59:11.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'uber_sites_geolocalization',
            value: '{%22best%22:{%22localeCode%22:%22es%22%2C%22countryCode%22:%22AR%22%2C%22territoryId%22:805%2C%22territoryName%22:%22Buenos%20Aires%22%2C%22territorySlug%22:%22buenos-aires%22}%2C%22url%22:{%22localeCode%22:%22es%22%2C%22countryCode%22:%22AR%22%2C%22territoryId%22:805%2C%22territorySlug%22:%22buenos-aires%22%2C%22territoryName%22:%22Buenos%20Aires%22}%2C%22user%22:{%22expiresAt%22:%222025-12-25T18:04:35.106Z%22%2C%22countryCode%22:%22AR%22%2C%22territoryId%22:805%2C%22productGeofenceUUID%22:%228682c37a-1a78-4462-8de3-0910653a4efd%22%2C%22territoryGeoJson%22:[[{%22lat%22:-33.6496658%2C%22lng%22:-60.1467094}%2C{%22lat%22:-33.6496658%2C%22lng%22:-57.0631888}%2C{%22lat%22:-35.7614899%2C%22lng%22:-57.0631888}%2C{%22lat%22:-35.7614899%2C%22lng%22:-60.1467094}]]%2C%22territoryGeoPoint%22:{%22latitude%22:-34.602556%2C%22longitude%22:-58.410653}%2C%22territorySlug%22:%22buenos-aires%22%2C%22territoryName%22:%22Buenos%20Aires%22%2C%22localeCode%22:%22es%22%2C%22locationUpdatedByFooter%22:true}}',
            domain: '.www.uber.com',
            path: '/',
            expires: Math.floor(new Date('2026-11-25T18:04:36.724Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'user_city_ids',
            value: '1894',
            domain: 'www.uber.com',
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main__pn',
            value: '9%3Bexp-session',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2025-11-25T18:34:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main__se',
            value: '13%3Bexp-session',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2025-11-25T18:34:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main__sn',
            value: '3',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2026-11-25T18:04:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main__ss',
            value: '0%3Bexp-session',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2025-11-25T18:34:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main__st',
            value: '1764095676521%3Bexp-session',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2025-11-25T18:34:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        },
        {
            name: 'utag_main_ses_id',
            value: '1764093089401%3Bexp-session',
            domain: '.uber.com',
            path: '/',
            expires: Math.floor(new Date('2025-11-25T18:34:36.000Z').getTime() / 1000),
            httpOnly: false,
            secure: true,
            sameSite: 'None' as const
        }
    ];
}

