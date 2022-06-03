/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useHistory, Redirect, Switch, Route } from 'react-router-dom'

import { useFormik } from 'formik'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import { login } from '../../app/modules/auth/redux/AuthCRUD'

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Không hợp lệ'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Không hợp lệ'),
})

const initialValues = {
  userName: '',
  password: '',
}

const Login = (props) => {
  const { setModalLogin, setModalRegister, setModalForgot } = props
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      login(values.userName, values.password)
        .then((data) => {
          let _err = data?.data?.error?.code ?? 500
          if (_err == 200) {
            let user = data?.data?.data ?? {}
            user.userName = values.userName
            setLoading(false)
            dispatch(auth.actions.login(user))
            setModalLogin(false)
            document.location.reload()
          }
          else {
            let _msg = data?.data?.error?.message ?? 'Đăng nhập không thành công'
            setLoading(false)
            setSubmitting(false)
            setStatus(_msg)
          }
        })
        .catch(() => {
          setLoading(false)
          setSubmitting(false)
          setStatus('Đăng nhập không thành công')
        })
    },
  })
  return (
    <>
    <div className=''>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3 fs-3 text-uppercase'>Đăng nhập hệ thống</h1>
          {/* <div className='text-gray-400 fw-normal fs-5'>
            Bạn chưa có tài khoản?{' '}
            <a
              className='link-primary fw-bolder'
              onClick={() => {
                setModalLogin(false)
                // setModalRegister(true)
                history.push('/signup')
              }}
            >
              Tạo tài khoản mới
            </a>
          </div> */}
        </div>
        {/* begin::Heading */}

        {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          <div></div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-5'>
          <label className='form-label required fs-5 fw-bold text-dark'>Tài khoản</label>
          <input
            placeholder='Tên đăng nhập'
            {...formik.getFieldProps('userName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.userName && formik.errors.userName },
              {
                'is-valid': formik.touched.userName && !formik.errors.userName,
              }
            )}
            name='userName'
            autoComplete='off'
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className='fv-plugins-message-container invalid-feedback'>
              <span role='alert'>{formik.errors.userName}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label required fw-bold text-dark fs-5 mb-0'>Mật khẩu</label>
            {/* end::Label */}
            {/* begin::Link */}
            <a
              className='link-primary fw-bold'
              onClick={() => {
                setModalLogin(false)
                setModalForgot(true)
              }}
            >
              Quên mật khẩu ?
            </a>
            {/* end::Link */}
          </div>
          <input
            placeholder='Mật khẩu'
            type='password'
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
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center row justify-content-center pt-5'>
          <div className="col-12">
          <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-lg btn-primary'
              disabled={formik.isSubmitting || !formik.isValid}
              style={{width : '100%'}}
            >
              {!loading && <span className='indicator-label'>Đăng nhập</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Đang xử lý...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
          </button>
          </div>
          
            {/* <button
              type='button'
              id='kt_login_signup_form_cancel_button'
              className='btn btn-lg btn-warning w-auto ms-3 min-w-xl-100px'
              onClick={() => {
                setModalLogin(false)
              }}
            >
              Huỷ
            </button> */}
        </div>
        <div className='text-center row justify-content-center pt-5'>
          <div className="col-6" style={{padding: 0}}>
            <button
              type='button'
              id='kt_login_signup_form_signup_business_button'
              className='btn btn-lg btn-success ms-3 min-w-xl-100px'
              onClick={() => {
                setModalLogin(false)
                // setModalRegister(true)
                history.push('/signup')
              }}
            >
              Đăng ký doanh nghiệp
            </button>
          </div>
          <div className="col-6" style={{padding: 0}}>
            <button
              type='button'
              id='kt_login_signup_form_signup_business_button'
              className='btn btn-lg btn-success ms-3 min-w-xl-100px'
              onClick={() => {
                setModalLogin(false)
                // setModalRegister(true)
                history.push('/signup')
              }}
            >
              Đăng ký chủ đầu tư
            </button>
          </div>
        </div>
        {/* end::Action */}
      </form>
    </div>
    </>
  )
}

export { Login }
