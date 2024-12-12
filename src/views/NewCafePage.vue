<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { collection, addDoc } from "firebase/firestore"; 
import { useFirestore } from 'vuefire'


import { useRouter } from 'vue-router'
const router = useRouter();

const db = useFirestore();

const newCafe = ref({
  name: '',
  rating: 0,
  location: '',
  price: 0,
  favorite: false,
});

async function addCafe() {
  const newDoc = await addDoc(collection(db, "ssafy-cafe"), {
  ...newCafe.value
  });

  if (newDoc.id) {
    router.push('/');
  }
}

</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">카페 추가</h1>
    <BaseCard>
      <template v-slot:default>
        <BaseForm>
          <BaseInput
            v-model="newCafe.name"
            label="Name"
            required
            placeholder="카페명을 입력해주세요"
          />
          <BaseInput
            v-model="newCafe.rating"
            label="Rating"
            type="number"
            min="0"
            max="5"
            step="0.5"
            required
          />
          <BaseInput v-model="newCafe.location" label="Location" required />
          <BaseInput
            v-model.number="newCafe.price"
            label="Price"
            type="number"
            required
          />
          <BaseCheckbox v-model="newCafe.favorite" label="Favorite" />
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton @click="addCafe" variant="tonal" color="success">
          생성
        </BaseButton>
        <BaseButton variant="tonal" color="error" outline> 취소 </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>