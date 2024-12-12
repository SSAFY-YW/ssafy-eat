<script setup>
import { ref, watch } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import FormLayout from '@/layouts/FormLayout.vue'

import { doc, updateDoc } from "firebase/firestore";
import { useDocument, useFirestore } from 'vuefire';
import { useRoute, useRouter } from 'vue-router';

const db = useFirestore();
const route = useRoute();
const router= useRouter();
const docRef = doc(db, "ssafy-cafe", route.params.id);

const cafeSource = useDocument(docRef);

watch(cafeSource, (cafeSource) => {
  editCafe.value = {
    ...cafeSource,
  }
})

const editCafe = ref({
  name: '',
  location: '',
  rating: 0,
  price: 1,
  description: '',
  favorite: true,
})

async function updateCafe() {
  await updateDoc(doc(db, 'ssafy-cafe', route.params.id), {
    id: route.params.id,
    ...editCafe.value,
  });
  router.push('/');
}

</script>

<template>
  <FormLayout>
    <template v-slot:title>
      <h1 class="mb-4">카페 수정 {{ cafeSource?.name ? cafeSource.name : '' }}</h1>
    </template>
    <template v-slot:content>
      <BaseCard>
        <template v-slot:default>
          <BaseForm v-if="editCafe">
            <BaseInput
              v-model="editCafe.name"
              label="Name"
              required
              placeholder="Cafe with a Vue"
            />
            <BaseInput v-model="editCafe.location" label="Location" required />
            <BaseInput
              v-model.number="editCafe.price"
              label="Price"
              type="number"
              min="1"
              max="4"
              required
            />
            <BaseInput
              v-model="editCafe.rating"
              label="Rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              required
            />
            <BaseInput v-model="editCafe.description" label="Description" />
            <BaseCheckbox v-model="editCafe.favorite" label="Favorite" />
          </BaseForm>
        </template>
        <template v-slot:actions>
          <BaseButton @click="updateCafe" variant="tonal" color="success">
            수정
          </BaseButton>
          <BaseButton to="/" variant="tonal" color="error" outline>
            취소
          </BaseButton>
        </template>
      </BaseCard>
    </template>
  </FormLayout>
</template>

<style></style>