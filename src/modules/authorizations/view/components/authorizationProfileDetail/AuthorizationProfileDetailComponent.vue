<template>
  <div>
    <div class="card m-b-18">
      <div class="card_header">
        <p class="vel-text-body-1 vel-text-semibold">
          {{ $t('AUTHORIZATIONS-MODULE.STEP-DETAIL.TITLE-PROFILE') }}
        </p>
      </div>
      <div class="card_body">
        <div
          v-for="item in getTransactionFullDetailDTO"
          :key="item.name"
          class="m-b-8"
        >
          <p class="vel-text-body-2 vel-text-semibold w-50">
            {{ item.langText }}
          </p>
          <p class="vel-text-body-2 color-neutral w-50">{{ item.value }}</p>
        </div>
      </div>
    </div>
    <div v-for="item in getProfileClientDTO?.children" :key="item.code">
      <velocity-acordion type="custom" text-in-button>
        <template #head>
          <p class="vel-text-body-1 vel-text-semibold p-t-18 p-b-18 p-l-18">
            {{ item.description }}
          </p>
        </template>
        <template #body>
          <div
            v-for="child in item.children"
            :key="child.code"
            class="w-100 m-l-18 m-t-10"
          >
            <velocity-acordion type="custom" :title="child.description">
              <template #head>
                <p
                  class="vel-text-body-2 vel-text-semibold p-t-10 p-b-10 p-l-10"
                >
                  {{ child.description }}
                </p>
              </template>
              <template #body>
                <ul class="container_permitions m-t-10">
                  <li
                    v-for="lastChild in child.children"
                    :key="lastChild.code"
                    class="vel-text-body-2 color-neutral"
                  >
                    {{ lastChild.description }}
                  </li>
                </ul>
              </template>
            </velocity-acordion>
            <hr class="separator-line w-100" />
          </div>
        </template>
      </velocity-acordion>
      <hr class="separator-line w-100" />
    </div>
  </div>
</template>
<style
  scoped
  lang="sass"
  src="./AuthorizationProfileDetailComponent.sass"
></style>
<script lang="ts" setup>
import useAuthorizationsDetail from '@/modules/authorizations/composables/useAuthoriozationDetail';
import VelocityAcordion from '@/commons/velocity/molecules/velocityAcordion/VelocityAcordion.vue';
const { getProfileClientDTO, getTransactionFullDetailDTO } =
  useAuthorizationsDetail();
</script>
