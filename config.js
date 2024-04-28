import { fileURLToPath } from 'url';
import { dirname } from 'path';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

global.host = "https://shanapi.vercel.app"

global.creator = "ihsan"

global.key = 'shanbot'

global.limit = {
    free: 15,
    prem: 1000
}

global.mess = {
    error: {
        creator,
        status: false,
        message: '[!] The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.'
    },
    need: {
        apikey: {
            creator,
            status: false,
            message: '[!] APIKEY Required'
        },
        url: {
            creator,
            status: false,
            message: '[!] URL Required'
        },
        q: {
            creator,
            status: false,
            message: '[!] QUERY REQUIRE'
        }
    }
}
