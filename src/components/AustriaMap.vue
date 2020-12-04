<template>
    <div :id="svgId" class="svg-container"></div>
</template>
<script>

    import usaMap from "../assets/usaMap"
    export default {
        name: "usaMap",
        data: function () {
            return {
                svgId: "usaMap",
                mapAttr: {
                    viewBoxWidth: 1300,
                    viewBoxHeight: 900,
                    imageWidth: 1300,
                    imageHeight: 900,
                },
                svgContainer: null
            }
        },
        mounted: function () {
            this.generateVenueMap()
        },
        methods: {
            generateVenueMap: function () {
                const vue = this;
                const mapData = usaMap.g.path
                const svgContainer = vue.$svg("usaMap").size('100%', '100%').viewbox(-200, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
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
              });
              element.on('mouseout', function() {
              element.attr({'fill': "#8470ff"});
              });
            }
        }

    }
</script>
