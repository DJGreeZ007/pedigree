<template>
  <div class="work-card">
    <div class="work-card__organization">
      {{ work.organization }}
    </div>
    <div class="work-card__place">
      {{ work.place }}
    </div>
    <div class="work-card__date">
      {{ work.startDate }}
      <template v-if="work.endDate">
        - {{ work.endDate }}
      </template>
    </div>
    <div class="work-card__position">
      {{ work.position }}
    </div>
    <div class="work-card__description">
      {{ work.description }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'WorkItem',
  props: {
    work: {
      type: Object,
      required: true
    },

  }
}
</script>

<style scoped lang="less">
.work-card {
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-bottom: 15px;
  padding: 20px;
  padding-left: 25px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  white-space: normal;

  &__organization {
    color: #000000;
    font-weight: 700;
  }

  &__date {
    color: #757575;
    font-size: 14px;
  }

  &__place {
    color: #000000;
    font-weight: 700;
  }

  &__position {
    color: #000000;
    font-weight: 700;
  }

  &__description {
    color: #757575;
    font-weight: 500;
    font-size: 14px;
    min-height: 100px;
  }
}
</style>
