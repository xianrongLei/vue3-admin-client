<script lang="ts">
import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  created() {
    const { params, query } = useRoute();
    const { path } = params;
    const router = useRouter();
    console.log(`/${path}`);
    router.replace({ path: `/${path}`, query }).catch((err) => {
      console.warn(err);
    });
  },
  render() {
    return h("div");
  }
});
</script>
