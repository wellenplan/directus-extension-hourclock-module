<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-icon><v-icon name="calendar_month" /></v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>calendar_month</v-icon>
          <span>Upcoming Shows</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <template v-if="loading">
      <v-skeleton-loader type="list-item-icon" />
    </template>
    <v-list-item
      v-else
      v-for="navItem in navItems"
      :key="navItem.to"
      :to="navItem.to"
      :disabled="navItem.disabled"
    >
      <v-list-item-icon><v-icon :name="navItem.icon" /></v-list-item-icon>
      <v-list-item-content>
        <v-text-overflow :text="navItem.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "@directus/extensions-sdk";

const api = useApi();

const loading = ref(true);
const navItems = ref([]);

function getEpisodes(api, cb) {
  api
    .get(`/items/wellenplan_show_episodes`, {
      params: {
        fields: "id,episode_title,start,show.show_name,hourclock.id",
        sort: "start",
        limit: 10,
        page: 0,
      },
    })
    .then((response) => {
      cb(response.data.data);
    });
}

getEpisodes(api, (items) => {
  navItems.value = items.map((item) => {
    console.log(item);
    const enabled = item.hourclock.length > 0;
    let ret = {
      name: `${item.show.show_name}: ${item.episode_title}`,
      icon: "play_circle_filled",
      disabled: !enabled,
    };
    if (enabled) {
      ret["to"] = `/hourclock/${item.hourclock[0].id}`;
    }
    return ret;
  });
  loading.value = false;
});
</script>
