<template>
  <div>
    <h1 ref="myref">Hooks</h1>
    <p>Mi Nombre es: {{ name }}</p>
  </div>
</template>

	<script>
export default {
  data() {
    return {
      name: "Yosshi",
    };
  },
  beforeCreate() {
    console.log(this.name);
  },
  created() {
    console.log();
  },
};
</script>
