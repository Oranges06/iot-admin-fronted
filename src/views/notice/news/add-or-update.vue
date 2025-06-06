<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
			<el-form-item label="标题" prop="title">
				<el-input v-model="dataForm.title" placeholder="标题"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<el-input v-model="dataForm.content" placeholder="内容"></el-input>
			</el-form-item>
			<el-form-item label="封面" prop="cover">
				<ma-upload-images v-model="dataForm.cover"></ma-upload-images>
			</el-form-item>
			<el-form-item label="租户id" prop="tenantId">
				<el-input v-model="dataForm.tenantId" placeholder="租户id" :disabled="true"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useNewsApi, useNewsSubmitApi } from '@/api/notice/news'
import { useUserStore } from '@/store/modules/user'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const userStore = useUserStore()

const dataForm = reactive({
	id: '',
	title: '',
	content: '',
	cover: '',
	tenantId: userStore.user.id, // 自动设置为当前用户ID
	createTime: '',
	updateTime: '',
	deleted: ''
})

const init = (id?: number) => {
	if (id) {
		getNews(id)
	}
}

const getNews = (id: number) => {
	useNewsApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	title: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	content: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	cover: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	tenantId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		useNewsSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
