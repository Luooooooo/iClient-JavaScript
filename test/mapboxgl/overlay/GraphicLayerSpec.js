import mapboxgl from 'mapbox-gl';
import '../../libs/deck.gl/5.1.3/deck.gl';
import { GraphicLayer } from '../../../src/mapboxgl/overlay/GraphicLayer';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9ua2VyIiwiYSI6ImNpd2Z6aTE5YTAwdHEyb2tpOWs2ZzRydmoifQ.LwQMRArUP8Q9P7QApuOIHg';
describe('mapboxgl_GraphicLayer', () => {
  let originalTimeout;
  const coors = [
    [-35.16, 38.05],
    [-36.16, 39.05],
    [-36.16, 40.05],
    [-37.16, 40.05],
    [-38.16, 39.05]
  ];
  function creatGraphicLayer() {
    let testDiv, map, graphics = [], graphicLayer;
    //构建数据
    for (let i = 0; i < coors.length; i++) {
      let lngLat = {
        lng: parseFloat(coors[i][0]),
        lat: parseFloat(coors[i][1])
      };
      graphics.push(new mapboxgl.supermap.Graphic(lngLat));
      graphics[i].setId(i);
      graphics[i].setAttributes({ name: "graphic_" + i });
    }
    testDiv = window.document.createElement("div");
    testDiv.setAttribute("id", "map");
    testDiv.style.styleFloat = "left";
    testDiv.style.marginLeft = "8px";
    testDiv.style.marginTop = "50px";
    testDiv.style.width = "500px";
    testDiv.style.height = "500px";
    window.document.body.appendChild(testDiv);
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [13.413952, 52.531913],
      zoom: 16.000000000000004,
      pitch: 33.2
    });
    graphicLayer = new GraphicLayer("graphicLayer", {
      graphics: graphics
    });
    graphicLayer.onAdd(map);
    return graphicLayer
  }
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  afterAll(() => {
    document.body.removeChild(document.getElementById('map'));
    // map.removeLayer("graphicLayer");
  });

  it('constructor', (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      expect(graphicLayer.deckGL).not.toBeNull();
      graphicLayer.remove();
      done();
    }, 1000)
  });

  it('setVisibility', (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      graphicLayer.setVisibility(false);
      expect(graphicLayer.visibility).toBeFalsy();
      graphicLayer.remove();
      done();
    }, 1000)
  });

  it("getGraphicBy add getGraphicById", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      const graphic = graphicLayer.getGraphicBy("id", 1);
      expect(graphic).not.toBeNull();
      expect(graphic.getId()).toEqual(1);

      const graphic1 = graphicLayer.getGraphicById(1);
      expect(graphic1.getId()).toEqual(1);
      graphicLayer.remove();

      done();
    }, 1000)
  });
  it("getGraphicsByAttribute", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      const graphic = graphicLayer.getGraphicsByAttribute("name", "graphic_1");
      expect(graphic).not.toBeNull();
      expect(graphic[0].getAttributes().name).toBe("graphic_1");
      graphicLayer.remove();
      done();
    }, 1000);
  });
  it("removeGraphics", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      //删除单个
      let deleteGraphic = graphicLayer.graphics[0];
      expect(graphicLayer.graphics.length).toEqual(5);
      graphicLayer.removeGraphics(deleteGraphic);
      expect(graphicLayer.graphics.length).toEqual(4);

      //多个
      deleteGraphic = [graphicLayer.graphics[1], graphicLayer.graphics[2]];
      graphicLayer.removeGraphics(deleteGraphic);
      expect(graphicLayer.graphics.length).toEqual(2);

      //默认
      graphicLayer.removeGraphics();
      expect(graphicLayer.graphics.length).toEqual(0);

      graphicLayer.remove();

      done();
    }, 1000);

  });
  it("getState", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      const state = graphicLayer.getState();
      expect(state).not.toBeNull();
      expect(state.color).toEqual([0, 0, 0, 255]);

      graphicLayer.remove();
      done();
    }, 1000);
  });

  it("setStyle", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      expect(graphicLayer.color).toEqual([0, 0, 0, 255]);
      graphicLayer.setStyle({ color: "blue" });
      expect(graphicLayer.color).toEqual("blue");

      graphicLayer.remove();
      done();
    }, 4000);
  });

  it("addGraphics", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      graphicLayer.clear();
      expect(graphicLayer.graphics.length).toEqual(0);
      let graphics = [];
      for (let i = 0; i < coors.length; i++) {
        let lngLat = {
          lng: parseFloat(coors[i][0]),
          lat: parseFloat(coors[i][1])
        };
        graphics.push(new mapboxgl.supermap.Graphic(lngLat));
        graphics[i].setId(i);
        graphics[i].setAttributes({ name: "graphic_" + i });
      }
      graphicLayer.addGraphics(graphics);
      expect(graphicLayer.graphics.length).toEqual(5);

      graphicLayer.remove();
      done();
    }, 4000);
  });

  it("setGraphics", (done) => {
    let graphicLayer = creatGraphicLayer();
    setTimeout(() => {
      let graphics = [];
      for (let i = 0; i < coors.length; i++) {
        let lngLat = {
          lng: parseFloat(coors[i][0]),
          lat: parseFloat(coors[i][1])
        };
        graphics.push(new mapboxgl.supermap.Graphic(lngLat));
        graphics[i].setId(i);
        graphics[i].setAttributes({ name: "graphic_" + i });
      }
      graphicLayer.setGraphics(graphics);
      expect(graphicLayer.graphics.length).toEqual(5);

      graphicLayer.remove();
      done();
    }, 4000);
  });
});