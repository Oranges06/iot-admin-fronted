<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="用户名" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
  </el-form-item>
  <el-form-item label="头像" prop="avatar">
      <el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
  </el-form-item>
  <el-form-item label="性别：0=未知，1=男，2=女" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别：0=未知，1=男，2=女"></el-input>
  </el-form-item>
  <el-form-item label="状态：0=禁用，1=正常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态：0=禁用，1=正常"></el-input>
  </el-form-item>
  <el-form-item label="社区ID" prop="communityId">
      <el-input v-model="dataForm.communityId" placeholder="社区ID"></el-input>
  </el-form-item>
  <el-form-item label="租户ID" prop="tenantId">
      <el-input v-model="dataForm.tenantId" placeholder="租户ID"></el-input>
  </el-form-item>
  <el-form-item label="账号" prop="account">
      <el-input v-model="dataForm.account" placeholder="账号"></el-input>
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
import { useResidentApi, useResidentSubmitApi } from '@/api/app/resident'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	username: '',
	password: '',
	mobile: '',
	nickname: '',
	avatar: '',
	email: '',
	gender: '',
	status: '',
	communityId: '',
	tenantId: '',
	account: '',
	createTime: '',
	updateTime: '',
	deleted: ''})

const init = (id?: number) => {
	if (id) {
		getResident(id)
	}
}

const getResident = (id: number) => {
	useResidentApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	username: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	password: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mobile: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	nickname: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	avatar: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	email: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	gender: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	communityId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	tenantId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	account: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useResidentSubmitApi(dataForm).then(() => {
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
