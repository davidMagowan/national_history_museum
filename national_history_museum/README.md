## Setup
npm install
npm run dev 

REQUIREMENTS

1. Cards displaying highlights from the space partners' API should have a different color branding from those in the museum's own data.

```html
<div class="museum-highlight">
    <!-- Checks if is partner using class and computed property and applies different style -->
    <article class="c-card" :class="{ 'c-card__partner': isMuseumPartner }">
``` 
```js
computed: {
    isMuseumPartner() {
      return this.exhibit.isMuseumPartner || false;
    },
  },
```
```css
  &__partner {
    background-color: #D4FBFF;
  }
```
2. While in this case the card only needs to work for the Space page, the card component needs to be done in such a way that it would be easily expandable to the other pages. The museum could have X number of pages and they could continually be adding new ones. As a developer, you don't know what those pages might be.

```html
    <!-- re-use component created which includes standard shared data and slots for bespoke data on other pages. one card is created for each exhibit in an array -->
     <div class="card-list">
      <MuseumHighlight v-for="exhibit in themeData" :key="exhibit.id" :exhibit="exhibit" theme="space">
        <!-- Any images or icons for page badges can be added here in the parent page -->
        <template v-slot:themeBadge>
          <!-- <BadgeIcon badgeType="star" />  -->
          <img src="/images/star.png" class="badge__icon" alt="Star Badge">
        </template>
        
        <!-- Demonstrates how extra data can be added in the parent for other pages -->
        <div v-if="exhibit.period" class="c-card__title">
          Period
        </div>
        <p> {{ exhibit.period }} </p>

      </MuseumHighlight>
    </div>
```

2.1.    Each page has a special badge in the top right corner of the card. This badge is different on every page, and could be an image, or some styled html elements, or a Font Awesome icon. The Space page has an image of a star. The Dinosaur page has a Font Awesome icon inside a circle. The Oceans page has two Font Awesome icons, a wave and a fish together. And so on...

```html
    <!-- parent space page defines desired badge type, badgeicon component created to handel font awesome icons -->
    <template v-slot:themeBadge>
          <BadgeIcon badgeType="star" /> 
          <img src="/images/star.png" class="badge__icon" alt="Star Badge">
        </template>

    <!-- child component slot to accept any badge type from parent space page  -->
        <slot name="themeBadge" />
```

2.2     The data on the different pages (Space, Dinosaurs...) have commonalities but also differences. All highlights have a name, image, date they were posted, a brief description, and perhaps associated news. But all pages also have extra unique data. For example, on the space page, some highlights also include a link to a quiz on the topic. On the dinosaur card, we have a "Period" key to indicate when that dinosaur lived. On the Wildlife page, we have several additional keys: "Location", "Species", and "Endangered status".

```js
      
    computed: {
    /* Maps the common data and bespoke data to the same format and orders according to date */
    themeData() {
      const spacePartnersArray = Object.keys(this.spacePartners).map((id) => {
        const data = this.spacePartners[id];
        const exhibit = reactive({
          id,
          description: data.info,
          date: data.createdAt,
          isMuseumPartner: true,
          ...data,
        });

        return exhibit;
      });

      return [
        ...this.spaceHighlights,
        ...spacePartnersArray,
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },

```
```html
    <!-- common data is handeled by v-if statements in child component fed via a prop from the parent space page -->
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
        <!-- this Slot is to display any other  bespoke data applied on the parent page -->
        <div class="c-card__other">
          <slot />
        </div>
      </div>

      <!-- example of other data -->
         <!-- Demonstrates how extra data can be added in the parent for other pages -->
        <div v-if="exhibit.period" class="c-card__title">
          Period
        </div>
        <p> {{ exhibit.period }} </p>

      </MuseumHighlight>

```

3. Each card should have a "Refresh image" button which, when clicked, will replace that card's current image with a new image fetched from an API.

3.1     When implementing this functionality, assume that you have already received the new image from the API. E.g. const newImage = await getNewImage(); where you do not need to implement the getNewImage() function.

3.2     You only need to implement the code which will replace the current image with the new image for the relevant card.

'''html
    <button class="c-card__button" @click="fetchImage(exhibit.name)" :disabled="imageLoading">
          <span v-if="imageLoading">Loading...</span>
          <span v-else>Refresh Image</span>
        </button>

```js
    //  mmethod implimentation
     async fetchImage(exhibitName) {
      // Fetch a new image for the highlight
      this.imageLoading = true;
      const originalImage = this.exhibit.image; // Store the original image
      try {
        //them prop was added to try and make the images returned more appropriate
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

```

4. The cards should be arranged in order of date created, with the most recent first.

```js
    // sorts the create date in desending order
      return [
        ...this.spaceHighlights,
        ...spacePartnersArray,
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
```