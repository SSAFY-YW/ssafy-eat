<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

const auth = useFirebaseAuth()

const router = useRouter()
const userInput = ref({
  email: '',
  password: '',
})

const login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      userInput.value.email,
      userInput.value.password
    )
    router.push('/')
  } catch (error) {
    console.error('로그인 실패:', error)
  }
}

</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">로그인</h1>
    <BaseCard>
      <template v-slot:default>
        <BaseForm>
          <BaseInput
            v-model="userInput.email"
            type="email"
            label="이메일"
            required
            placeholder="이메일 주소를 입력해주세요"
          />
          <BaseInput
            v-model="userInput.password"
            label="비밀번호"
            type="password"
            required
          />
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton @click="login" variant="tonal" color="secondary" outline>
          로그인
        </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>