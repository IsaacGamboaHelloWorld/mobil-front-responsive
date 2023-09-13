import { useMutation, useQuery } from '@tanstack/vue-query';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import type { ICategory, IImageR } from '../entities/authInterfaces';
import { useAuthStore } from '../store/useAuthStore';
import useAuthServices from '../services/useAuthServices';
import useLogout from '@/commons/helpers/useLogout';
import i18n from '@/locales/i18n';
import { responseCodes } from '@/commons/constants/responseCodes';

const useImages = () => {
  const authStore = useAuthStore();
  const { fetchLogout } = useLogout();

  const isDisabled = ref<boolean>(true);
  const categoryList = ref<string[]>([]);
  const imagesList = ref<{ name: string; encodedImageFile: string }[]>([]);
  const imageWasUsedBefore = ref<boolean>(false);
  const usedImageMEssage = i18n.global.t('AUTH-MODULE.STEPS.IMAGES.USED-IMAGE');

  const { getCategories, getImages, changeImage } = useAuthServices();
  const {
    displayConfirmationModal,
    hasConfirmed,
    selectedImage,
    selectedCategory,
    images,
    categories,
    messageError,
    codeError,
    alertIsClosed,
    isBlocked,
  } = storeToRefs(authStore);

  const cleandFields = (): void => {
    hasConfirmed.value = false;
    isDisabled.value = true;
    displayConfirmationModal.value = false;
    selectedCategory.value = '';
    selectedImage.value = '';
    categoryList.value = [];
    images.value = [];
    categories.value = [];
    imagesList.value = [];
  };

  const { refetch: fetchCategories } = useQuery(
    ['get categories', 'spinner'],
    getCategories,
    {
      enabled: false,
      onSuccess: (data: ICategory) => {
        categories.value = data.response!;
        categoryList.value = categories.value.map((item) => item.value);
      },
    },
  );

  onBeforeMount(() => {
    if (categories.value.length === 0) {
      fetchCategories();
    } else {
      return;
    }
  });

  const { refetch: fetchImages, isFetching: isImagesFetching } = useQuery(
    ['get images', 'spinner'],
    () => getImages(getCategorieId.value),
    {
      enabled: false,
      onSuccess: (data: IImageR) => {
        isDisabled.value = true;
        images.value = data.response!;
        imagesList.value = images.value.map((item) => ({
          name: item.name,
          encodedImageFile: item.encodedImageFile,
        }));
      },
    },
  );

  const getCategorieId = computed(() => {
    if (!!selectedCategory.value.length) {
      return categories.value.filter(
        (item) => item.value === selectedCategory.value,
      )[0].id;
    }
    return '';
  });

  const getImageId = computed(() => {
    return images.value.filter((item) => item.name === selectedImage.value)[0]
      .imageFileName;
  });

  const changeImageMutation = useMutation(
    ['spinner'],
    (selectedImageName: string) => changeImage(selectedImageName),
    {
      onSuccess: () => {
        isBlocked.value = false;
        hasConfirmed.value = true;
      },
      onError: (error: any) => {
        toggleModal();
        messageError.value = error.response.data.messageDev!;
        codeError.value = error.response.data.code;
        alertIsClosed.value = false;
      },
    },
  );

  watch(selectedImage, () => {
    if (selectedImage) {
      imageWasUsedBefore.value = false;
      isDisabled.value = false;
      codeError.value = '';
    } else isDisabled.value = true;
  });

  watch(codeError, (code) => {
    if (code === responseCodes.auth.changeImage.imageWasUsedBefore)
      imageWasUsedBefore.value = true;
    isDisabled.value = false;
  });

  watch(selectedCategory, () => {
    fetchImages();
  });

  const toggleModal = (): void => {
    displayConfirmationModal.value = !displayConfirmationModal.value;
  };

  const confirmImage = (): void => {
    changeImageMutation.mutate(getImageId.value);
  };

  const cancel = (): void => {
    authStore.resetAuthStore();
    cleandFields();
    fetchLogout();
  };

  return {
    isDisabled,
    hasConfirmed,
    displayConfirmationModal,
    categoryList,
    selectedCategory,
    imagesList,
    selectedImage,
    confirmImage,
    cancel,
    toggleModal,
    messageError,
    codeError,
    alertIsClosed,
    isImagesFetching,
    usedImageMEssage,
    imageWasUsedBefore,
  };
};

export default useImages;
