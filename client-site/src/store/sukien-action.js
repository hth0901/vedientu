import { ContinuousColorLegend } from 'react-vis'
import { sukienActions } from './sukien-slice'

const API_URL = process.env.REACT_APP_URL

export const truyvanDanhSachSuKien = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`https://www.hueworldheritage.org.vn//desktopModules/APITinBai/API/v1/Events/getEventsByCategory?theloai=d7167cf0-03a5-ec11-bd7f-fdff21248bcb`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            const data1 = data['events']
          
            return data1
        }

        try {
            const sukienData = await getData()
        
            sukienData.forEach((el) => {
                el.imageUrl = el.imgposter.url;
                
            })
           
            
            dispatch(
                sukienActions.truyvanDanhSachSuKien({
                    items: sukienData,
                    
                })
                
            )
        } catch (error) {}
    }
}
