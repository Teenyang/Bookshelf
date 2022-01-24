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
          <!-- <b-nav-item
            href="#"
            @click="$router.push(navItem.name).catch((error) => error)"
            :class="[$route.name === navItem.name ? 'current_route' : '']"
          >
            {{ navItem.item }}
          </b-nav-item> -->

          <router-link :to="{ name: navItem.name }" class="nav-link">
            {{ $t(navItem.item) }}
            <!-- {{ navItem.item }} -->
          </router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
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
        <!-- <b-button
          variant="primary"
          size="sm"
          class="my-2 my-sm-0"
          type="button"
          @click="$router.push('/member').catch((error) => error)"
          >會員</b-button
        > -->
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
        { id: 1, item: "navItem.all", name: "All" },
        { id: 2, item: "navItem.ithelp", name: "Ithelp" },
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
  position: fixed;
  top: 0;
  z-index: 10;
}
.my_navbar {
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

  .current_route {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -8px;

      width: 100%;
      height: 5px;
      background-color: red;
    }
  }

  .router-link-exact-active {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -8px;

      width: 100%;
      height: 5px;
      background-color: red;
    }
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
