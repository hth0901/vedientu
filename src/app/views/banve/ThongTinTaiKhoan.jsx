import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SimpleCard } from 'app/components'
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@material-ui/core'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import notify from 'devextreme/ui/notify'

import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@material-ui/core'
import {useDispatch, useSelector } from 'react-redux'

const BASE_URL = process.env.REACT_APP_URL

const ThongTinTaiKhoan = (props) => {
    const [listUser,setListUser]=useState([])
    const [user, setUser] = useState({})
    const { arrRoles } = useSelector((state) => {
        return state.auth
    })
    const [i,seti]=useState(0); 
    const [pass1,setPass1]=useState();
    const [pass2,setPass2]=useState();
    const [message,setMessage] = useState ({display:'none'})
    const [popupVisible,setPopupVisible]= useState(false);
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/Employee`)
                setListUser(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const changeInputValue1 = (e)=>{      
        setPass1(e.target.value)
    }
    const changeInputValue2 = (e)=>{
        setPass2(e.target.value)
    }
    const OnSubmit = ()=>{
        if(pass1!=pass2){
            setMessage({textAlign:"center",color:'red'})
        }
        else {
            const index = listUser.findIndex(item=>item.userName==user.username);
            var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const updateObj = {
            id: listUser[index].id,
            username: user.userName,
            password: pass1,
            roleid: user.roleId,
        }
        
        var raw = JSON.stringify(updateObj)   
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/account/changepassword`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500);
                setPopupVisible(false);
                setPass1("");
                setPass2("");
                setMessage({display:'none'});
            })
            .catch((error) => console.log('error', error))


        }
    }
    

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUser(items);
            seti(items.roleid);
        }
      }, []);    
    return (
        <div className='m-sm-30'>
        <div className='row'>
      <div className='col'>
        <div id="data-grid-demo">
        
            <SimpleCard title="Thông tin tài khoản">
            <Table className="whitespace-pre">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="px-0">
                                           Thuộc tính
                                        </TableCell>
                                        <TableCell className="px-0">
                                            Thông tin
                                        </TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                 
                                        <TableRow
                                            
                                        >
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                              Tên người dùng
                                            </TableCell>
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                               {user.displayName}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            
                                            >
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                 Tên đăng nhập
                                                </TableCell>
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                   {user.username}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                            
                                            >
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                  Phân quyền
                                                </TableCell>
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                 {arrRoles[i].roleName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                            
                                            >
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                  Mật khẩu
                                                </TableCell>
                                                <TableCell
                                                    className="px-0 capitalize"
                                                    align="left"
                                                >
                                                   <Button
                                                    onClick={()=>{setPopupVisible(true)}}
                                                    style={{ width: '120px' }}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Đổi mật khẩu
                                                </Button>
                                                </TableCell>
                                            </TableRow>
                                </TableBody>
                            </Table>
               
            </SimpleCard>

            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={true}
                title="Thay đổi mật khẩu"
                container=".dx-viewport"
                width={500}
                height={330}
               
            >
                <Position at="middle" my="center" of="" />
                   
                    <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{                      
                        text: 'Lưu',
                        onClick: OnSubmit,
                    }}
                />                         
                    <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'Hủy',
                        onClick: ()=>{setPopupVisible(false)},
                    }}
                />
                 
          <div className="form-group">
            <label htmlFor="text">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="pass2"
              
              onChange={changeInputValue1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Xác nhân mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="pass2"
              
              onChange={changeInputValue2}
            />
          </div>        
                <div style={message}>Mật khẩu không khớp</div>    
            </Popup>
           
        </div>
        </div>
       </div>
        </div>
    )
}

export default ThongTinTaiKhoan
