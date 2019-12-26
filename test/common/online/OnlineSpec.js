import {Online} from '../../../src/common/online/Online';

describe('Online', () => {
    it('constructor', () => {
        var online = new Online();
        expect(online.rootUrl).toEqual("https://www.supermapol.com");
        expect(online.webUrl).toEqual("https://www.supermapol.com/web");
        expect(online.mDatasUrl).toEqual("https://www.supermapol.com/web/mycontent/datas");
    });
});