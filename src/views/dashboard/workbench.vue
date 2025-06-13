<template>
	<el-card>
		<el-row :gutter="20" justify="space-between">
			<el-col :span="15">
				<div style="display: flex; flex-direction: row">
					<el-avatar :size="60" :src="userStore.user.avatar" />
					<div style="display: flex; flex-direction: column; margin-left: 20px; line-height: 28px">
						<h1>早安，{{ userStore.user.realName }}，祝你开心每一天!</h1>
						<div>今日晴，25℃ - 28℃！</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</el-card>
	<br />
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>
