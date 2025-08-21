import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import axios from 'axios'

export const useMainStore = defineStore("useMainStore", () => {
  const userName = ref("Admin");
  const userEmail = ref("");
  const userAvatar = computed(
    () =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
        /[^a-z0-9]+/gi,
        "-"
      )}`
  );
  const isFieldFocusRegistered = ref(false);
  const clients = ref([]);
  const history = ref([]);
  function setUser(payload: any) {
    userName.value = "admin";
  }
  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser
  };
});
