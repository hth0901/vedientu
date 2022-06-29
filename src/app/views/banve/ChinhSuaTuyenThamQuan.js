import React, { useState, useEffect, Fragment, useRef, useReducer } from 'react'
import { SimpleCard } from 'app/components'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Button, Icon, FormControlLabel, Checkbox } from '@material-ui/core'

import 'date-fns'
import FormGroup from '@material-ui/core/FormGroup'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    FormControl,
} from '@material-ui/core'
import notify from 'devextreme/ui/notify'
import { useNavigate, useParams } from 'react-router-dom'
import Button2 from 'devextreme-react/button'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw, ContentState } from 'draft-js'
import { TagBox, TextBox, NumberBox, CheckBox } from 'devextreme-react'
import htmlToDraft from 'html-to-draftjs'
import { useDispatch } from 'react-redux'
import { uiActions } from 'store/ui-slice'

const API_URL = process.env.REACT_APP_URL

const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
        var formdata = new FormData()
        formdata.append('image', file)

        var requestOptions = {
            method: 'POST',
            body: formdata,
        }

        fetch(`${API_URL}/api/TicketType/uploadimage`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                resolve({
                    data: {
                        url: `${API_URL}/${result}`,
                    },
                })
            })
            .catch((error) => reject('chi laj ri'))
    })
}

const tuyenThamQuanReducer = (state, action) => {
    if (action.type === 'GET_DATA') {
        return {
            id: action.data.id,
            name: action.data.name,
            listPlaceId: '6,5,8',
            numberOfDayCanUse: action.data.numberOfDayCanUse,
            dateToExpired: action.data.dateToExpired,
        }
    }

    if (action.type === 'CHANGE_NUMBER') {
        return {
            ...state,
            dateToExpired: action.val,
        }
    }
    if (action.type === 'CHANGE_NAME') {
        return {
            ...state,
            name: action.val,
        }
    }
    if (action.type === 'CHANGE_SELECT') {
        return {
            ...state,
            listPlaceId: action.val,
        }
    }
    return {
        id: 0,
        name: '',
        listPlaceId: '',
        numberOfDayCanUse: 0,
        dateToExpired: 0,
    }
}

const ChinhSuaTuyenThamQuan = (props) => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const [dataState, dispatchData] = useReducer(tuyenThamQuanReducer, {
        id: id,
        name: '',
        listPlaceId: '',
        numberOfDayCanUse: 0,
        dateToExpired: 0,
    })

    const [listPlace, setListPlace] = useState([])
    const [lstPlace, setLstPlace] = useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const tagBoxRef = useRef()
    const numberBoxRef = useRef()
    const htmlEditorRef = useRef()
    const txtBoxRef = useRef()

    useEffect(() => {
        if (listPlace.length > 0) {
            fetch(`${API_URL}/api/TicketType/chitiet/${id}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    const blocksFromHtml = htmlToDraft(data.content || '')
                    const { contentBlocks, entityMap } = blocksFromHtml
                    //   this.state.editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
                    setEditorState(
                        EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                contentBlocks,
                                entityMap
                            )
                        )
                    )
                    const places = []
                    ;(
                        (data.listPlaceId && data.listPlaceId.split(',')) ||
                        []
                    ).forEach((el) => {
                        places.push(+el)
                    })
                    setLstPlace(places)
                    dispatchData({ type: 'GET_DATA', data: { ...data } })
                    // tagBoxRef.current.instance.option('defaultValue', [
                    //     '5',
                    //     '6',
                    //     '8',
                    // ])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [listPlace])

    useEffect(() => {
        fetch(`${API_URL}/api/DiaDiem`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setListPlace(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitHandler = (evt) => {
        evt.preventDefault()
        const htmlContent = htmlEditorRef.current
            .getEditorState()
            .getCurrentContent()
        const htmlData = draftToHtml(convertToRaw(htmlContent))
        // const dateToExpired = +numberBoxRef.current.value
        const rawData = {
            id: dataState.id,
            name: dataState.name.replace(/^\s+|\s+$/gm, ''),
            content: htmlData,
            dateToExpired: dataState.dateToExpired,
        }

        const lstValue = tagBoxRef.current.instance.option('value')

        if (rawData.dateToExpired <= 0) {
            alert('Hãy nhập số ngày hết hạn cho vé tuyến')
            return
        }

        if (lstValue.length <= 1) {
            alert('Hãy chọn nhiều địa điểm tham quan')
            return
        }

        if (!rawData.name) {
            alert('Hãy nhập tên')
            return
        }

        fetch(`${API_URL}/api/TicketType/chinhsua`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawData),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data) {
                    notify('Cập nhật thành công', 'success', 500)
                } else {
                    throw new Error(
                        'Cập nhật không thành công. Vui lòng liên hệ kỹ thuật viên'
                    )
                }
            })
            .catch((err) => {
                notify(err.message, 'danger', 500)
            })
    }

    const onEditorStateChange = (edtState) => {
        setEditorState(edtState)
    }

    const numberBoxChangeHandler = (evt) => {
        dispatchData({ type: 'CHANGE_NUMBER', val: +evt.value })
    }

    const textBoxChangeHandler = (evt) => {
        dispatchData({ type: 'CHANGE_NAME', val: evt.value })
    }

    const tagboxselectedchangehandler = (evt) => {
        // console.log(evt)
        const { addedItems, removedItems } = evt
        if (addedItems.length === 0 && removedItems.length === 0) {
            return
        }
        dispatch(uiActions.setShowLoading(true))
        if (addedItems.length > 0) {
            // console.log(addedItems)
            addedItems.forEach((el) => {
                const updateList = [...lstPlace, +el.id]
                setLstPlace([...updateList])
            })
            fetch(
                `${API_URL}/api/TicketType/themmoichitiet/${id}/${addedItems[0].id}`,
                {
                    method: 'POST',
                }
            )
                .then((res) => res.text())
                .then((data) => {
                    // if (data) {
                    //     const updateList = [...lstPlace, +addedItems[0].id]
                    //     setLstPlace([...updateList])
                    // }
                })
                .finally(() => dispatch(uiActions.setShowLoading(false)))
        }
        if (removedItems.length > 0) {
            const updateList = lstPlace.filter(
                (el) => el !== +removedItems[0].id
            )
            setLstPlace([...updateList])
            fetch(
                `${API_URL}/api/TicketType/xoachitiet/${id}/${removedItems[0].id}`,
                {
                    method: 'DELETE',
                }
            )
                .then((res) => res.text())
                .then((data) => {
                    // if (data) {
                    //     const updateList = lstPlace.filter(
                    //         (el) => el !== +removedItems[0].id
                    //     )
                    //     console.log(updateList)
                    //     setLstPlace([...updateList])
                    // }
                })
                .finally(() => dispatch(uiActions.setShowLoading(false)))
        }
    }

    const tagboxchangehandler = (evt) => {
        console.log(evt)
        // setLstPlace(evt.value)
    }

    return (
        <Fragment>
            <div className="m-sm-30">
                <ValidatorForm onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col col-md-12">
                            <SimpleCard title="Chọn địa điểm">
                                <TagBox
                                    ref={tagBoxRef}
                                    items={listPlace}
                                    displayExpr="title"
                                    valueExpr="id"
                                    onValueChanged={tagboxchangehandler}
                                    onSelectionChanged={
                                        tagboxselectedchangehandler
                                    }
                                    value={lstPlace}
                                    // value={dataState.listPlaceId.split(',')}
                                    // value={['6', '5', '8']}
                                    // defaultValue={lstPlace.split(',')}
                                    showSelectionControls={true}
                                />
                            </SimpleCard>
                        </div>
                        {/* <div className="col col-md-4">
                            <SimpleCard title="Số ngày hết hạn">
                                <FormControl>
                                    <NumberBox
                                        ref={numberBoxRef}
                                        value={dataState.dateToExpired}
                                        onValueChanged={numberBoxChangeHandler}
                                    />
                                </FormControl>
                            </SimpleCard>
                        </div> */}
                        {/* <div className="col col-md-2">
                            <FormControlLabel
                                control={
                                    <CheckBox
                                        // checked={active || false}
                                        name="CheckActive"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                }
                                label="Kích hoạt"
                            />
                        </div> */}
                    </div>
                    <div className="py-3" />
                    <div className="row">
                        <div className="col">
                            <SimpleCard title="Tên tuyến">
                                <TextBox
                                    ref={txtBoxRef}
                                    value={dataState.name}
                                    onValueChanged={textBoxChangeHandler}
                                />
                            </SimpleCard>
                        </div>
                    </div>
                    <div className="py-3" />
                    <div className="row">
                        <div className="col">
                            <SimpleCard title="Nội dung">
                                <div
                                    className="editor"
                                    style={{ height: '500px' }}
                                >
                                    <Editor
                                        ref={htmlEditorRef}
                                        editorStyle={{ maxHeight: '400px' }}
                                        editorState={editorState}
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                        toolbar={{
                                            options: [
                                                'inline',
                                                'blockType',
                                                'fontSize',
                                                'fontFamily',
                                                'list',
                                                'textAlign',
                                                'colorPicker',
                                                'link',
                                                'image',
                                                'remove',
                                                'history',
                                            ],
                                            blockType: {
                                                className:
                                                    'blockType-in-draft-editor',
                                            },
                                            fontSize: {
                                                className:
                                                    'fontSize-in-draft-editor',
                                            },
                                            image: {
                                                popupClassName:
                                                    'popup-upload-in-draft-editor',
                                                uploadCallback:
                                                    uploadImageCallBack,
                                                alt: {
                                                    present: true,
                                                    mandatory: false,
                                                },
                                                previewImage: true,
                                            },
                                        }}
                                    />
                                </div>
                            </SimpleCard>
                        </div>
                    </div>
                    <div className="py-3" />
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <span className="pl-2 capitalize">Lưu lại</span>
                    </Button>
                    <button type="button" className="btn btn-outline-danger">
                        Hủy
                    </button>
                </ValidatorForm>
            </div>
        </Fragment>
    )
}

export default ChinhSuaTuyenThamQuan
