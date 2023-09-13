import { useRouter, type Router, useRoute } from 'vue-router';
import { onBeforeMount, reactive, ref, watch } from 'vue';

import { companyName } from '@/commons/constants/companyName';
import {
  serviceItemsMock,
  contactService,
} from '@/modules/homeFront/constants/menuItems';
import type { IServiceItem } from '../entities/homeFrontInterfaces';
import { validatePermitions } from '@/commons/constants/envConstants';
import type { IPermitions } from '@/commons/entities/global.interfaces';

const serviceItems: IServiceItem[] = reactive(serviceItemsMock);
const contactServiceRef: IServiceItem = reactive(contactService);

const useMapServices = () => {
  const route = useRoute();
  const router: Router = useRouter();
  const getPermitions = ref<IPermitions[]>();

  onBeforeMount(() => {
    getPermitions.value = JSON.parse(localStorage.getItem('permitions')!);
  });

  const hasPermitions = (serviceItem: IServiceItem): boolean => {
    if (!!validatePermitions) {
      if (serviceItem.code === '114') return true;
      if (serviceItem.code === '00') {
        return fatherHasPermition(serviceItem);
      } else {
        return childHasPermition(serviceItem);
      }
    }

    return true;
  };
  const fatherHasPermition = (serviceItem: IServiceItem): boolean => {
    return getPermitions.value!.some((permition: IPermitions) =>
      serviceItem.childs?.some((child) => child.code === permition.code),
    );
  };

  const childHasPermition = (serviceItem: IServiceItem): boolean => {
    return getPermitions.value!.some(
      (permition: IPermitions) =>
        permition.code === serviceItem.code && permition.childs?.length! > 0,
    );
  };

  const navigateTo = (service: IServiceItem): void => {
    if (service.name !== contactService.name) {
      contactServiceRef.showChilds = false;
      contactServiceRef.isActive = false;
    } else {
      const serviceActive: IServiceItem | undefined = serviceItems.find(
        (serviceItem: IServiceItem) => serviceItem.name === route.name,
      );
      if (!!serviceActive) {
        serviceItems.map((serviceItem) => {
          if (serviceItem.name !== service.name) {
            serviceItem.isActive = false;
          }
        });
        serviceActive!.isActive = true;
      }
    }

    serviceItems.map((serviceItem) => {
      if (serviceItem.name !== service.name) {
        serviceItem.showChilds = false;
      }
    });

    if (service.showChilds) {
      service.showChilds = false;
      service.isActive = false;
    } else {
      service.showChilds = true;
      service.isActive = true;
    }

    if (!!service.navigateTo) {
      hasPermitions(service)
        ? router.push(service.navigateTo!)
        : console.log('No permisos');
    }
  };

  watch(
    route,
    (newValue) => {
      contactServiceRef.isActive = false;
      serviceItems.map((serviceItem) => (serviceItem.isActive = false));
      const serviceActive: IServiceItem | undefined = serviceItems.find(
        (serviceItem: IServiceItem) => serviceItem.name === newValue.name,
      );
      if (!!serviceActive) {
        serviceActive!.isActive = true;
      }
    },
    { immediate: true },
  );

  return {
    companyName,
    serviceItems,
    navigateTo,
    contactServiceRef,
    hasPermitions,
  };
};

export default useMapServices;
