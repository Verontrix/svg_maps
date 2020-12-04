<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div id="footer">
      <a href="https://github.com/Verontrix/svg_maps">Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#footer {
  backgroundColor: #FFAAAA;
  width: 100%;
  text-align: left;
}
#footer:hover {
  color: #FFAAAA;
}
#footer a:hover {
  color: #FF0000;
}
#footer a {
  text-decoration: none;
}
</style>
