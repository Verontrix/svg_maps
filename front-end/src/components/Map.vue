<template>
  <div :id="svgId" class="svg-container"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Map",
  props: {
    mapName: String,
    mapId: String,
  },
  data: function() {
    return {
      map: null,
      svgId: this.mapId,
      mapAttr: {
          viewBoxWidth: 1300,
          viewBoxHeight: 900,
          imageWidth: 1300,
          imageHeight: 900,
      },
      svgContainer: null,
    }
  },
  computed: {
    WhoAmI: function() {
      var path = window.location.pathname;
      return path.substring(path.lastIndexOf('/') +1);
    },
  },
  mounted: function() {
    this.build();
  },
  methods: {
    async getCountry() {
      try {
        let response = await axios.get("/api/country/" + this.mapId);
        this.map = response.data;
        console.log(this.map);
        return true;
      } catch (error) {
        //This is empty
      }
    },
    async build() {
      await this.getCountry();
      this.generateVenueMap();
    },
    generateVenueMap: function() {
      const vue = this;
      const mapData = this.map.regions.g.path;
      const svgContainer = vue.$svg(this.svgId).size('100%','100%').viewbox(-200, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
      vue.svgContainer = svgContainer;
      mapData.forEach((pathObj) => {
          vue.generatePath(svgContainer, pathObj);
      })
    },
    generatePath: function (svgCont, pathObj) {
      const attrs = {
        'fill': "#8470ff",
        'stroke': "white",
        'stroke-width': 2,
        'title': pathObj["-title"],
        'map-id': pathObj["-id"],
      };
      svgCont.path(pathObj["-d"]).attr(attrs);
    }
  }
}
</script>
