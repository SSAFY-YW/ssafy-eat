<script setup>
import { ref, computed } from 'vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import CafeCard from '@/components/CafeCard.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { useFirestore, useCollection } from 'vuefire'
const db = useFirestore();
const q = query(collection(db, "ssafy-cafe"));

const cafeCollection = useCollection(collection(db, "ssafy-cafe"));

// Original
// const querySnapshot = await getDocs(q);
// onSnapshot(q, (querySnapshot) => {
//   cafeCollection.value = [];

//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
//   cafeCollection.value.push(doc.data());
// })
// });

// const cafeCollection = ref([
//   {
//     id: '413a9451-1b56-4219-86d7-2334c84beaac',
//     name: '씨푸드',
//     location: '피자*',
//     price: 1,
//     rating: 4,
//     favorite: true,
//     description: '',
//   },
//   {
//     id: 'c686d673-34d3-4bff-983a-759bca3d0e20',
//     name: '포테이토',
//     location: '도*노',
//     price: 2,
//     rating: 3.5,
//     favorite: false,
//     description: '',
//   },
//   {
//     id: '64596986-ba74-4238-b754-dc186656a654',
//     name: '존스 페이버릿',
//     location: '파파*스',
//     price: 4,
//     rating: 5,
//     favorite: true,
//     description: '',
//   },
//   {
//     id: 'dd1b89d7-aec8-4968-aac8-c4c0281a9103',
//     name: "아보카도 새우",
//     location: '도*노',
//     price: 3,
//     rating: 0,
//     favorite: false,
//     description: '',
//   },
// ])

const filterParams = ref({
  text: '',
  favorite: false,
})

const filteredCafes = computed(() => {
  return cafeCollection.value.filter((cafe) => {
    return (
      cafe.name.toLowerCase().includes(filterParams.value.text.toLowerCase()) &&
      (filterParams.value.favorite ? cafe.favorite : true)
    )
  })
})
</script>

<template>
  <SidebarLayout>
    <template v-slot:sidebar>
      <v-container>
        <h2 class="mb-4">필터</h2>
        <v-form>
          <v-text-field v-model="filterParams.text" label="가게명" />
          <v-checkbox v-model="filterParams.favorite" label="즐겨찾기유무" />
        </v-form>
      </v-container>
    </template>

    <template v-slot:main>
      <v-container>
        <h2 class="mb-4">목록</h2>
        <CafeCard
          v-for="cafe in filteredCafes"
          v-bind="cafe"
          :docId="cafe.id"
          :key="cafe.id"
        />
      </v-container>
    </template>
  </SidebarLayout>
</template>

<style></style>
