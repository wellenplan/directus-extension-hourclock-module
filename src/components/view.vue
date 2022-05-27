<template>
  <v-skeleton-loader v-if="loading" />
  <HourclockPie v-else :data="pieData" :emptyColor="emptyColor" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useApi } from "@directus/extensions-sdk";
import HourclockPie from "@wellenplan/vue-hourclock-pie";

type Props = {
  id: string;
};

const props = defineProps<Props>();

const loading = ref(true);
const { t } = useI18n();
const api = useApi();

const id = ref(props.id);
const hourclock = ref({});


const pieData = computed(() => {
  if (loading.value || !hourclock.value.slices) {
    return [];
  }
  const items = hourclock.value.slices;
  const sorted = items.sort((a, b) => a.sort - b.sort);

  return sorted.map((slice) => {
    return {
      value: slice.duration,
      color: slice.color,
      label: slice.title,
    };
  });
});

const emptyColor = computed(() => {
  return getComputedStyle(document.body).getPropertyValue("--background-page");
});

function getHourclock(api, id, cb) {
  api
    .get(`/items/wellenplan_hourclocks/${id}`, {
      params: {
        fields:
          "id,name,slices.*",
      },
    })
    .then((response) => {
      cb(response.data.data);
    });
}
getHourclock(api, id.value, (item) => {
  hourclock.value = item;
  loading.value = false;
});
</script>
