<template>
  <div class="space-page container">
    <h1 class="space-page__title">
      Space
    </h1>
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
  </div>
</template>

<script>
import _ from "lodash";
import { reactive } from 'vue';

export default {
  name: 'SpacePage',
  components: {
  },
  mixins: [
  ],
  props: {
  },
  data() {
    return {
      spaceHighlights: [
        {
          date: '2020-04-20 12:20:00',
          description: 'Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.',
          id: 1,
          image: '',
          name: 'Asteroids',
          period: 'test period'
        },
        {
          date: '2020-05-20 15:50:00',
          description: 'A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.',
          id: 9,
          image: '',
          name: 'Comets',
        },
        {
          date: '2020-05-01 9:22:00',
          description: 'The term planet is ancient, with ties to history, astrology, science, mythology, and religion.',
          id: 7,
          image: '',
          name: 'Planets',
          news: {
            date: '2020-08-18 18:00:00',
            title: 'Attend our talk about Jupiter with Dr. Hogarth',
          },
          quiz: 'https://planetquiz.space',
        },
        {
          date: '2020-07-05 4:10:00',
          description: 'A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.',
          id: 12,
          image: '',
          name: 'Meteor showers',
          news: {
            title: 'The Lyrids will peak at on April 21-22 2021, at night',
          },
        },
      ],
      spacePartners: {
        observatory: {
          createdAt: '2020-06-01 11:45:00',
          info: 'The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.',
          image: '',
          name: 'Mauna Kea Observatories',
        },
      },
    };
  },
  computed: {
    /* Map the data to the same format and order according to date */
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
  methods: {

  },
  created() {

  }
};
</script>

<style lang="scss" scoped>
.space-page {
  &__title {
    font-family: "SMGsans", "helvetica", "arial", sans-serif;
    font-size: 100px;
    font-weight: bold;
    letter-spacing: 1px;
    color: black;
    text-transform: uppercase;
  }
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  /* Change 'auto-fit' to 'auto-fill' */
  grid-gap: 28px;
  padding: 46px 0;
  padding-top: 0;
  justify-content: center;
}

.card-container {
  max-width: 900px;
  margin: 0 auto;
}

.c-card__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
  padding-top: 15px;
}

.badge__icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  background: none;
  z-index: 1;
  max-height: 40px;
}
</style>