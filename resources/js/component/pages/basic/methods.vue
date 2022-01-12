<template>
  <div>
    <h1>El numero es: {{ views }}</h1>
    <button @click="updateCounter(1)">Incrementar</button>
    <button @click="updateCounter(-1)">Decrementar</button>
    <br />
    <br />
    <div v-for="(blog, i) in blogs" :key="i">
      <h1>{{ blog.title }}</h1>
      <p>{{ blog.post }}</p>
      <p>{{ i }}</p>
    </div>
    <div>
      <h1 v-if="showItem">Show this item if "ShowItem" is True</h1>
      <h1 v-else>Show this item if "ShowItem" is False</h1>
      <button v-on:click="changeValue()">Validar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      views: 0,
      blogs: [],
      showItem: false,
    };
  },
  methods: {
    updateCounter(number) {
      this.views += number;
    },
    changeValue() {
      this.showItem = !this.showItem;
    },
  },
  created() {
    this.views = 100;
    let posts = [
      {
        title: "Esto es el titulo del blog",
        post: "this is the blog post 1",
        id: 1,
      },
      {
        title: "Esto es el titulo del blog",
        post: "this is the blog post 2",
        id: 2,
      },
    ];
    this.blogs = posts;
  },
};
</script>

