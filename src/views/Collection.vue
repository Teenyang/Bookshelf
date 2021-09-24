<template>
  <div class="Collection">
    <h1>Collection List</h1>
    <ul>
      <li v-for="book in collections" :key="book.id">
        <!-- <router-link
          class="buy_button"
          :to="{ name: 'Purchase', params: { bookName: book.name } }"
          >Buy</router-link
        > -->
        <b-button
          variant="outline-success"
          @click="
            $router.push({ name: 'Purchase', params: { bookName: book.name } })
          "
          >Buy</b-button
        >
        <p>
          Book Name: <span>{{ book.name }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      collections: [
        { id: 1, name: "Book 1" },
        { id: 2, name: "Book 2" },
        { id: 3, name: "Book 3" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.Collection {
  li {
    margin-bottom: 20px;
    text-align: left;
  }

  .buy_button,
  button {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid $light-green;
    border-radius: 5px;

    color: $light-green;
    &:hover {
      text-decoration: none;
    }
  }

  p {
    display: inline-block;
  }
  span {
    font-weight: bold;
  }
}
</style>
