import { defineStore } from 'pinia'
import type { StorageLike } from 'pinia-plugin-persistedstate'
import { secureSessionStorage } from '@/utils/storageSecure'

const useEditSt: StorageLike = {
    setItem(key: string, value: string) {
        secureSessionStorage.setItem(key, value)
    },
    getItem(key: string): string | null {
        return secureSessionStorage.getItem(key)
    }
}

const useEditStore = defineStore('useEditStore', () => {
    // 当前元素下标
    const currentElementIndex = ref(-1);
    // 问卷表单数组
    const evaluationForm = ref([]);

    const currentElement = computed(() => {
        return evaluationForm.value[currentElementIndex.value];
    })

    const setEvaluationForm = (newEvaluationForm: any) => {
        clearEdit();
        evaluationForm.value = newEvaluationForm
    }

    // 根据index下标获取当前问题在问卷中的序号
    const getQuestionIndex = (index: number) => {
        if (evaluationForm.value[index].groupCode == 2) {
            return -1;
        } else {
            let questionCount = 0;
            for (let i = index; i >= 0; i--) {
                if (evaluationForm.value[i].groupCode == 1) {
                    questionCount++;
                }
            }
            return questionCount;
        }
    }

    // 修改当前元素下标
    const setCurrentQuestionIndex = (newValue: number) => {
        currentElementIndex.value = newValue;
    }

    const clearEdit = () => {
        currentElementIndex.value = -1;
        evaluationForm.value.length = 0;
    }

    return {
        currentElementIndex,
        evaluationForm,
        currentElement,
        setEvaluationForm,
        getQuestionIndex,
        setCurrentQuestionIndex,
        clearEdit,
    }
}, {
    persist: {
        key: 'editInfo',
        storage: useEditSt
    }
}
)

export default useEditStore
