import service from '@/utils/request'

export const useMessageApi = (id: number) => {
	return service.get('/new/iot/message/' + id)
}

export const useMessageSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/iot/message', dataForm)
	} else {
		return service.post('/new/iot/message', dataForm)
	}
}