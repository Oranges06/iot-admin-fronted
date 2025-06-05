import service from '@/utils/request'

export const useNewsApi = (id: number) => {
	return service.get('/new/notice/news/' + id)
}

export const useNewsSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/notice/news', dataForm)
	} else {
		return service.post('/new/notice/news', dataForm)
	}
}
