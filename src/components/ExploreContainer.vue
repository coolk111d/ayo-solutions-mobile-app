<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>AYO Mobile App is under development.</p>
    <p>Use <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/">Web App</a> for the meantime.</p>

    <h3><a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a></h3>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ExploreContainer',
  props: {
    name: String
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  padding: 20px 10px;
  position: absolute;
  top: 30%;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
