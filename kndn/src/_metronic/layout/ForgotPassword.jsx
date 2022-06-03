/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory, Redirect, Switch, Route} from 'react-router-dom'

import {useFormik} from 'formik'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import {requestPassword} from '../../app/modules/auth/redux/AuthCRUD'
import {toast} from 'react-toastify'
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Định dạng email không phù hợp.')
    .min(3, '')
    .max(50, '')
    .required('Không hợp lệ'),
})

const initialValues = {
  email: '',
}

const ForgotPassword = (props) => {
  const {setModalForgot, setModalChangePass, setEmailChangePass} = props
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      requestPassword(values.email)
        .then((data) => {
          toast.success(
            'Thông tin về mật khẩu đã được gửi, vui lòng kiểm tra và làm theo hướng dẫn!'
          )
          setLoading(false)
          setModalForgot(false)
          setEmailChangePass(values.email)
          setModalChangePass(true)
        })
        .catch(() => {
          setLoading(false)
          setSubmitting(false)
          setStatus('Tài khoản hoặc mật khẩu không chính xác.')
        })
    },
  })
  return (
    <div className=''>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Quên mật khẩu</h1>
          <div className='text-gray-400 fw-bold fs-4'>Nhập email để đặt lại mật khẩu.</div>
        </div>
        {/* begin::Heading */}

        {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          <div></div>
        )}

        <div className='fv-row mb-10'>
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
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Quên mật khẩu</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Đang xử lý...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-info w-100 mb-5'
            onClick={() => {
              setModalForgot(false)
            }}
          >
            Huỷ
          </button>
        </div>
        {/* end::Action */}
      </form>
    </div>
  )
}

export {ForgotPassword}
