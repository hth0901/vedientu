import { ContinuousColorLegend } from 'react-vis'
import { tourActions } from './tour-slice'

const API_URL = process.env.REACT_APP_URL

export const truyvanDanhSachTour = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`https://www.hueworldheritage.org.vn/desktopModules/APITinBai/API/v1/News/getListNewsbyCateID?categoryId=F19D0328-979A-46FB-B080-AE6800B5B500`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            const data1 = data['newsList']
            
            return data1
        }

        try {
            const tourData = await getData()
            
            dispatch(
                tourActions.truyvanDanhSachTour({
                    items: tourData, 
                })
                
                
            )
        } catch (error) {}
    }
}
