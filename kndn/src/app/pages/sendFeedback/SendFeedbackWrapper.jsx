/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET, requestGET_URL } from '../../../helpers/baseAPI'
import GoogleMapReact from 'google-map-react';
import clsx from 'clsx'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getBase64 } from '../../../helpers/ultis'
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  notification,
  Typography,
  Select,
  Modal,
  Checkbox,
  Divider,
  DatePicker,
  Spin,
  Empty,
  Upload,
} from 'antd'
import './components/sendFeedback.scss'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload
const { Text } = Typography
const HinhThucPhanAnhID = 1
const SendFeedbackPage = () => {

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
    labelAlign: 'left',
  }
  const [linhVuc, setLinhVuc] = useState([])
  const [form] = Form.useForm()
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [chuDe, setChuDe] = useState([])
  const [fileUpload, setFileUpload] = useState([])

  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  const [capcha, setCapCha] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)


  useEffect(() => {
      if (user) {
        form.setFieldsValue({
          HoVaTen : user?.fullName?user.fullName:"",
          CMND : user?.identityNumber?user.identityNumber:"",
          Email : user?.email?user.email:"",
          DienThoai : user?.phoneNumber?user.phoneNumber:""
        })
      }
      return () => {}
  }, [])  


  const handleCheck = async() => {
    var val = form.validateFields()
    const formData = form.getFieldsValue(true)
    var email = formData?.Email ?? ''
    var phone = formData?.DienThoai ?? ''
    const regularEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regularPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (!regularPhone.test(phone) && phone != "") {
      toast.warning('Chưa đúng định dạng của số điện thoại! Vui lòng kiểm tra lại!')
    }
    else
        if (!regularEmail.test(email) && email != "") {
          toast.warning('Chưa đúng định dạng email! Vui lòng kiểm tra lại!')
    }
    else { 
      var fileArr = []
      var fileString = ''
      if (fileUpload.length > 0) {
        await Promise.all(
          fileUpload.map(async (i, index) => {
            let tmp = await getBase64(i)
            tmp = tmp.substring(tmp.indexOf('base64,') + 7, tmp.length)
            // gọi api xử lý lưu file
            var body = {
              "Base64" : tmp,
              "Name" : i.name
            }
            var res = await requestPOST(CONFIG.GETWAY_PATH + '/Uploadfile', body)
            if (res) {
              fileArr.push( res.Url)
            }
          })
        )
      }
      fileString=fileArr?.join('##')
      formData.DinhKem=fileString
      handleOk(formData)
      console.log(formData)
    }
  }


  const handleOk = async (formData) => {
    try {
      let chuDeId = formData?.ChuDeID
      formData.HinhThucPhanAnhID = HinhThucPhanAnhID
      formData.Latitude = lat
      formData.Longitude = lng
      formData.TaiKhoanNguoiNop = user?.userName ?? "Tai khoan khong xac dinh"
      let chuDeModel = chuDe.find((i) => (i.ID = chuDeId))
      var body = {
        "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDg2MzY4OTUsImV4cCI6MTc0MzMzMTI5NSwic3ViIjoiYWRtaW4iLCJoYXNocHdkIjoibm55cWZYaUg1amtjaXhZRDBTeXExdz09IiwiY29udGV4dCI6eyJ1c2VyIjp7InVzZXJOYW1lIjoiYWRtaW4iLCJkaXNwbGF5TmFtZSI6ImFkbWluIn19fQ.lW39xB22DjL02-POyGeJvu8D3-cv_2OMR2uAGVPfG6E",
        "Email" : formData.Email,
        "Mobile" : formData.Mobile,
        "Title" : formData.Title,
        "Address" : formData.Address,
        "Content" : formData?.Content??""
      }
      postData(body)
     
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const postData = async (data) => {
    if (capcha == false ) {
        toast.error("Chưa xác thực Captcha")
    }
    else {
      try {
        setButtonLoading(true)
        var res = await requestPOST(`${CONFIG.GETWAY_PATH}/phananhkiennghi/add`, data)
        if (res != null) {
          toast.success('Gửi phản ánh thành công!')
          setFileUpload([])
          window.grecaptcha.reset();
          onchange(capcha)
        } else {
          toast.error(`Lỗi ${res}`)
        }
      } catch (error) { }
      setButtonLoading(false)
      handleCancel()
    }
  }

  const handleCancel = () => {
    form.resetFields()
  }


  const uploads = {
    onRemove: (file) => {
      const index = fileUpload.indexOf(file)
      const newFileList = fileUpload.slice()
      newFileList.splice(index, 1)
      setFileUpload(newFileList)
    },
    beforeUpload: (file) => {
      setFileUpload(arr=>[...arr, file])
      return false
    },
    name: 'Attachment',
    multiple: true,
    fileList: fileUpload,
    listType: 'picture',
  }



  return (
    <div className='col-xl-12'>
      <Form {...layout} form={form}>
        <div className='m-form__heading pt-5'>
          <h2 className='m-form__heading-title text-center '>Thông tin phản ánh </h2>
        </div>
        <Form.Item
          initialValue={user?.fullName?user?.fullName:""}
          name='HoVaTen'
          label={<label  className='form-label required fw-bold text-dark fs-6 mt-1'>Họ và tên</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input
            disabled={user?.fullName?!disable:disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Họ và tên'
          />
        </Form.Item>
        <Form.Item
          name='Address'
          label={<label className='form-label required fw-bold text-dark fs-6 mt-1'>Địa chỉ</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
          initialValue={user?.identityNumber?user?.identityNumber:""}
        >
          <Input
            disabled={user?.identityNumber?!disable:disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Chứng minh nhân dân/Căn cước'
          />
        </Form.Item>
        <Form.Item
          name='Email'
          label={<label className='form-label  fw-bold text-dark fs-6 mt-1'>Email</label>}
          // rules={[{ required: true, message: 'Không được để trống!' }]}
          initialValue ={user?.email?user?.email:""}
        >
          <Input
            disabled={user?.email?!disable:disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='Mobile'
          label={<label className='form-label required fw-bold text-dark fs-6 mt-1'>Điện thoại</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
          initialValue= {user?.phoneNumber?user?.phoneNumber:""}
        >
          <Input
            disabled={user?.phoneNumber?!disable:disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Điện thoại'
          />
        </Form.Item>
        {/* <Form.Item
          name='LinhVucID'
          label={<label className='form-label  fw-bold text-dark fs-6 mt-1'>Lĩnh vực</label>}
          // rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Select
            showSearch
            placeholder='Danh sách lĩnh vực'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
          >
            {linhVuc.map((item) => {
              return (
                <Option key={item.ID} value={item.ID}>
                  {item.TenLinhVuc}
                </Option>
              )
            })}
          </Select>
        </Form.Item> */}
        <Form.Item
          name='Title'
          label={<label className='form-label required fw-bold text-dark fs-6 mt-1'>Tiêu đề</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Tiêu đề'
          />
        </Form.Item>
        <Form.Item
          name='NoiDung'
          label={<label className='form-label required fw-bold text-dark fs-6 mt-1'>Nội dung</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <TextArea
            row={3}
            disabled={disable}
            style={{ width: '100%', borderRadius: 5 }}
            placeholder='Nội dung'
          />
        </Form.Item>
        <Form.Item 
           label={<label className='form-label fw-bold text-dark fs-6 mt-1'>Đính kèm</label>}
           rules={[{ required: true, message: 'Không được để trống!' }]}>
          <Dragger {...uploads}>
            <p className='ant-upload-text'>Thả tệp tin hoặc nhấp chuột để tải lên</p>
            <p className='ant-upload-hint'>Đính kèm</p>
          </Dragger>
        </Form.Item>
        {/* <Form.Item
          name='DiaChi'
          label={<label className='form-label required fw-bold text-dark fs-6 mt-1'>Địa chỉ</label>}
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input
            disabled={disable}
            style={{ width: '100%', height: 32, borderRadius: 5 }}
            placeholder='Địa chỉ'
          />
        </Form.Item> */}
        {/* <Form.Item  label={<label className='form-label  fw-bold text-dark fs-6 mt-1'>Vị trí</label>}>
          <Spin spinning={isLoading}>
            <div className='h-300px'>
              <GoogleMapReact
                options={{
                  draggableCursor: "default",
                  draggingCursor: "pointer",
                }}
                onClick={_onClick}
                bootstrapURLKeys={{
                  key: 'AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg',
                  libraries: 'places',
                  language: 'vi',
                  region: 'vi',
                }}
                defaultCenter={{
                  lat: 21.116515,
                  lng: 106.391728
                }}
                zoom={11}
                center={[lat === 0 ? 21.116515 : lat, lng === 0 ? 106.391728 : lng]}
                yesIWantToUseGoogleMapApiInternals
              >
                <AnyReactComponent
                  lat={lat}
                  lng={lng}
                />
              </GoogleMapReact>
            </div>
          </Spin>
        </Form.Item> */}
        {/* <div style={{marginLeft : "35%", marginBottom : "30px"}}>
          <ReCAPTCHA
            sitekey="6Lf0s4QeAAAAAAAXINVrGgHxPq4AvShd-KiF5MWW"
            onChange={onChange}
          />
        </div> */}
        <div className='text-center pb-2'>
          <Button
            key='Ok'
            type='primary'
            htmlType='submit'
            size='middle'
            style={{
              borderRadius: 5,
              padding: '5px 12px',
              width: 130,
              marginRight: 20,
              backgroundColor: '#34bfa3',
              borderColor: '#34bfa3',
            }}
            icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
            onClick={() => {
              handleCheck()
            }}
            loading={buttonLoading}
          >
            <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Gửi phản ánh'}</Text>
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
            onClick={() => {
              handleCancel()
            }}
          >
            <Text style={{ color: '#757575', paddingLeft: 5 }}> {'Nhập lại'}</Text>
          </Button>
        </div>
      </Form>
    </div >
  )
}

const SendFeedbackWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <SendFeedbackPage />
    </>
  )
}

export { SendFeedbackWrapper }
