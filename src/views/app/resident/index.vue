<template>
	<!-- <el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card> -->

	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'app:resident:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space v-auth="'app:resident:import'" style="margin-top: 10px">
				<ma-upload-file action="/app/resident/import">
					<el-button plain icon="Upload">导入</el-button>
				</ma-upload-file>
			</el-space>
			<el-space>
				<el-button v-auth="'app:resident:export'" plain icon="Download" @click="downloadHandle('/app/resident/export')">导出</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'app:resident:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>
		<el-table
			v-loading="state.dataListLoading"
			:data="state.dataList"
			border
			class="layout-table"
			show-overflow-tooltip
			@selection-change="selectionChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="主键ID" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="nickname" label="昵称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="avatar" label="头像" header-align="center" align="center"></el-table-column>
			<el-table-column prop="email" label="邮箱" header-align="center" align="center"></el-table-column>
			<el-table-column prop="gender" label="性别：0=未知，1=男，2=女" header-align="center" align="center"></el-table-column>
			<el-table-column prop="status" label="状态：0=禁用，1=正常" header-align="center" align="center"></el-table-column>
			<el-table-column prop="communityId" label="社区ID" header-align="center" align="center"></el-table-column>
			<el-table-column prop="tenantId" label="租户ID" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'app:resident:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'app:resident:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdateRef" v-model:visible="addOrUpdateVisible" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="AppResidentIndex">
import { useCrud } from '@/hooks'
import { reactive, nextTick, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/new/app/resident/page',
	deleteUrl: '/new/app/resident',
	queryForm: {}
})

const queryRef = ref()
const addOrUpdateVisible = ref(false)
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateVisible.value = true
	nextTick(() => addOrUpdateRef.value.init(id))
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, downloadHandle, reset } = useCrud(state)
</script>
