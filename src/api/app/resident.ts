import service from '@/utils/request'

export const useResidentApi = (id: number) => {
	return service.get('/new/app/resident/' + id)
}

export const useResidentSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/app/resident', dataForm)
	} else {
		return service.post('/new/app/resident', dataForm)
	}
}