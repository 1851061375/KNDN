/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import { getBase64 } from '../../../helpers/ultis'

import {

  Form,
  Button,
  Input,
  Typography,
  Select,
  Upload,
} from 'antd'
import { useIntl } from 'react-intl'
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload
const { Text } = Typography

const ContactPage = () => {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
    // labelAlign: 'left',
  }
  const [disable, setDisable] = useState(false)
  const [linhVuc, setLinhVuc] = useState([])
  const [form] = Form.useForm()
  const [chuDe, setChuDe] = useState([])
  const [fileUpload, setFileUpload] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      var body = {
        soLuong: 20,
        phanTrang: 0,
        sapXep: '',
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachChuDe', body)
      let data = res?.data?.chuDe ?? []
      console.log(data)
      setChuDe(data)
    }
    try {
      fetchData()
    } catch (error) { }
    return () => {
      setChuDe([])
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      var body = {
        soLuong: 20,
        phanTrang: 0,
        sapXep: '',
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachLinhVuc', body)
      let data = res?.data?.linhVuc ?? []
      console.log(data)
      setLinhVuc(data)
    }
    try {
      fetchData()
    } catch (error) { }
    return () => {
      setLinhVuc([])
    }
  }, [])
  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue(true)
      let chuDeId = formData.ChuDeID
      let chuDeModel = chuDe.find((i) => (i.ID = chuDeId))
      console.log(chuDeModel)
      if (fileUpload.length > 0) {
        fileUpload.map(async (i, index) => {
          let tmp = await getBase64(i)
          tmp = tmp.substring(tmp.indexOf('base64,') + 7, tmp.length)
          if (index == 0) {
          }
        })
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title text-primary'>
          <span className='fad fa-envelope-open-text text-primary me-3 mt-0'></span>Li??n h???
        </div>
      </div>
      <div className='card-body'>

      
      <h3>Qu?? v??? c?? b???t k??? ?? ki???n ????ng g??p g?? xin li??n h??? qua form d?????i ????y: </h3>
      <Form {...layout} form={form} style={{paddingTop :"30px", paddingBottom : "20px" ,marginBottom:"20px"}}>
        <Form.Item
          name='HoVaTen'
          label='H??? v?? t??n'
          rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='H??? v?? t??n'
          />
        </Form.Item>
        <Form.Item
          name='Email'
          label='Email'
          rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='DienThoai'
          label='??i???n tho???i'
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='??i???n tho???i'
          />
        </Form.Item>
        <Form.Item
          name='TieuDe'
          label='Ti??u ?????'
          rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Ti??u ?????'
          />
        </Form.Item>
        <Form.Item
          name='NoiDung'
          label='N???i dung'
          rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}
        >
          <TextArea
            row={3}
            disabled={disable}
            style={{ width: '100%', borderRadius: 5 }}
            placeholder='N???i dung g??p ??'
          />
        </Form.Item>
        {/* <Form.Item label='????nh k??m'>
          <Dragger {...uploads}>
            <p className='ant-upload-text'>Th??? t???p tin ho???c nh???p chu???t ????? t???i l??n</p>
            <p className='ant-upload-hint'>????nh k??m</p>
          </Dragger>
        </Form.Item> */}
        <div className='text-center pb-2'>
          <Button
            key='Ok'
            type='primary'
            htmlType='submit'
            size='middle'
            style={{
              borderRadius: 5,
              padding: '5px 12px',
              width: 110,
              marginRight: 20,
              backgroundColor: '#34bfa3',
              borderColor: '#34bfa3',
            }}
            icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
            onClick={() => {
              handleOk()
            }}
          >
            <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'G???i'}</Text>
          </Button>
          <Button
            key='Cancle'
            type='primary'
            size='middle'
            style={{
              borderRadius: 5,
              width: 110,
              padding: '5px 12px',
              backgroundColor: '#FAFAFA',
              borderColor: '#BDBDBD',
            }}
            icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
            // onClick={() => {
            //   handleCancel()
            // }}
          >
            <Text style={{ color: '#757575', paddingLeft: 5 }}> {'Nh???p l???i'}</Text>
          </Button>
        </div>
      </Form>
      <h3 >Ho???c li??n h??? tr???c ti???p qua hotline : 1900 1022 </h3>
      </div>
    </div>
  )
}

const ContactWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <ContactPage />
    </>
  )
}

export { ContactWrapper }
