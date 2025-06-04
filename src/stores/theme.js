import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // STATE
  const theme = ref("dark");

  // GETTERS/COMPUTED
  const isDark = computed(() => theme.value === "dark");

  // ACTIONS
  function setTheme(newTheme) {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
    // para quitar o aplicar clase .dark en HTML
    if (newTheme === 'light') {
        document.documentElement.classList.add('light')
    } else {
        document.documentElement.classList.remove('light')
    }
  }

  function toggleTheme() {
    const newTheme = theme.value === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  function initTheme() {
    const stored = localStorage.getItem("theme");
    setTheme(stored || "dark");
  }

  return {
    //state
    theme,
    //getters/computed
    isDark,
    //actions
    setTheme,
    toggleTheme,
    initTheme,
  };
});
