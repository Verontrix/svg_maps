<template>
  <div class='Country'>
    {{ WhoAmI }}
    <div :id="svgId" class="svg-container"></div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data: function() {
    return {
      map: null,
      svgId: "svgMap",
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
  created() {
  },
  mounted() {
    this.build();
  },
  methods: {
    async getCountry() {
      try {
        let response = await axios.get("/api/country/" + this.WhoAmI);
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
      const vue = this;

      const attrs = {
        'fill': "#8470ff",
        'stroke': "white",
        'stroke-width': 2,
        'title': pathObj["-title"],
        'map-id': pathObj["-id"],
      };
      const element = svgCont.path(pathObj["-d"]).attr(attrs);
      element.click(function () {
          const mapId = this.node.attributes["map-id"].value;
          const title = this.node.attributes["title"].value;
          vue.$emit("map-clicked", {mapId, title});
      });
      element.on('mouseover', function() {
        element.attr({'fill': "#FF0000"});
        vue.HoverItem =  "Region: " + pathObj["-title"];
      });
      element.on('mouseout', function() {
        element.attr({'fill': "#8470ff"});
      });
      var Node = element.node;
      var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = "Region: " + pathObj["-title"];
      Node.appendChild(title);
      //Node.append("<title>"+ "Region: " + pathObj["-title"] + "</title>");
    }
  }
}
</script>
