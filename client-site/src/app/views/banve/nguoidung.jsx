import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Form,
    FormItem,
    RequiredRule,
    EmailRule,
    Lookup,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import {  Position, ToolbarItem } from 'devextreme-react/popup'
import { Popup as PopupNew } from  'devextreme-react/popup'
import TextBox from 'devextreme-react/text-box';

const BASE_URL = process.env.REACT_APP_URL

const NguoiDung = (props) => {
    //state paging
    // get lisst place api
    const [list, setList] = useState([])

    const { arrRoles } = useSelector((state) => {
        return state.auth
    })
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/Employee`)
                setList(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const updateting = async (e) => {
        console.log(e);
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = await e.oldData
        console.log(doituong)
        const updateObj = {
            id: doituong.id,
            username: doituong.userName,
            password: doituong.passWord,
            roleid: doituong.roleId,
            fullName: doituong.displayname,
        }

        var raw = JSON.stringify(updateObj)

        // console.log(updateObj)
        // return
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/account/editaccount`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Ch???nh s???a th??nh c??ng', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const inserting = (e) => {
        e.data.FullName = e.data.displayname
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // const newUser = {
        //   FullName: state.username,
        //   RoleID: 8,
        //   UserName: state.email,
        //   PassWord: state.password
        // }
        var raw = JSON.stringify(e.data)
        console.log(e.data)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/Account/register`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const user = JSON.parse(result)
                if (user.token === undefined) {
                    notify('Th??m m???i th???t b???i', 'error', 500)
                } else {
                    fetch(`${BASE_URL}/api/Employee`, requestOptions)
                        .then((response2) => response2.text())
                        .then((result2) => {
                            notify('Th??m m???i th??nh c??ng', 'success', 500)
                        })
                        .catch((error2) => console.log('error', error2))
                }
            })
            .catch((error) => console.log('error', error))
    }
    const removing = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }
        console.log(e)
        fetch(`${BASE_URL}/api/Employee/${e.data.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('X??a th??nh c??ng', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const setColor = (value) => {
        if (value === 'Admin') return 'primary'
        if (value === 'B??n v??') return 'secondary'
        if (value === 'So??t v??') return 'default'
        if (value === 'Kh??ch h??ng') return 'default'
    }
    const buttonRole = (e) => {
        return (
            <Button
                style={{ width: '120px' }}
                variant="contained"
                color={setColor(e.displayValue)}
            >
                {e.displayValue}
            </Button>
        )
    }
    const onDetail = (e) => {
        setPopupValue(e.data)
        setPopupVisible(true)
    }
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupValue, setPopupValue] = useState({})
    // CHINH SUA POP UP T???I ????Y
    const OnClose = () => {
        setPopupVisible(false)
    }

    const setRole = (e) => {
        RoleList.forEach((item) => {
            console.log('rolelist', item.id)
            console.log('e', e)
            if (item.id === e) return item.name
        })
    }
    console.log('list', list)
    return (
        <div className="m-sm-30">
            <div className="row">
                <div className="col">
                    <div id="data-grid-demo">
                    <div id="password"></div>
                        <SimpleCard  title="Qu???n l?? ng?????i d??ng">
                            <DataGrid
                                dataSource={list}
                                keyExpr="id"
                                showBorders={true}
                                onRowUpdating={updateting}
                                onRowRemoving={removing}
                                onRowInserting={inserting}
                                onRowClick={onDetail}
                                sorting={false}
                            >
                                <SearchPanel visible={true} />

                                <Paging enabled={false} />
                                <Editing
                                    mode="popup"
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                    useIcons={true}
                                    texts={{
                                        confirmDeleteMessage:
                                            'B???n mu???n x??a d??? li???u n??y',
                                    }}
                                >
                                    <Popup
                                        title="Th??ng tin ng?????i d??ng"
                                        showTitle={true}
                                        width={500}
                                        height={400}
                                    />
                                    <Form>
                                        <Item
                                            itemType="group"
                                            colCount={2}
                                            colSpan={2}
                                        >
                                            <Item
                                                dataField="displayname"
                                                colSpan={2}
                                                disabled={false}
                                            />
                                            <Item
                                                dataField="roleId"
                                                colSpan={2}
                                            />
                                            <Item
                                                dataField="userName"
                                                colSpan={2}
                                            />
                                            {/* <TextBox 
                                            dataField="passWord"
                                            mode="password"
                                                        placeholder="Nh???p m???t kh???u"
                                                        showClearButton={true}
                                                        />  */}
                                            <Item
                                                dataField="passWord"
                                                colSpan={2}
                                                
                                            >
                                                
                                        </Item>
                                        </Item>
                                        {/* <Item itemType="group" colSpan={2}>
                                            <Item
                                                dataField="description"
                                                editorType="dxTextArea"
                                            />
                                        </Item> */}
                                    </Form>
                                </Editing>
                                {/* <Column
                                    dataField="id"
                                    caption="M?? ID"
                                    width={60}
                                /> */}
                                <Column
                                    dataField="displayname"
                                    caption="T??n ?????i t?????ng"
                                />
                                {/* <Column
                                    dataField="description"
                                    caption="N???i dung ??p d???ng"
                                /> */}
                                <Column
                                    dataField="userName"
                                    caption="T??n t??i kho???n"
                                    width={230}
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="passWord"
                                    caption="M???t kh???u"
                                    width={230}
                                    visible={false}
                                   
                                >
                                     
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="roleId"
                                    caption="Ph??n quy???n"
                                    cellRender={buttonRole}
                                    width={150}
                                >
                                    <Lookup
                                        dataSource={arrRoles}
                                        valueExpr="id"
                                        displayExpr="roleName"
                                    />
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="active"
                                    caption="S??? d???ng"
                                    visible={false}
                                    width={100}
                                >
                                    ,
                                </Column>
                            </DataGrid>
                        </SimpleCard>

                        <PopupNew
                            visible={popupVisible}
                            dragEnabled={false}
                            closeOnOutsideClick={false}
                            showCloseButton={false}
                            showTitle={false}
                            title="Chi ti???t"
                            container=".dx-viewport"
                            width={400}
                            height={300}
                        >
                            <Position at="middle" my="center" of="" />
                            <h5> Th??ng tin t??i kho???n</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Th??ng tin</th>
                                        <th scope="col">Chi ti??t</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>T??n t??i kho???n</td>
                                        <td>{popupValue.userName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{popupValue.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ToolbarItem
                                widget="dxButton"
                                toolbar="bottom"
                                location="after"
                                options={{
                                    text: 'OK',
                                    onClick: OnClose,
                                }}
                            />
                        </PopupNew>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NguoiDung

const RoleList = [
    {
        id: 9,
        name: 'Ph???c v???',
    },
    {
        id: 8,
        name: 'B??n v??',
    },
    {
        id: 5,
        name: 'Admin',
    },
    {
        id: 7,
        name: 'So??t v??',
    },
]

// const RoleList = [
//   {
//     id:5,
//     name: "Admin"
//   },
//   {
//     id:7,
//     name: "B??n v??"
//   },
//   {
//     id:8,
//     name: "So??t v??"
//   },
//   {
//     id:9,
//     name: "Ph???c v???"
//   }
// ]
