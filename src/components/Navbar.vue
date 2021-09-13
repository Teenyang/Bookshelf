<template>
  <header>
    <b-navbar toggleable="lg" type="light" class="my_navbar">
      <b-navbar-brand href="#">天瓏書單</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="my_navbar_item">
          <b-nav-item href="#">全部書單</b-nav-item>
          <b-nav-item href="#">七折區</b-nav-item>
          <b-nav-item href="#">五折區</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto my_navbar_feature">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="搜尋關鍵字"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >搜尋</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="選擇語系" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ZH</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
.my_navbar {
  background-color: $green;

  .navbar-toggler {
    border: 1px solid $dark-green;
  }

  .navbar-collapse {
    text-align: left;
  }

  ::v-deep .nav-link {
    font-weight: bold;
    color: $dark-green;
  }

  &_feature {
    input {
      &:focus {
        border: $dark-green;
        box-shadow: 0 0 0 2px $dark-green;
      }
    }

    .dropdown {
      li {
        text-align: center;
      }
    }
  }
}
</style>
