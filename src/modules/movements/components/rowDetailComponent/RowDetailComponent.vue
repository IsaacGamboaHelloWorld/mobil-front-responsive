<template>
  <div class="container_detail">
    <div>
      <p class="vel-text-body-2 vel-text-semibold m-b-16">
        {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.TITLE') }}
      </p>
    </div>
    <div class="container_detail_cols w-100">
      <div class="col w-50">
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.DATE') }}
          </p>
          <p>
            {{
              !!props.records?.fechaAplicacion
                ? props.records?.fechaAplicacion
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.TIME') }}
          </p>
          <p>{{ !!props.records?.hora ? props.records?.hora : 'N/A' }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.OFFICE') }}
          </p>
          <p>{{ !!props.records?.oficina ? props.records?.oficina : 'N/A' }}</p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.DESC') }}
          </p>
          <p>
            {{
              !!props.records?.descripcionOficina
                ? props.records?.descripcionOficina
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.VALUE') }}
          </p>
          <p>
            {{
              !!props.records?.valorEfectivo
                ? addCurrencyDot(props.records?.valorEfectivo)
                : 'N/A'
            }}
          </p>
        </div>
      </div>
      <div class="col w-50">
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.VALUE-CH') }}
          </p>
          <p>
            {{
              !!props.records?.valorCheque
                ? addCurrencyDot(props.records?.valorCheque)
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.TOTAL-VALUE') }}
          </p>
          <p>
            {{
              !!props.records?.valorTotal
                ? addCurrencyDot(props.records?.valorTotal)
                : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.REFERENCE-A') }}
          </p>
          <p>
            {{
              !!props.records?.referencia1 ? props.records?.referencia1 : 'N/A'
            }}
          </p>
        </div>
        <div class="value m-b12">
          <p class="vel-text-semibold">
            {{ $t('MOVEMENTS-MODULE.TABLE.DETAIL.REFERENCE-B') }}
          </p>
          <p>
            {{
              !!props.records?.referencia2 ? props.records?.referencia2 : 'N/A'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" src="./RowDetailComponent.sass"></style>
<script lang="ts" setup>
import useFormattHelper from '@/commons/helpers/formatMoney';
import type { IMovement } from '../../entities/movementsInterfaces';

export interface IProps {
  records?: IMovement;
}

const { addCurrencyDot } = useFormattHelper();

const props = withDefaults(defineProps<IProps>(), {
  records: undefined,
});
</script>
