/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import {register} from '../../app/modules/auth/redux/AuthCRUD'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {toast} from 'react-toastify'
import {Navbar, Container, Nav, Modal} from 'react-bootstrap-v5'

const initialValues = {
  firstname: '',
  // identityNumber: '',
  phoneNumber: '',
  dateOfBirth: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const regularNumber = /^\d+$/
const regularPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/
const registrationSchema = Yup.object().shape({
  firstname: Yup.string().min(3, '').max(100, '').required('Không hợp lệ'),
  // identityNumber: Yup.string()
  //   .matches(regularNumber, 'Định danh không hợp lệ')
  //   .min(8, '')
  //   .max(12, '')
  //   .required('Không hợp lệ'),
  phoneNumber: Yup.string()
    .matches(regularPhone, 'Số điện thoại không hợp lệ')
    .min(8, '')
    .max(12, '')
    .required('Không hợp lệ'),
  dateOfBirth: Yup.date().required('Không hợp lệ'),

  email: Yup.string()
    .email('Định dạng email không phù hợp.')
    .min(3, '')
    .max(50, '')
    .required('Không hợp lệ'),
  password: Yup.string()
    .matches(
      regularExpressionPassword,
      'Mật khẩu từ 6-18 ký tự, phải có: chữ hoa, chữ thường và các ký tự đặc biệt!'
    )
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(18, 'Mật khẩu tối đa 18 ký tự')
    .required('Không hợp lệ'),
  confirmPassword: Yup.string()
    .required('Không hợp lệ')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Mật khẩu không khớp, vui lòng kiểm tra lại!'
      ),
    }),
  //acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

const Registration = (props) => {
  const {setModalRegister, setVisibleSuccess} = props
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      toast.success('Thao tác thành công!', {autoClose: 2000})
      setLoading(true)
      setTimeout(() => {
        // var date = moment(values.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD')
        register(
          values.email,
          values.firstname,
          values.dateOfBirth,
          values.phoneNumber,
          values.phoneNumber,
          values.password,
          values.confirmPassword
        )
          .then((response) => {
            let res = response.data
            if (res.succeeded) {
              toast.success('Đăng ký thành công! Vui lòng đăng nhâp lại để tiếp tục!')
              setModalRegister(false)
              setVisibleSuccess(true)
            } else {
              setStatus(res?.message ?? 'Đăng ký không thành công')
            }
            setLoading(false)
            setSubmitting(false)
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Đăng ký không thành công')
          })
      }, 1000)
    },
  })

  return (
    <div>
      <form
        className='form w-150 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Heading */}
        <div className='mb-10 text-center'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Đăng ký tài khoản</h1>
        </div>
        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        {/* begin::Form group Firstname */}
        <div className='row'>
          <div className='col-6'>
            <div className='fv-row mb-3'>
              <label className='form-label required fw-bolder text-dark fs-6'>Họ và tên</label>
              <input
                placeholder='Họ và tên'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('firstname')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.firstname && formik.errors.firstname,
                  },
                  {
                    'is-valid': formik.touched.firstname && !formik.errors.firstname,
                  }
                )}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className='fv-plugins-message-container invalid-feedback'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.firstname}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='col-6'>
            <div className='fv-row mb-3'>
              <label className='form-label required fw-bolder text-dark fs-6'>Ngày sinh</label>
              <input
                placeholder='Ngày sinh'
                type='date'
                autoComplete='off'
                {...formik.getFieldProps('dateOfBirth')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                  },
                  {
                    'is-valid': formik.touched.dateOfBirth && !formik.errors.dateOfBirth,
                  }
                )}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className='fv-plugins-message-container invalid-feedback'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.dateOfBirth}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='fv-row mb-3'>
          <label className='fs-6 fw-bold text-gray-600'>
            Số điện thoại được sử dụng làm tài khoản đăng nhập
          </label>

          <label className='form-label required fw-bolder text-dark fs-6'>Số điện thoại</label>
          <input
            placeholder='Số điện thoại'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('phoneNumber')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber},
              {
                'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
              }
            )}
          />
          <div className='text-muted mt-2 fs-6'>OTP xác thực sẽ được gửi về số này</div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className='fv-plugins-message-container invalid-feedback'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.phoneNumber}</span>
              </div>
            </div>
          )}
        </div>
        {/* begin::Form group Email */}
        <div className='fv-row mb-3'>
          <label className='form-label required fw-bolder text-dark fs-6'>Email</label>
          <input
            placeholder='Email'
            type='email'
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container invalid-feedback'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
          <div className='text-muted mt-2 fs-6'>
            Dùng trong trường hợp quên mật khẩu, đặt lại mật khẩu
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='fv-row mb-3' data-kt-password-meter='true'>
              <div className='mb-1'>
                <label className='form-label required fw-bolder text-dark fs-6'>Mật khẩu</label>
                <div className='position-relative mb-3'>
                  <input
                    type='password'
                    placeholder='Mật khẩu'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid': formik.touched.password && formik.errors.password,
                      },
                      {
                        'is-valid': formik.touched.password && !formik.errors.password,
                      }
                    )}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container invalid-feedback'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.password}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='fv-row mb-3'>
              <label className='form-label required fw-bolder text-dark fs-6'>
                Nhập lại mật khẩu
              </label>
              <input
                type='password'
                placeholder='Nhập lại mật khẩu'
                autoComplete='off'
                {...formik.getFieldProps('confirmPassword')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
                  },
                  {
                    'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                  }
                )}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className='fv-plugins-message-container invalid-feedback'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.confirmPassword}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='text-center mt-3'>
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Đăng ký</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Đang xử lý...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-info w-100 mb-5'
            onClick={() => {
              setModalRegister(false)
            }}
          >
            Huỷ
          </button>
        </div>
        {/* end::Form group */}
      </form>
    </div>
  )
}
export {Registration}
