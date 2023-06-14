import { useRouter } from "vue-router";
import clipboard3 from "vue-clipboard3";
import { showToast } from "vant";

const tools = {}

tools.jump = (path) => {
    const router = useRouter();
    router.push(path);
}

tools.copy = async (text) => {
    const { toClipboard } = clipboard3();
    try {
        await toClipboard(text);
        showToast("复制成功~")
    } catch (error) {
        showToast("复制失败~")
    }
}

export default tools