<template>
  <div class="badge-icon">
    <font-awesome-icon :icon="badgeIcon" />
  </div>
</template>

<script>
export default {
  name: 'BadgeIcon',
  props: {
    badgeType: String,
    badgeSource: String,
  },
  computed: {
    badgeIcon() {
      const iconMap = {
        star: ['fas', 'star'],
        circle: ['fas', 'circle'],
        waveFish: ['fas', 'fish'],
        globe: ['fas', 'earth-europe'],
        arrow: ['fas', 'caret-right']
      };

      return iconMap[this.badgeType] || [];
    }
  },
};
</script>

<style lang="scss" scoped>
.badge-icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
  color: gold;
  padding: 5px;
  background: none;
  z-index: 1;
}
</style>