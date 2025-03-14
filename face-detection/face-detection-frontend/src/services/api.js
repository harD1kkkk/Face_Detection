const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006'

export const detectFaces = async file => {
	if (!file) {
		throw new Error('No file provided')
	}

	const formData = new FormData()
	formData.append('file', file)

	try {
		const response = await fetch(`${API_BASE_URL}/api/face/detect`, {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to detect faces')
		}

		return await response.json()
	} catch (error) {
		throw new Error(error.message || 'Network error occurred')
	}
}
