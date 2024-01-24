<template>
  <div class="museum-highlight">
    <!-- Checks if is partner using class and computed property and applies different style -->
    <article class="c-card" :class="{ 'c-card__partner': isMuseumPartner }">
      <header class="c-card__header">
        <slot name="themeBadge" />
        <img :src="exhibit.image || `/images/${exhibit.name.replace(/\s/g, '')}.jpg`" class="c-card__image" alt="Card Image" />
      </header>

      <div class="c-card__body">
        <h2 class="c-card__title">
          {{ exhibit.name }}
        </h2>
        <div v-if="exhibit.quiz" class="c-card__quiz">
          <NuxtLink :href="exhibit.quiz" target="_blank">
            <button class="c-card__quiz__Button">Quiz</button>
          </NuxtLink>
        </div>
        <p class="c-card__intro">
          {{ exhibit.description }}
        </p>
        <div v-if="exhibit.news?.title" class="c-card__subtitle">News</div>
        <p v-if="exhibit.news?.title">{{ exhibit.news?.title }}</p>
        <!-- Slot to display any bespoke data applied on the parent page -->
        <div class="c-card__other">
          <slot />
        </div>
      </div>

      <footer class="c-card__footer">
        <button class="c-card__button" @click="fetchImage(exhibit.name)" :disabled="imageLoading">
          <span v-if="imageLoading">Loading...</span>
          <span v-else>Refresh Image</span>
        </button>
      </footer>

    </article>
  </div>
</template>

<script>
export default {
  name: 'MuseumHighlight',
  components: {},
  mixins: [],
  props: {
    exhibit: Object,
    theme: String,
  },
  data() {
    return {
      imageLoading: false,
    };
  },
  computed: {
    isMuseumPartner() {
      return this.exhibit.isMuseumPartner || false;
    },
  },
  methods: {
    async fetchImage(exhibitName) {
      // Fetch a new image for the highlight
      this.imageLoading = true;
      const originalImage = this.exhibit.image; // Store the original image
      try {
        const response = await fetch(`https://source.unsplash.com/featured/500x500?${exhibitName + ' ' + this.$props.theme}`);

        if (response.ok) {
          // If the response is successful, update the image
          this.exhibit.image = response.url;
        } else {
          // If the response is not successful, revert to the original image
          this.exhibit.image = originalImage;
        }
      } catch (error) {
        // Handle any errors during the fetch
        console.error('Error fetching image:', error);
        this.exhibit.image = originalImage;
      } finally {
        this.imageLoading = false;
      }
    },
  },
  created() {

  },
};
</script>

<style lang="scss" scoped>
.museum-highlight {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;

  .card-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .c-card {
    display: inline-block;
    width: 100%;
    max-width: 350px;
    margin: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    background: #fff;
    box-shadow: 0 6px 10px -5px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 20px -15px rgba(0, 0, 0, 0.3);
    }
    
    &__partner {
    background-color: #D4FBFF;
  }

    &__header {
      height: 200px;
      overflow: hidden;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: filter 0.5s ease;
    }

    &__body {
      padding: 20px;
      flex: 1;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
      text-transform: uppercase;
    }

    &__subtitle {
      font-size: 13px;
      margin-top: 5px;
      padding: 0;
    }

    &__intro {
      margin-bottom: 0;
    }

    &__footer {
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: center;
      padding: 20px;
    }

    &__button {
      background-color: #36454F;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 25px;
    }

    &__quiz__Button {
      background-color: #65717f;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 25px;
    }

    &__quiz {
      padding-bottom: 5px;
      padding-top: 15px;
    }

    &__subtitle {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
      padding-top: 15px;
      text-transform: uppercase;
    }

    &__other {
      margin-bottom: 0;
    }
  }
}
</style>


