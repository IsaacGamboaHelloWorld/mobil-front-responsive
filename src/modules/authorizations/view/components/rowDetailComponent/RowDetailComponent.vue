<template>
  <div class="container-main">
    <div class="container-header">
      <p class="vel-text-body-2 vel-text-semibold">
        {{ $t('AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.HEADER') }}
      </p>
      <VelocityButton
        classes-name="btn btn-primary m-a"
        type="button"
        size="medium"
        :text="$t('REUSABLES.BUTTON.SEE-MORE-DETAIL')"
        @action-button="() => emit('actionButton')"
      />
    </div>
    <hr />
    <div v-for="(record, index) in props.records" :key="record.roleId">
      <div>
        <p class="vel-text-body-2 vel-text-semibold m-t-16 m-b-16">
          {{ $t('AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.RESPONSABILITY') }}
          {{ index + 1 }}
        </p>
        <div class="container-body">
          <div class="container-item">
            <div class="container-content m-b-12">
              <p class="vel-text-small vel-text-semibold w-50">
                {{ $t('AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.ROLE') }}
              </p>
              <p class="vel-text-small color-neutral">{{ record.roleName }}</p>
            </div>
            <div class="container-content m-b-16">
              <p class="vel-text-small vel-text-semibold w-50">
                {{
                  $t(
                    'AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.APPROVERS-AMOUNT',
                  )
                }}
              </p>
              <p class="vel-text-small color-neutral">
                {{ record.roleQuantity }}
              </p>
            </div>
          </div>
          <div class="container-item">
            <div class="container-content m-b-12">
              <p class="vel-text-small vel-text-semibold w-50">
                {{
                  $t(
                    'AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.CURRENT-APPROVALS',
                  )
                }}
              </p>
              <p class="vel-text-small color-neutral">
                {{ record.roleApproveQuantity }}
              </p>
            </div>
            <div class="container-content m-b-16">
              <p class="vel-text-small vel-text-semibold w-50">
                {{
                  $t(
                    'AUTHORIZATIONS-MODULE.ROW-DETAIL-COMPONENT.PENDING-APPROVALS',
                  )
                }}
              </p>
              <p class="vel-text-small color-neutral">
                {{ record.rolePendingQuantity }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>
<style scoped lang="sass" src="./RowDetailComponent.sass"></style>
<script lang="ts" setup>
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import type { IIcbsRoleQuantity } from '@/modules/authorizations/entities/authorizationsInterfaces';

export interface IProps {
  records?: IIcbsRoleQuantity[];
}

const props = withDefaults(defineProps<IProps>(), {
  records: () => [],
});

const emit = defineEmits<{
  (e: 'actionButton'): void;
}>();
</script>
