<template>
  <div>
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
        </div>
      </template>
    </VelocityModal>
    <velocity-alert
      v-if="alertIsVisible"
      class="m-b-16"
      :type="alertType"
      :body="alertBody"
      :has-icon="true"
    />
    <div class="m-t-16">
      <div class="vel-table w-100">
        <div class="vel-table_row vel-table_header">
          <div class="row">
            <div class="m-l-32"></div>
            <div
              class="vel-table_col responsive-hidde"
              v-for="(header, index) in getHeaders"
              :key="index"
            >
              <p class="vel-text-semibold vel-text-small">{{ header.title }}</p>
            </div>
            <div class="vel-table_col responsive-hidde"></div>
            <div class="vel-table_col responsive-show">
              <p class="vel-text-semibold vel-text-small">
                {{ $t('TRANSFERS-MODULE.STEP-TEMPLATES.TABLE.ORDER-DATE') }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="!!templateList">
          <div
            class="vel-table_row"
            v-for="template in getPaginatedTemplateList"
            :key="template.id"
          >
            <div class="row">
              <div class="m-l-16 m-r-8">
                <velocity-check-box
                  @action-check="
                    selectTemplate({
                      id: template.id,
                      name: template.name,
                      date: template.modifyDate,
                    })
                  "
                />
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[0].title }}
                </p>
                <p>{{ template.name }}</p>
              </div>
              <div class="vel-table_col vel-text-small">
                <p class="responsive-show vel-text-semibold">
                  {{ getHeaders[1].title }}
                </p>
                <p>
                  {{ formateDate(new Date(template.modifyDate)) }}
                </p>
              </div>
              <div class="container-icons vel-table_col">
                <i
                  @click="reUseTemplateAction(template.id)"
                  :class="`icon icon-${companyName} icon-icon-reload`"
                ></i>
                <i
                  @click="duplicateTemplateAction(template.id)"
                  :class="`m-l-16 icon icon-${companyName} icon-icon-copy-info`"
                ></i>
                <i
                  @click="modifyTemplateAction(template.id)"
                  :class="`m-l-16 icon icon-${companyName} icon-icon-edit`"
                ></i>
                <i
                  @click="deleteTemplateAction(template.id)"
                  :class="`m-l-16 icon icon-${companyName} icon-icon-delete`"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="vel-text-body-2 color-neutral m-b-40 m-l-8 m-t-16">
            {{ $t('AUTHORIZATIONS-MODULE.STEP-LIST.EMPTY') }}
          </p>
        </div>
      </div>
      <velocity-paginator
        class="m-t-28 m-b-28"
        :pages="getPages"
        @get-page="(page: number) => pageIndex = page"
      />
      <div class="container-buttons">
        <velocity-button
          type="button"
          size="medium"
          @action-button="goToStep(STEPS.stepShareTemplate)"
          :disabled="shareButtonDisabled"
          classes-name="btn btn-secundary"
          :text="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.SHARE')"
        >
        </velocity-button>
        <velocity-button
          type="button"
          size="medium"
          @action-button="goToStep(STEPS.stepNewTemplate)"
          classes-name="btn btn-primary m-a"
          :text="$t('TRANSFERS-MODULE.STEP-TEMPLATES.BUTTON.CREATE')"
        >
        </velocity-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { companyName } from '@/commons/constants/companyName';
import useTemplates from '../../composables/useTemplates';
import VelocityPaginator from '@/commons/velocity/molecules/velocityPaginator/VelocityPaginator.vue';
import VelocityButton from '@/commons/velocity/atoms/velocityButton/VelocityButton.vue';
import VelocityModal from '@/commons/velocity/atoms/velocityModal/VelocityModal.vue';
import SBLPushComponent from '@/modules/sbl/components/sblPush/SBLPushComponent.vue';
import SBLSoftTokenComponent from '@/modules/sbl/components/sblSoftToken/SBLSoftTokenComponent.vue';
import AuthModalComponent from '@/modules/auth/view/components/authModals/AuthModalComponent.vue';
import VelocityAlert from '@/commons/velocity/molecules/velocityAlert/VelocityAlert.vue';
import VelocityCheckBox from '@/commons/velocity/atoms/velocityCheckBox/VelocityCheckBox.vue';
import STEPS from '../../constants/steps';
import { sblOptionCodes } from '@/commons/constants/responseCodes';

const {
  getHeaders,
  templateList,
  getPages,
  pageIndex,
  securityModalVisible,
  sblPushModalVisible,
  sblSoftTokenModalVisible,
  passwordModalVisible,
  tokenModalVisible,
  alertIsVisible,
  alertType,
  alertBody,
  getPaginatedTemplateList,
  shareButtonDisabled,
  goToStep,
  modifyTemplateAction,
  duplicateTemplateAction,
  reUseTemplateAction,
  formateDate,
  deleteTemplateAction,
  successValidation,
  hideModal,
  selectTemplate,
} = useTemplates();
</script>
<style scoped lang="sass" src="./TemplatesComponent.sass"></style>
