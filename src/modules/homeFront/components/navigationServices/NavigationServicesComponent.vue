<template>
  <div class="section-nav fade-in-left">
    <div class="w-100">
      <div class="container_main_logo">
        <velocity-icon
          class="icon-general"
          icon="icon-icon-arrow-back"
          @action-icon="emit('activeSideNav')"
        />
        <img
          :src="`${staticsPath}/${companyName}/main-logo.svg`"
          alt="Banco Popular"
          @click="navigateTo(serviceItems[0])"
        />

        <img
          class="logo-responsive"
          :src="`${staticsPath}/${companyName}/logo.svg`"
          alt="Banco Popular"
        />
      </div>
      <div class="container_services p-t-16 p-b-16">
        <ul>
          <li class="m-a" v-for="(service, index) in serviceItems" :key="index">
            <service-item-component
              v-if="!!hasPermitions(service)"
              :companyName="companyName"
              :icon="!!service.icon ? service.icon : ''"
              :text="!!service.text ? service.text : ''"
              :isActive="!!service.isActive ? true : false"
              @click="navigateTo(service)"
            />

            <ul
              :class="`container_services-childs fade-in-left ${
                !!service.showChilds ? 'active' : ''
              }`"
              v-if="!!service.childs && !!service.childs.length"
            >
              <li v-for="(serviceChild, index) in service.childs" :key="index">
                <p
                  v-if="!!hasPermitions(serviceChild)"
                  class="p-t-16 p-b-16 color-neutral vel-text-small vel-text-semibold"
                  @click="
                    service.showChilds = false;
                    navigateTo(serviceChild);
                  "
                >
                  {{ serviceChild.text }}
                </p>
              </li>
            </ul>
          </li>
        </ul>

        <hr class="separator-line w-100" />

        <service-item-component
          :companyName="companyName"
          :icon="!!contactServiceRef.icon ? contactServiceRef.icon : ''"
          :text="!!contactServiceRef.text ? contactServiceRef.text : ''"
          :isActive="!!contactServiceRef.isActive ? true : false"
          @click="navigateTo(contactServiceRef)"
        />
        <div
          :class="`container_services-childs fade-in-left ${
            contactServiceRef.showChilds ? 'active' : ''
          }`"
        >
          <div
            v-for="service in serviceLinesBusiness()"
            :key="service.city"
            class="m-b-16"
          >
            <p class="vel-text-semibold vel-text-small m-b-12">
              {{ service.city }}
            </p>
            <p class="vel-text-small color-neutral">{{ service.phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container_logo">
      <img :src="`${staticsPath}/global-img/aval.svg`" alt="grupo aval" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import useMapServices from '@/modules/homeFront/composables/useMapServices';
import serviceItemComponent from '@/modules/homeFront/components/navigationServices/components/serviceItemComponent.vue';
import VelocityIcon from '@/commons/velocity/atoms/velocityIcon/VelocityIcon.vue';
import { staticsPath } from '@/commons/constants/envConstants';
import { serviceLinesBusiness } from '@/modules/auth/constants/serviceLine';

const route = useRoute();

const emit = defineEmits<{
  (e: 'activeSideNav'): void;
  (e: 'turnOffNavSwitch'): void;
}>();

watch(route, () => {
  emit('turnOffNavSwitch');
});
const {
  companyName,
  serviceItems,
  navigateTo,
  contactServiceRef,
  hasPermitions,
} = useMapServices();
</script>
<style scoped lang="sass" src="./NavigationServicesComponent.sass"></style>
