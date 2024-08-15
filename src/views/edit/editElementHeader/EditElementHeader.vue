<template>
    <el-card class="header-box">
        <el-container>
            <el-aside class="left-side alignCenter" width="18rem">
                <el-popover placement="right" trigger="hover">
                    <template #reference>
                        <img class="logo-icon" src="../../../assets/logo.png" alt="图片加载失败" />
                    </template>
                    <div class="allCenter">
                        <span class="logo-title justifyCenter">
                            Author：陶祎祎
                        </span>
                    </div>
                </el-popover>
            </el-aside>
            <el-main class="bothCenter">
                <div>问卷表单生成器</div>
            </el-main>
            <el-aside class="right-side alignCenter" width="18rem">
                <el-button plain icon="Checked" @click="saveSurveyElement">保存</el-button>
                <el-button plain icon="View" @click="goToPreview">预览</el-button>
                <el-button plain @click="goToPreview"><img src="../../../assets/github.svg" alt="图片加载失败" />仓库</el-button>
            </el-aside>
        </el-container>
    </el-card>
</template>

<script lang="ts" setup>
import useEditStore from '@/store/edit';
import { ElMessage } from 'element-plus';

const editStore = useEditStore();

const router = useRouter()

const goToPreview = () => {
    if (editStore.evaluationForm.length == 0) {
        ElMessage({
            message: '请添加至少一个组件再进行预览！',
            type: 'error',
            duration: 4000
        })
        return
    }
    router.push('/survey/preview')
}

const saveSurveyElement = () => {
    ElMessage({
        message: '点击了保存按钮',
        type: 'success',
    })
}

</script>

<style lang="scss" scoped>
.header-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;

    .step-group {
        width: 26rem;
        background-color: white;

        .step-title-active {
            font-size: 15px;
        }

        .step-title {
            font-size: 15px;
            cursor: pointer;
        }
    }

    .left-side {
        justify-content: flex-start;
        padding-left: 1%;

        .logo-icon {
            width: 4.5rem;
        }

        .logo-title {
            font-size: 18px;
            font-weight: bold;
            margin-right: 3%;
        }
    }

    .right-side {
        justify-content: space-around;
        padding-right: 1%;
    }
}

:deep(.el-card__body) {
    width: 100%;
    height: 100%;
    padding: 0px;
    align-content: center;
}

:deep(.el-steps) {
    padding-top: 0px;
    padding-bottom: 0px;
}
</style>