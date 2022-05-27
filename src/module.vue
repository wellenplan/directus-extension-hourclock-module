<template>
  <private-view :title="title">
    <template #navigation>
      <hourclock-navigation />
    </template>
    <hourclock-view v-if="id" :id="id" />
  </private-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import { useApi } from "@directus/extensions-sdk";
import HourclockNavigation from "./components/navigation.vue";
import HourclockView from "./components/view.vue";

const { t } = useI18n();
const api = useApi();

const route = useRoute();
console.log("route: ", route);
const id = ref(route.params.id);
const title = ref(t("hourclock.module.loading"));


function getHourclock(api, id, cb) {
  // load current/next hourclock if id param not provided
  const url = id
    ? `/items/wellenplan_hourclocks/${id}`
    : "/items/wellenplan_hourclocks";
  api
    .get(url, {
      params: {
        fields: "id,name",
      },
    })
    .then((response) => {
      cb(id ? response.data.data : response.data.data[0]);
    });
}

getHourclock(api, id.value, (item) => {
  id.value = item.id;
  title.value = item.name;
});
</script>
