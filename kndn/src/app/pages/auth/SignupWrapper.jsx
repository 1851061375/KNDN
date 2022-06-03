/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Navbar, Container, Nav, Modal } from 'react-bootstrap-v5'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as auth from '../../modules/auth/redux/AuthRedux'
import { register } from '../../modules/auth/redux/AuthCRUD'
import { toast } from 'react-toastify'
import { Link, useHistory, Redirect, Switch, Route } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { Tabs } from 'antd';

const initialValues = {
  Email: '',
  Name: '',
  UserName: '',
  PassWord: '',
  Address: '',
  confirmPassword: '',
  DateOfBirth: '',
  Mobile: '',
  Sex: '',
}
const regularNumber = /^\d+$/
const regularPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/
const registrationSchema = Yup.object().shape({
  Name: Yup.string().min(3, '').max(100, '').required('Không hợp lệ'),
  Mobile: Yup.string()
    .matches(regularPhone, 'Số điện thoại không hợp lệ')
    .min(8, 'Không hợp lệ')
    .max(12, 'Không hợp lệ')
    .required('Không hợp lệ'),
  Sex: Yup.string()
    .required('Không hợp lệ'),
  UserName: Yup.string()
    .required('Tài khoản không hợp lệ')
    .min(8, 'Không hợp lệ')
    .max(12, 'Không hợp lệ')
  // .test('UserName', 'Tài khoản đã tồn tại', // <- key, message
  //   function (value) {
  //     return new Promise(async(resolve, reject) => {
  //       var body = {
  //         "user": value,
  //         "pass": "@"
  //       }
  //       var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/user/gettoken`, body);
  //       var _data = data1?.error ?? {}
  //       if (_data?.code ?? 500 == 401) {
  //         return resolve(false);
  //       }
  //       return resolve(true);
  //     })
  // }
  // )
  ,
  DateOfBirth: Yup.date().required('Không hợp lệ'),

  Email: Yup.string()
    .email('Định dạng email không phù hợp.')
    .min(3, 'Không hợp lệ')
    .max(50, 'Không hợp lệ')
    .required('Không hợp lệ'),
  PassWord: Yup.string()
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
const SignupPage = () => {
  const history = useHistory()
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    // validate: (val) => validate(val),
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        register(
          values.Email,
          values.Name,
          values.UserName,
          values.PassWord,
          values.Address,
          values.confirmPassword,
          values.DateOfBirth,
          values.Mobile,
          values.Sex,
        )
          .then((response) => {
            let res = response?.data?.error?.code ?? 500
            if (res == 200) {
              toast.success('Đăng ký thành công! Vui lòng đăng nhâp lại để tiếp tục!')
              //setModalRegister(false)
              setVisibleSuccess(true)
            } else {
              let _msg = response?.data?.error?.message ?? 'Đăng ký không thành công'
              setStatus(_msg)
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
    <>
      <div className='card p-5'>
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_signup_form'
          onSubmit={formik.handleSubmit}
        >
          {/* begin::Heading */}
          <div className='mb-10 text-center'>
            {/* begin::Title */}
            <h1 className='text-danger fs-3 text-uppercase mb-3'>Đăng ký tài khoản</h1>
          </div>
          {formik.status && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}

          {/* begin::Form group Name */}
          <div className='row'>
            <div className='col-xl-6'>
              <div className='fv-row mb-5'>
                <label className='form-label required fw-bolder text-dark fs-6'>Họ và tên</label>
                <input
                  placeholder='Họ và tên'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('Name')}
                  className={clsx(
                    'form-control border-gray-300 form-control-solid',
                    {
                      'is-invalid': formik.touched.Name && formik.errors.Name,
                    },
                    {
                      'is-valid': formik.touched.Name && !formik.errors.Name,
                    }
                  )}
                />
                {formik.touched.Name && formik.errors.Name && (
                  <div className='fv-plugins-message-container invalid-feedback'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.Name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='fv-row mb-5'>
                <label className='form-label required fw-bolder text-dark fs-6'>Ngày sinh</label>
                <input
                  placeholder='Ngày sinh'
                  type='date'
                  lang='vi-VN'
                  autoComplete='off'
                  {...formik.getFieldProps('DateOfBirth')}
                  className={clsx(
                    'form-control border-gray-300 form-control-solid',
                    {
                      'is-invalid': formik.touched.DateOfBirth && formik.errors.DateOfBirth,
                    },
                    {
                      'is-valid': formik.touched.DateOfBirth && !formik.errors.DateOfBirth,
                    }
                  )}
                />
                <div className='text-muted mt-2 fs-6'>

                </div>
                {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
                  <div className='fv-plugins-message-container invalid-feedback'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.DateOfBirth}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='fv-row mb-5'>
            <label className='form-label required fw-bolder text-dark fs-6'>
              Địa chỉ
            </label>
            <input
              placeholder='Địa chỉ'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('Address')}
              className={clsx(
                'form-control border-gray-300 form-control-solid',
                { 'is-invalid': formik.touched.Address && formik.errors.Address },
                {
                  'is-valid': formik.touched.Address && !formik.errors.Address,
                }
              )}
            />
            {formik.touched.Address && formik.errors.Address && (
              <div className='fv-plugins-message-container invalid-feedback'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.Address}</span>
                </div>
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-xl-6'>
              <div className='fv-row mb-5'>
                <label className='form-label required fw-bolder text-dark fs-6'>Số điện thoại</label>
                <input
                  placeholder='Số điện thoại'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('Mobile')}
                  className={clsx(
                    'form-control border-gray-300 form-control-solid',
                    { 'is-invalid': formik.touched.Mobile && formik.errors.Mobile },
                    {
                      'is-valid': formik.touched.Mobile && !formik.errors.Mobile,
                    }
                  )}
                />
                {formik.touched.Mobile && formik.errors.Mobile && (
                  <div className='fv-plugins-message-container invalid-feedback'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.Mobile}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='fv-row mb-5'>
                <label className='form-label required fw-bolder text-dark fs-6'>Giới tính</label>
                <select
                  className={clsx(
                    'form-control border-gray-300 form-control-solid',
                    { 'is-invalid': formik.touched.Sex && formik.errors.Sex },
                    {
                      'is-valid': formik.touched.Sex && !formik.errors.Sex,
                    }
                  )}
                  placeholder='Giới tính'
                  {...formik.getFieldProps('Sex')}
                >
                  <option value=""></option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {formik.touched.Sex && formik.errors.Sex && (
                  <div className='fv-plugins-message-container invalid-feedback'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.Sex}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* begin::Form group Email */}
          <div className='fv-row mb-5'>
            <label className='form-label required fw-bolder text-dark fs-6'>Email</label>
            <input
              placeholder='Email'
              type='email'
              autoComplete='off'
              {...formik.getFieldProps('Email')}
              className={clsx(
                'form-control border-gray-300 form-control-solid',
                { 'is-invalid': formik.touched.Email && formik.errors.Email },
                {
                  'is-valid': formik.touched.Email && !formik.errors.Email,
                }
              )}
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className='fv-plugins-message-container invalid-feedback'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.Email}</span>
                </div>
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='mb-10 fv-row' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <label className='form-label required fw-bolder text-dark fs-6'>Tên tài khoản</label>
                  <div className='position-relative mb-3'>
                    <input
                      placeholder='Tên tài khoản'
                      autoComplete='off'
                      {...formik.getFieldProps('UserName')}
                      className={clsx(
                        'form-control border-gray-300 form-control-solid',
                        {
                          'is-invalid': formik.touched.UserName && formik.errors.UserName,
                        },
                        {
                          'is-valid': formik.touched.UserName && !formik.errors.UserName,
                        }
                      )}
                    />
                    {formik.touched.UserName && formik.errors.UserName && (
                      <div className='fv-plugins-message-container invalid-feedback'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.UserName}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='mb-10 fv-row' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <label className='form-label required fw-bolder text-dark fs-6'>Mật khẩu</label>
                  <div className='position-relative mb-3'>
                    <input
                      type='password'
                      placeholder='Mật khẩu'
                      autoComplete='off'
                      {...formik.getFieldProps('PassWord')}
                      className={clsx(
                        'form-control border-gray-300 form-control-solid',
                        {
                          'is-invalid': formik.touched.PassWord && formik.errors.PassWord,
                        },
                        {
                          'is-valid': formik.touched.PassWord && !formik.errors.PassWord,
                        }
                      )}
                    />
                    {formik.touched.PassWord && formik.errors.PassWord && (
                      <div className='fv-plugins-message-container invalid-feedback'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.PassWord}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='fv-row mb-5'>
                <label className='form-label required fw-bolder text-dark fs-6'>
                  Nhập lại mật khẩu
                </label>
                <input
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  autoComplete='off'
                  {...formik.getFieldProps('confirmPassword')}
                  className={clsx(
                    'form-control border-gray-300 form-control-solid',
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

          <div className='text-center row justify-content-center pt-3'>
            <button
              type='submit'
              id='kt_sign_up_submit'
              className='btn btn-lg btn-primary w-auto py-3'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && <span className='indicator-label'>Đăng ký</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Đang xử lý...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <button
              type='button'
              id='kt_login_signup_form_cancel_button'
              className='btn btn-lg btn-warning w-auto min-w-xl-100px ms-3 py-3'
              onClick={() => {
                history.push('/home')
              }}
            >
              Huỷ
            </button>
          </div>
          {/* end::Form group */}
        </form>
      </div>
      <Modal
        show={visibleSuccess}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setVisibleSuccess(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-15'>
            <h1 className='fw-bolder fs-2qx text-success mb-7'>Đăng ký thành công</h1>
            <div className='fw-bold fs-3 text-muted mb-15'>
              Vui lòng đăng nhập để tiếp tục sử dụng.
            </div>
            <div className='text-center'>
              <a
                className='btn btn-lg btn-primary fw-bolder'
                onClick={() => {
                  setVisibleSuccess(false)
                  //setModalLogin(true)
                  history.push('/home')
                }}
              >
                OK
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const SignupWrapper = () => {
  const accessToken = useSelector((state) => state.auth.accessToken)
  return !accessToken ? (
    <>
      <PageTitle breadcrumbs={[
        {
          title: 'Trang chủ',
          path: '/',
          isActive: true,
          isSeparator: false
        }
      ]}
      >
        Đăng ký tài khoản
      </PageTitle>
      <SignupPage />
    </>
  ) : (
    <Switch>
      <Redirect from='/signup' exact={true} to='/home' />
    </Switch>
  )
}

export { SignupWrapper }
