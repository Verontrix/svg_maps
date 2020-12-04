<template>
  <div class="hello">
    <h1>Austria Map</h1>
    <p>
      Please click a state to view state properties
    </p>
    <div>
      <austria-map v-on:map-clicked="onMapClick"></austria-map>
    </div>
  </div>
</template>

<script>
import AustriaMap from './AustriaMap.vue'
export default {
  name: 'HelloWorld',
  components: {
    AustriaMap
  },
  props: {
    msg: String,
    map: String
  },
  methods: {
    onMapClick: function(attr){
      this.$notify({
        group: 'map',
        title: 'State clicked',
        text: `You clicked on state with id: ${attr.mapId} and title: ${attr.title}`
      });
    }
  }
}
</script>
