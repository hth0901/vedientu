import React, { useState, useEffect, useRef } from 'react'
import HtmlEditor from 'components/common/HtmlEditor'
import ChonDiaDiemSuKiens from '../../components/TaoVe/DiaDiemSuKiens'
import { RichTextEditor, SimpleCard } from '../../components'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    FormControlLabel,
    Checkbox,
    Radio,
    FormControl,
    RadioGroup,
    FormLabel,
} from '@material-ui/core'

import 'date-fns'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import notify from 'devextreme/ui/notify'
import { TagBox, TextBox } from 'devextreme-react'
import { useNavigate } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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

const ThemMoiVeThamQuan = (props) => {
    const history = useNavigate()
    const [listPlace, setListPlace] = useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const htmlEditorRef = useRef()
    const tagBoxRef = useRef()
    const txtBoxRef = useRef()
    const numberBoxRef = useRef()
    const [selectedPlace, setSelectedPlace] = useState(null)
    const handleSubmit = (evt) => {
        const htmlContent = htmlEditorRef.current
            .getEditorState()
            .getCurrentContent()
        const htmlData = draftToHtml(convertToRaw(htmlContent))
        const ticketName = txtBoxRef.current.instance.option('value')
        // const dateToExpired = +numberBoxRef.current.value
        const rawData = {
            name: ticketName.replace(/^\s+|\s+$/gm, ''),
            content: htmlData,
            active: true,
            typeValue: 2,
            listPlaceId: '',
            dateToExpired: 0,
        }

        // if (dateToExpired <= 0) {
        //     alert('Hãy nhập số ngày hết hạn cho vé tuyến')
        //     return
        // }

        const lstValue = tagBoxRef.current.instance.option('value')
        if (lstValue.length <= 1) {
            alert('Hãy chọn nhiều địa điểm tham quan')
            return
        }
        const val = lstValue.join(',')
        rawData.listPlaceId = val

        if (!rawData.listPlaceId) {
            alert('Hãy chọn địa điểm tham quan')
            return
        }

        if (!rawData.name) {
            alert('Hãy nhập tên loại vé')
            return
        }

        fetch(`${API_URL}/api/TicketType/themmoi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawData),
        })
            .then((res) => res.text())
            .then((data) => {
                console.log(data)
                if (data) {
                    notify('Tạo loại vé thành công', 'success', 500)
                    history('/admin-tool/quan-ly-ve-tham-quan')
                } else {
                    throw new Error('Proccess Error')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onEditorStateChange = (edtState) => {
        setEditorState(edtState)
    }

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

    const tagboxchangehandler = (evt) => {
        console.log(evt)
    }

    const changePlaceHandler = (evt, val) => {
        setSelectedPlace((val && val.id) || null)
    }

    return (
        <div className="m-sm-30">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <div className="row">
                    {/* <div className="col col-md-4">
                        <SimpleCard title="Loại vé">
                            <FormControl>
                                <RadioGroup
                                    name="loaive"
                                    value={ticketTypeValue}
                                    onChange={changeTypeHandler}
                                >
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio />}
                                        label="Ve don"
                                    />
                                    <FormControlLabel
                                        value={2}
                                        control={<Radio />}
                                        label="Ve tuyen"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </SimpleCard>
                    </div> */}
                    <div className="col col-md-12">
                        <SimpleCard title="Chọn địa điểm">
                            <TagBox
                                ref={tagBoxRef}
                                items={listPlace}
                                displayExpr="title"
                                valueExpr="id"
                                onSelectionChanged={tagboxchangehandler}
                            />
                        </SimpleCard>
                    </div>
                    {/* <div className="col col-md-3">
                        <SimpleCard title="Số ngày sử dụng">
                            <FormControl>
                                <input type="number" ref={numberBoxRef} />
                            </FormControl>
                        </SimpleCard>
                    </div>
                    <div className="col col-md-3">
                        <SimpleCard title="Số ngày hết hạn">
                            <FormControl>
                                <input type="number" />
                            </FormControl>
                        </SimpleCard>
                    </div> */}
                </div>
                <div className="py-3" />
                <div className="row">
                    <div className="col">
                        <SimpleCard title="Tên tuyến">
                            <TextBox ref={txtBoxRef} />
                        </SimpleCard>
                    </div>
                </div>
                <div className="py-3" />
                <div className="row">
                    <div className="col">
                        <SimpleCard title="Nội dung mô tả">
                            <div className="editor" style={{ height: '500px' }}>
                                <Editor
                                    ref={htmlEditorRef}
                                    editorStyle={{ maxHeight: '400px' }}
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
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
                                            uploadCallback: uploadImageCallBack,
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
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    // onClick={() => history(-1)}
                >
                    Hủy
                </button>
            </ValidatorForm>
        </div>
    )
}

export default ThemMoiVeThamQuan
