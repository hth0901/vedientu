import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DataGrid, {
    Column,
    Editing,
    Paging,
    Pager,
    Toolbar,
    Button,
    Item,
    SearchPanel,
    
} from 'devextreme-react/data-grid'
import Button2 from 'devextreme-react/button'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { Icon } from '@material-ui/core'
import { SimpleCard } from 'app/components'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import notify from 'devextreme/ui/notify'
// import {useSelector,useDispatch } from "react-redux";
// import {getDiaDiem} from "../../redux/actions/DiaDiemAction"
// import {getAnh} from "../../redux/actions/AnhAction"
import axios from 'axios'
import Editor from 'app/components/HtmlEditor/Editor'
import ScrollView from 'devextreme-react/scroll-view';


const BASE_URL = process.env.REACT_APP_URL
const DiaDiem = (props) => {
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

    // const dispatch = useDispatch();
    // const diadiem = getDiaDiem();
    // const anh = getAnh();
    // dispatch(diadiem);
    // dispatch(anh);
    // const listTest = useSelector(state=>state.diadiem);
    // const listAnh = useSelector(state=>state.anh);
    const [list, setList] = useState([])
    const [img, setImg] = useState([])
    const [info,setInfo] = useState({});
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/DiaDiem`)
                setList(data.data)
                const data2 = await axios.get(`${BASE_URL}/api/Image`)
                setImg(data2.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    //popup
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupValue, setPopupValue] = useState({})
    const [detailVisible,setDetailVisible] = useState(false)
    const [contentP,setContentP] = useState("");
    const onDelete = (e) => {
        console.log(e);
        setPopupValue(e.row.data)
        setPopupVisible(true)
    }
    const OnSubmit = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DiaDiem/${popupValue.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('X??a ?????a ??i???m th??nh c??ng', 'success', 500)
                const filteredItems = list.filter((item) => item !== popupValue)
                setList(filteredItems)
                setPopupVisible(false)
            })
            .catch((error) => console.log('error', error))
    }
    const OnClose = () => {
        setPopupVisible(false)
    }
    const OnClose2 = () => {
        setDetailVisible(false)
    }
    const EditCell = (Cellvalue) => {
        const thisImage = img.find(
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
                            height: '100px',
                            borderRadius: '6px',
                        }}
                        alt={urlImage}
                        src={`${BASE_URL}/upload/${urlImage}`}
                    />
                </div>
            )
        }
    }
    const onDetail = (e)=>{
        console.log(e.row.data);
        setInfo(e.row.data);
        setDetailVisible(true)
        setContentP(e.row.data.content);
    }
    const addNew = ()=>{
        history("/admin-tool/quanlydiadiem/themmoi");
    }
    const callBackValue = (name, value) => {
       
    }
    return (
        <div className='m-sm-30'>
        <div className='row'>
      <div className='col'>
      <div id="data-grid-demo"> 
        <div id="data-grid-demo">
            <SimpleCard title="Qu???n l?? danh s??ch ?????a ??i???m">   
            <Button2
                                text='Th??m m???i'
                                icon='add'
                                onClick={addNew}/>           
                <DataGrid dataSource={list} keyExpr="id" sorting={false} showBorders={true}>
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
                    <Editing allowDeleting={true} useIcons={true}></Editing>
                    <Column dataField="id" caption="M?? ID" width={60} />
                    <Column
                        dataField="title"
                        caption="T??n ?????a ??i???m"
                        width={230}
                    />
                    <Column dataField="address" caption="?????a ch???" />
                    {/* <Column dataField="content" caption="N???i dung" /> */}
                    <Column
                        dataField="imageID"
                        width={150}
                        cellRender={EditCell}
                        caption="H??nh ???nh"
                    />
                   <Column
                        dataField="active"
                        width={150}
                        caption="S??? d???ng"
                    />
                    <Column type="buttons" width={110}>
                        <Button
                            hint="Xem chi ti???t"
                            icon="info"
                            onClick={onDetail}
                        ></Button>
                        <Button
                            hint="Ch???nh s???a n???i dung"
                            icon="rename"
                            onClick={editColum}
                        />
                        <Button
                            hint="X??a ?????a ??i???m n??y"
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
                X??a ?????a ??i???m:  {popupValue.title} ?
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
                
            >
                <ScrollView>

                <Position at="middle" my="center" of="" />
                <table className="table table-striped " >
  <thead>
    <tr>
      <th scope="col" width={120}>Th??ng tin</th>
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
      <Editor
                                name="ContentEn"
                                valueChanged={callBackValue}
                                dataContent={contentP}
                            ></Editor>
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
                        alt={info.imageUrl}
                        src={`${BASE_URL}/upload/${info.imageUrl}`}
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
        </div>
      
    )
}
export default DiaDiem
