<template>
  <header>
    <b-navbar toggleable="lg" type="light" class="my_navbar">
      <b-navbar-brand
        class="logo"
        href="#"
        @click="$router.push('/').catch((error) => error)"
      >
        {{ $t("navItem.tenlong") }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav
          class="my_navbar_item"
          v-for="navItem in navList"
          :key="navItem.id"
        >
          <router-link
            :to="{ name: 'List', params: { nav: navItem.name } }"
            class="nav-link"
          >
            {{ $t(navItem.item) }}
          </router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto my_navbar_feature">
          <b-nav-item-dropdown :text="$t('language.select')" right>
            <b-dropdown-item href="#" @click="selectLanguage('en')">
              {{ $t("language.en") }}
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="selectLanguage('zh')">
              {{ $t("language.zh") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      navList: [
        { id: 1, item: "navItem.all", name: "all" },
        { id: 2, item: "navItem.ithelp", name: "ithelp" },
        { id: 3, item: "navItem.tracking", name: "tracking" },
      ],
    };
  },
  methods: {
    selectLanguage(language) {
      this.$i18n.locale = language;
      localStorage.setItem("locale", language);
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  max-width: 1440px;
  position: fixed;
  top: 0;
  z-index: 10;
}
.my_navbar {
  padding: 0 1rem;
  background-color: $green;

  .logo {
    font-size: 28px;
    text-transform: uppercase;
  }

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

  &.navbar-light .navbar-nav .nav-link:hover {
    color: red;
  }

  .router-link-exact-active {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -5px;

      width: 100%;
      height: 5px;
      background-color: red;
    }
  }

  &_feature {
    .dropdown {
      li {
        text-align: center;
      }
    }
  }
}
</style>
