import {VectorTileSuperMapRest} from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {MapService} from '../../../src/openlayers/services/MapService';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorTileLayer from 'ol/layer/VectorTile';

var url = GlobeParameter.ChinaURL;
describe('openlayers_VectorTileSuperMapRest', () => {
    var testDiv, map, vectorTileOptions, vectorTileSource,originalTimeout;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        new MapService(url).getMapInfo((serviceResult) => {
            map = new Map({
                target: 'map',
                view: new View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
            var vectorLayer = new VectorTileLayer({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        setTimeout(() => {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.serverType).toBe("ISERVER");
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");
                expect(vectorTileSource).not.toBeNull();
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        }, 6000);
    });
});