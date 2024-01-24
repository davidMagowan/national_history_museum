<template>
  <nav class="nav" aria-label="Main Navigation">
    <NuxtLink href="/">
      <Logo class="nav__logo" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'earth-europe']" class="nav__icon" alt="Earth Icon" />
      </Logo>
      <span class="nav__title">National History Museum</span>
    </NuxtLink>
    <div class="nav__menu">
      <button @click="toggleMenu" class="nav__button" :aria-expanded="isMenuOpen.toString()" aria-controls="menu">
        {{ isMenuOpen ? 'Close Menu' : 'Open Menu' }} &#9776;
      </button>
      <div v-if="isMenuOpen" class="nav__dropdown" role="menu" id="menu">
        <NuxtLink to="/" class="nav__link" role="menuitem" aria-current="page">
          Home
          <font-awesome-icon :icon="['fas', 'caret-right']" class="nav__arrow" />
        </NuxtLink>
      </div>
    </div>
  </nav>
  <main class="background">
    <slot />
  </main>
</template>

<script>
export default {
  name: "DefaultLayout",
  components: {},
  mixins: [],
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {},
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.nav {
  display: flex;
  padding: 20px 0;
  background: black;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  width: 100%;

  &__logo {
    margin-right: 15px;
    margin-left: 15px;
  }

  &__icon {
    height: 50px;
  }

  &__link {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    font-size: 25px;
  }

  &__menu {
    position: absolute;
    display: flex;
    align-items: center;
    right: 20px;
    top: 30px;
    /* Adjust the top position */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__button {
    background: none;
    border: none;
    color: white;
    border-bottom: 1px solid #36454F;
    font-size: 25px;
    cursor: pointer;
  }

  &__dropdown {
    position: absolute;
    top: 65px;
    right: 20px;
    width: 200px;
    background-color: black;
    box-shadow: 0 8px 16px grey;
    z-index: 1;
    overflow: hidden;
    padding: 15px;

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      &:hover {
        background-color: #36454F;
        border-top: 5px solid white
      }

      &__link {
        display: block;
        padding: 10px;
        text-decoration: none;
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #36454F;

        &__arrow {
          margin-left: auto;
          transform: rotate(90deg);
          transition: transform 0.3s ease;
          color: white;
        }

        &:hover &__arrow {
          transform: rotate(0);
        }
      }
    }
  }
}

.nav__title {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  color: white;
  text-transform: uppercase;
}

a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}
</style>