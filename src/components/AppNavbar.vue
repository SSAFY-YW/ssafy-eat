<script setup>

import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { signOut } from '@firebase/auth'

const user = useCurrentUser()
console.log(user)

const auth = useFirebaseAuth()

async function signOutOfFirebase() {
  signOut(auth)
    .then(() => {
      console.log('로그아웃 성공!')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <v-app-bar color="teal">
    <v-app-bar-title>SSAFY Eats</v-app-bar-title>
    <v-spacer></v-spacer>
    <nav class="pr-4">
      <v-btn to="/">홈</v-btn>
      <v-btn to="/new">생성</v-btn>
      <v-btn to="/sign-in">회원가입</v-btn>

      <v-btn v-if="user?.email" @click="signOutOfFirebase">로그아웃</v-btn>
      <v-btn v-else to="/log-in">로그인</v-btn>
    </nav>
  </v-app-bar>
</template>

<style></style>
