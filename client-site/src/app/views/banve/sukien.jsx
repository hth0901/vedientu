import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import DataGrid, {
    Column,
    Paging,
    Button,
    Pager,
    Toolbar,
    Item,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import { Icon } from '@material-ui/core'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import notify from 'devextreme/ui/notify'
import Button2 from 'devextreme-react/button'
import ScrollView from 'devextreme-react/scroll-view';
import Editor from 'app/components/HtmlEditor/Editor'




const BASE_URL = process.env.REACT_APP_URL

const SuKien = (props) => {
    const history = useNavigate()
    async function editColum(e) {
        history(`${e.row.data.id}/chinhsua`)
    }
    //state paging
    const allowedPageSizes = [5, 10, 'all']
    const pageState = {
        displayMode: 'full',
        showPageSizeSelector: true,
        showInfo: true,
        showNavButtons: true,
    }
    // get lisst place api
    const [list, setList] = useState([])
    const [images, setImages] = useState([])
    const [info,setInfo] = useState({});
    const [detailVisible,setDetailVisible] = useState(false)
    const [avatar,setAvatar] = useState("")
    const [contentP,setContentP]=useState("");
    const OnClose2 = () => {
        setDetailVisible(false)
    }
    const onDetail = (e)=>{
        setAvatar(e.row.data.listImage[0])
        setInfo(e.row.data);
        setDetailVisible(true)
        setContentP(e.row.data.content)
    }
    const callBackValue = (name, value) => {
       
    }
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/SuKien`)
                setList(data.data)
                const data2 = await axios.get(`${BASE_URL}/api/Image`)
                setImages(data2.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    //popup
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupValue, setPopupValue] = useState({})

    const onDelete = (e) => {
        setPopupValue(e.row.data)
        setPopupVisible(true)
    }
    const OnSubmit = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/SuKien/${popupValue.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('X??a s??? ki???n th??nh c??ng', 'success', 500)
                const filteredItems = list.filter((item) => item !== popupValue)
                setList(filteredItems)
                setPopupVisible(false)
            })
            .catch((error) => console.log('error', error))
    }
    const OnClose = () => {
        setPopupVisible(false)
    }
    const EditCell = (Cellvalue) => {
        const thisImage = images.find(
            (item) => item.id.toString() === Cellvalue.value.toString()
        )
        if (thisImage === undefined) {
            return null
        } else {
            const urlImage = thisImage.url.trim()
            return (
                <div>
                    <img
                        style={{
                            width: '130px',
                            height: '90px',
                            borderRadius: '6px',
                        }}
                        alt={urlImage}
                        src={`${BASE_URL}/upload/${urlImage}`}
                    />
                </div>
            )
        }
    }
    const addNew = ()=>{
        history("/admin-tool/quanlysukien/themmoi");
    }
   
    
    return (
        <div className='m-sm-30'>
        <div className='row'>
      <div className='col'>
        <div id="data-grid-demo">
            <SimpleCard title="Danh s??ch s??? ki???n">
            <Button2
                text='Th??m m???i'
                                icon='add'
                                onClick={addNew}/>
                                
                <DataGrid dataSource={list} sorting={false} keyExpr="id" showBorders={true}>
                <SearchPanel visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        displayMode={pageState.displayMode}
                        showPageSizeSelector={pageState.showPageSizeSelector}
                        showInfo={pageState.showInfo}
                        showNavigationButtons={pageState.showNavButtons}
                    />
                    <Column dataField="id" caption="M?? ID" width={60} />

                    <Column dataField="title" caption="T??n s??? ki???n" />
                    <Column dataField="address" caption="?????a ch???" />
                    {/* <Column dataField="content" caption="N???i dung" /> */}
                    <Column
                        dataField="open_date"
                        caption="Ng??y t??? ch???c"
                        dataType="date"
                        width={120}
                    />
                    <Column
                        dataField="imageID"
                        width={150}
                        cellRender={EditCell}
                        caption="H??nh ???nh"
                    />
                      <Column
                        dataField="active"
                        width={80}
                        caption="S??? d???ng"
                    />
                    <Column type="buttons" width={110}>
                    <Button
                            hint="Xem chi ti???t"
                            icon="info"
                            onClick={onDetail}
                        ></Button>
                        <Button
                            hint="Clone"
                            icon="rename"
                            onClick={editColum}
                        />
                        <Button
                            hint="X??a s??? ki???n n??y"
                            icon="clear"
                            onClick={onDelete}
                        ></Button>
                    </Column>
                   
                </DataGrid>
                
            </SimpleCard>
            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={false}
                title="X??a d??? li???u n??y"
                container=".dx-viewport"
                width={300}
                height={120}
            >
                <Position at="middle" my="center" of="" />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="before"
                    options={{
                        icon: 'clear',
                        text: 'X??a',
                        onClick: OnSubmit,
                    }}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'H???y',
                        onClick: OnClose,
                    }}
                />
             X??a s??? ki???n:  {popupValue.title} ?
            </Popup>
            <Popup
                visible={detailVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={true}
                title={"Th??ng tin: " +info.title}
                container=".dx-viewport"
                width={800}
                height={500}
                scroll={true}
            >
                 <ScrollView width='100%' height='100%'>
                 <Position at="middle" my="center" of="" />
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col" width={100}>Th??ng tin</th>
      <th scope="col">D??? li???u</th>    
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">T??n ?????a ??i???m</th>
      <td>{info.title}</td>
     
    </tr>
    <tr>
      <th scope="row">?????a ch???</th>
      <td>{info.address}</td>
     
    </tr>
    <tr>
      <th scope="row">M?? t???</th>
      <td>
      <Editor
                                name="ContentEn"
                                valueChanged={callBackValue}
                                dataContent={contentP}
                            ></Editor>
          
         </td>    
    </tr>
    <tr>
      <th scope="row">H??nh ???nh ?????i di???n</th>
      <td>
      <img
                        style={{
                            width: '130px',
                            height: '100px',
                            borderRadius: '6px',
                        }}
                        alt={avatar}
                        src={`${BASE_URL}/upload/${avatar}`}
                    />
       </td>    
    </tr>
    <tr>
      <th scope="row">Kinh ?????-V?? ?????</th>
      <td>{info.lattitude}-{info.longtidute}</td>    
    </tr>
  </tbody>
</table>
         
                 </ScrollView>
                 <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'H???y',
                        onClick: OnClose2,
                    }}
                />
            </Popup>
        </div>
           </div>
       </div>
        </div>
    )
}
export default SuKien
