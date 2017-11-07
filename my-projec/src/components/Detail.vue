<template>
    <div class="home">
        <h1>This is detail</h1>
        <router-link to="/">Home</router-link>
        <h1>
           <router-link to="/detail/bar">Bar</router-link>
           <router-link to="/detail/foo">Foo</router-link>
        </h1>
            <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {

    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
