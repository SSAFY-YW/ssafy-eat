<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const newUser = ref({
  email: '',
  password: '',
})

const auth = useFirebaseAuth()

async function createUser() {
    try {
        await createUserWithEmailAndPassword(
            auth,
            newUser.value.email,
            newUser.value.password
        )
        router.push('/')
    } catch (error) {
        console.error('회원가입 실패:', error)
    }
}
</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">회원가입</h1>
    <BaseCard>
      <template v-slot:default>
        <BaseForm>
          <BaseInput
            v-model="newUser.email"
            type="email"
            label="이메일"
            required
            placeholder="이메일 주소를 입력해주세요"
          />
          <BaseInput
            v-model="newUser.password"
            label="비밀번호"
            type="password"
            required
          />
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton @click="createUser" variant="tonal" color="secondary" outline>
          새 사용자 생성
        </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>