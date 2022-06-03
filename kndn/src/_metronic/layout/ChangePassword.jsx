/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import {changePassword} from '../../app/modules/auth/redux/AuthCRUD'
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
const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/
const registrationSchema = Yup.object().shape({
  code: Yup.string().required('Không hợp lệ'),
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
})

const ChangePassword = (props) => {
  const {setModalLogin, setModalChangePass, emailChangePass} = props
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
        changePassword(emailChangePass, values.password, values.confirmPassword, values.code)
          .then((response) => {
            let res = response.data
            if (res.succeeded) {
              toast.success('Mật khẩu được đổi thành công! Vui lòng đăng nhâp lại để tiếp tục!')
              setModalChangePass(false)
              setModalLogin(true)
            } else {
              setStatus(res?.message ?? 'Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!')
            }
            setLoading(false)
            setSubmitting(false)
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!')
          })
      }, 1000)
    },
  })

  return (
    <div>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Heading */}
        <div className='mb-10 text-center'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Đổi mật khẩu</h1>
        </div>
        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        <div className='fv-row mb-10'>
          <label className='form-label required fw-bolder text-dark fs-6'>Mã bảo mật</label>
          <input
            placeholder='Mã bảo mật'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('code')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.code && formik.errors.code,
              },
              {
                'is-valid': formik.touched.code && !formik.errors.code,
              }
            )}
          />
        </div>
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
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
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className='fv-row mb-10'>
          <label className='form-label required fw-bolder text-dark fs-6'>Nhập lại mật khẩu</label>
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

        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Đổi mật khẩu</span>}
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
              setModalChangePass(false)
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
export {ChangePassword}
