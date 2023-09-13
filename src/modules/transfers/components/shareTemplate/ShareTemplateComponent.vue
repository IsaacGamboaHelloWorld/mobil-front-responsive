<template>
  <VelocityModal v-if="securityModalVisible" type="custom">
    <template #component>
      <div class="container-modal">
        <SBLPushComponent
          v-if="sblPushModalVisible"
          @success-s-b-l="successValidation()"
          @close-action="hideModal()"
          @action-button-send-code="
            (sblPushModalVisible = false), (sblSoftTokenModalVisible = true)
          "
          :option-code="sblOptionCodes.authorizations"
          :is-modal="true"
        />
        <SBLSoftTokenComponent
          v-if="sblSoftTokenModalVisible"
          @success-s-b-l="successValidation()"
          @close-action="hideModal()"
          :is-modal="true"
        />
        <AuthModalComponent
          v-if="passwordModalVisible"
          type="password"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
        <AuthModalComponent
          v-if="tokenModalVisible"
          type="token"
          @get-credential="successValidation"
          @close-action="hideModal()"
        />
        <velocity-alert
          v-if="alertIsVisible"
          class="m-b-16"
          type="red"
          :body="alertBody"
          :has-icon="true"
        />
      </div>
    </template>
  </VelocityModal>
  <div>
    <div>
      <div class="breadcrumb-trail m-b-32 m-t-8">
        <p class="vel-text-small vel-text-semibold">
          {{ $t('TRANSFERS-MODULE.TITLE') }}
        </p>
        <i class="icon-icon-arrow-keyboard-right row"></i>
        <p :class="`vel-text-small vel-text-semibold ${companyName}`">
          {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.SHARE') }}
        </p>
      </div>
    </div>
    <div v-if="!templatesShared">
      <p class="vel-text-body-1 vel-text-semibold title m-t-26 m-b-16">
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.SHARE-1') }}
      </p>
      <div class="m-t-16">
        <div class="vel-table w-100">
          <div class="vel-table_row vel-table_header">
            <div class="row">
              <div
                class="vel-table_col responsive-hidde"
                v-for="(header, index) in getTemplatesHeaders"
                :key="index"
              >
                <p class="vel-text-semibold vel-text-small">
                  {{ header.title }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              class="vel-table_row"
              v-for="template in templatesShareList"
              :key="template.id"
            >
              <div class="row">
                <div class="vel-table_col vel-text-small">
                  <p class="responsive-show vel-text-semibold">
                    {{ getTemplatesHeaders[0].title }}
                  </p>
                  <p>{{ template.name }}</p>
                </div>
                <div class="vel-table_col vel-text-small">
                  <p class="responsive-show vel-text-semibold">
                    {{ getTemplatesHeaders[1].title }}
                  </p>
                  <p>{{ formateDate(new Date(template.date!)) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="vel-text-body-1 vel-text-semibold title m-t-26 m-b-16">
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.SHARE-2') }}
      </p>
      <div class="m-t-16">
        <div class="vel-table w-100">
          <div class="vel-table_row vel-table_header">
            <div class="row">
              <div class="m-l-8 empty"></div>
              <div
                class="vel-table_col responsive-hidde"
                v-for="(header, index) in getUsersHeaders"
                :key="index"
              >
                <p class="vel-text-semibold vel-text-small">
                  {{ header.title }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              class="vel-table_row"
              v-for="user in getPaginatedUsersList"
              :key="user.id"
            >
              <div class="row">
                <div class="m-l-16">
                  <velocity-check-box
                    @action-check="selectUser(Number(user.id))"
                  />
                </div>
                <div class="vel-table_col vel-text-small">
                  <p class="responsive-show vel-text-semibold">
                    {{ getUsersHeaders[0].title }}
                  </p>
                  <p>{{ user.name }}</p>
                </div>
                <div class="vel-table_col vel-text-small">
                  <p class="responsive-show vel-text-semibold">
                    {{ getUsersHeaders[1].title }}
                  </p>
                  <p>{{ user.userName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <velocity-paginator
        class="m-t-28 m-b-28"
        :pages="getPages"
        @get-page="(page: number) => pageIndex = page"
      />
    </div>
    <div v-else>
      <p class="vel-text-body-1 vel-text-semibold title m-t-26 m-b-16">
        {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.LABELS.SHARE-3') }}
      </p>
      <div class="m-t-16 m-b-16">
        <div class="vel-table w-100">
          <div class="vel-table_row vel-table_header">
            <div class="row">
              <div
                class="vel-table_col responsive-hidde"
                v-for="(header, index) in getSharedTemplatesHeader"
                :key="index"
              >
                <p class="vel-text-semibold vel-text-small">
                  {{ header.title }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="vel-table_row"
            v-for="template in templatesShareList"
            :key="template.id"
          >
            <div class="row">
              <div class="vel-table_col">
                <p class="vel-text-small">{{ template.name }}</p>
              </div>
              <div class="vel-table_col">
                <div v-for="user in usersShared" :key="user" class="sub-row">
                  <p class="vel-text-small m-b-8">{{ user }}</p>
                </div>
              </div>
              <div class="vel-table_col">
                <div v-for="user in usersShared" :key="user" class="sub-row">
                  <div class="container-status success m-b-8">
                    <p class="vel-text-small">
                      {{ getTransactionStatus('')?.label }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="vel-table_col">
                <div v-for="user in usersShared" :key="user" class="sub-row">
                  <p class="vel-text-small m-b-8">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-buttons">
    <velocity-button
      v-if="!templatesShared"
      type="button"
      size="medium"
      @action-button="closeAction()"
      classes-name="text text-primary"
      :text="$t('REUSABLES.BUTTON.CLOSE')"
    >
    </velocity-button>
    <velocity-button
      type="button"
      size="medium"
      @action-button="buttonAction()"
      :disabled="shareButtonDisabled"
      classes-name="btn btn-primary"
      :text="
        !templatesShared
          ? $t('REUSABLES.BUTTON.CONTINUE')
          : $t('REUSABLES.BUTTON.CLOSE')
      "
    >
    </velocity-button>
  </div>
</template>
<script setup lang="ts">
import { companyName } from '@/commons/constants/companyName';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import VelocityCheckBox from '@/commons/velocity/atoms/velocityCheckBox/VelocityCheckBox.vue';
import useShareTemplate from './composables/useShareTemplate';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';

import { sblOptionCodes } from '@/commons/constants/responseCodes';
const {
  getPaginatedUsersList,
  getPages,
  shareButtonDisabled,
  templatesShared,
  templatesShareList,
  getTemplatesHeaders,
  getUsersHeaders,
  pageIndex,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  alertIsVisible,
  alertBody,
  getSharedTemplatesHeader,
  usersShared,
  getTransactionStatus,
  selectUser,
  buttonAction,
  formateDate,
  successValidation,
  hideModal,
  closeAction,
} = useShareTemplate();
</script>
<style scoped lang="sass" src="./ShareTemplateComponent.sass"></style>
