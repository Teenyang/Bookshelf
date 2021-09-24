<template>
  <div class="Purchase">
    <h1>Purchase</h1>
    <div class="bill">
      <p>
        Name: <span>{{ $route.params.bookName }}</span>
      </p>
      <p>Quantity: <span>1</span></p>
      <p>Price: <span>$500</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Purchase",
};
</script>

<style lang="scss" scoped>
.bill {
  padding: 0 20px;

  span {
    font-weight: bold;
  }
}
</style>
